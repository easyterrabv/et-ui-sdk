import { describe, it, expect } from "vitest";
import { getSchema } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Slice } from "@tiptap/pm/model";
import { AllowStyleExtension } from "../AllowStyleExtension";
import { withoutMarkStyles, stripPastedMarkStyles } from "../stripMarkStyles";

describe("withoutMarkStyles", () => {
    it("drops mark-duplicating declarations and keeps the rest", () => {
        expect(withoutMarkStyles("font-weight: 700; color: red")).toBe(
            "color: red"
        );
    });

    it("returns empty when nothing survives", () => {
        expect(withoutMarkStyles("font-weight: bold")).toBe("");
    });

    it("handles italic, underline and strike-through", () => {
        expect(
            withoutMarkStyles(
                "font-style: italic; text-decoration: underline; text-decoration-line: line-through"
            )
        ).toBe("");
    });

    it("is case-insensitive and tolerates whitespace", () => {
        expect(withoutMarkStyles("FONT-WEIGHT :  700 ; color: blue")).toBe(
            "color: blue"
        );
    });

    it("keeps declarations it does not know about", () => {
        expect(withoutMarkStyles("mso-fareast-language: NL")).toBe(
            "mso-fareast-language: NL"
        );
    });

    it("ignores empty and malformed fragments", () => {
        expect(withoutMarkStyles("color: red;;")).toBe("color: red");
        expect(withoutMarkStyles("garbage")).toBe("");
    });
});

const schema = getSchema([StarterKit, AllowStyleExtension]);

// What tiptap produces from a pasted <p style="font-weight:700; color:red">:
// the weight becomes a Bold mark AND AllowStyleExtension keeps the raw style.
function pastedSlice(style: string) {
    const doc = schema.nodeFromJSON({
        type: "doc",
        content: [
            {
                type: "paragraph",
                attrs: { style },
                content: [
                    { type: "text", marks: [{ type: "bold" }], text: "hello" }
                ]
            }
        ]
    });
    return new Slice(doc.content, 0, 0);
}

describe("stripPastedMarkStyles", () => {
    it("removes the duplicated weight but keeps the bold mark", () => {
        const cleaned = stripPastedMarkStyles(
            pastedSlice("font-weight: 700; color: red")
        );
        const paragraph = cleaned.content.firstChild;

        expect(paragraph?.attrs.style).toBe("color: red");
        expect(paragraph?.firstChild?.marks.map((m) => m.type.name)).toEqual([
            "bold"
        ]);
        expect(paragraph?.firstChild?.text).toBe("hello");
    });

    it("clears the style attribute entirely when only marks were in it", () => {
        const cleaned = stripPastedMarkStyles(pastedSlice("font-weight: 700"));
        expect(cleaned.content.firstChild?.attrs.style).toBeNull();
    });

    it("leaves content without mark styles untouched", () => {
        const original = pastedSlice("color: red");
        const cleaned = stripPastedMarkStyles(original);
        expect(cleaned.content.firstChild?.attrs.style).toBe("color: red");
        expect(cleaned.content.eq(original.content)).toBe(true);
    });

    it("cleans styles carried on marks too", () => {
        const doc = schema.nodeFromJSON({
            type: "doc",
            content: [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            marks: [
                                {
                                    type: "bold",
                                    attrs: { style: "font-weight: 700" }
                                }
                            ],
                            text: "hello"
                        }
                    ]
                }
            ]
        });

        const cleaned = stripPastedMarkStyles(new Slice(doc.content, 0, 0));
        const mark = cleaned.content.firstChild?.firstChild?.marks[0];

        expect(mark?.type.name).toBe("bold");
        expect(mark?.attrs.style).toBeNull();
    });

    it("recurses into nested content", () => {
        const doc = schema.nodeFromJSON({
            type: "doc",
            content: [
                {
                    type: "blockquote",
                    attrs: { style: "font-style: italic; color: grey" },
                    content: [
                        {
                            type: "paragraph",
                            attrs: { style: "font-weight: bold" },
                            content: [{ type: "text", text: "deep" }]
                        }
                    ]
                }
            ]
        });

        const cleaned = stripPastedMarkStyles(new Slice(doc.content, 0, 0));
        const quote = cleaned.content.firstChild;

        expect(quote?.attrs.style).toBe("color: grey");
        expect(quote?.firstChild?.attrs.style).toBeNull();
        expect(quote?.firstChild?.firstChild?.text).toBe("deep");
    });
});
