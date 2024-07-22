import { Extension } from "@tiptap/core";

export const AllowStyleExtension = Extension.create({
    name: "AllowStyle",
    addGlobalAttributes() {
        return [
            {
                types: [
                    "blockquote",
                    "bold",
                    "bulletList",
                    "code",
                    "codeBlock",
                    "doc",
                    "dropCursor",
                    "gapCursor",
                    "hardBreak",
                    "heading",
                    "history",
                    "horizontalRule",
                    "italic",
                    "listItem",
                    "orderedList",
                    "paragraph",
                    "strike",
                    "table",
                    "tableCell",
                    "tableHeader",
                    "tableRow",
                    "underline",
                    "typography",
                    "link",
                    "textAlign"
                ],
                attributes: {
                    style: {
                        default: null
                    },
                    id: {
                        default: null
                    },
                    class: {
                        default: null
                    }
                }
            }
        ];
    }
});
