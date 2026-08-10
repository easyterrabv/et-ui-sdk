import { Fragment, Slice } from "@tiptap/pm/model";
import type { Mark, Node as ProseMirrorNode } from "@tiptap/pm/model";

// Inline style declarations that tiptap also parses into toggleable marks
// (Bold, Italic, Underline, Strike). AllowStyleExtension keeps the raw style
// attribute alongside the parsed mark, so pasted content ends up formatted
// twice: as a mark the toolbar can toggle, and as a style it cannot reach.
// Unsetting the mark then leaves the text visibly formatted with no way back.
const MARK_STYLE_PROPERTIES = [
    "font-weight",
    "font-style",
    "text-decoration",
    "text-decoration-line"
];

/**
 * Drops the declarations that duplicate tiptap marks from a style attribute,
 * leaving every other declaration (colours, spacing, alignment) untouched.
 * Returns an empty string when nothing is left.
 */
export function withoutMarkStyles(style: string): string {
    return style
        .split(";")
        .filter((declaration) => {
            const property = declaration.split(":")[0]?.trim().toLowerCase();
            return (
                !!property &&
                !!declaration.split(":")[1]?.trim() &&
                !MARK_STYLE_PROPERTIES.includes(property)
            );
        })
        .map((declaration) => declaration.trim())
        .join("; ");
}

function cleanAttrs(
    attrs: Record<string, unknown> | undefined
): Record<string, unknown> | null {
    const style = attrs?.style;
    if (typeof style !== "string" || !style) {
        return null;
    }

    const cleaned = withoutMarkStyles(style);
    if (cleaned === style) {
        return null;
    }

    return { ...attrs, style: cleaned || null };
}

function cleanMarks(marks: readonly Mark[]): Mark[] {
    return marks.map((mark) => {
        const attrs = cleanAttrs(mark.attrs);
        return attrs ? mark.type.create(attrs) : mark;
    });
}

function cleanNode(node: ProseMirrorNode): ProseMirrorNode {
    const content = cleanFragment(node.content);
    const attrs = cleanAttrs(node.attrs);
    const marks = cleanMarks(node.marks);

    if (node.isText) {
        return node.mark(marks);
    }

    return attrs
        ? node.type.create(attrs, content, marks)
        : node.copy(content).mark(marks);
}

function cleanFragment(fragment: Fragment): Fragment {
    const children: ProseMirrorNode[] = [];
    fragment.forEach((child) => children.push(cleanNode(child)));
    return Fragment.fromArray(children);
}

/**
 * Removes mark-duplicating style declarations from pasted content. Runs after
 * parsing, so the marks tiptap derived from those very styles are kept — the
 * text stays bold/italic/underlined, and the toolbar can now turn it off.
 */
export function stripPastedMarkStyles(slice: Slice): Slice {
    return new Slice(
        cleanFragment(slice.content),
        slice.openStart,
        slice.openEnd
    );
}
