// Inline style declarations that tiptap already parses into toggleable marks
// (Bold, Italic, Underline, Strike). AllowStyleExtension keeps the raw style
// attribute alongside the mark, so pasted content ends up formatted twice: the
// mark, which the toolbar can toggle, and the style, which it cannot reach.
// Removing these on paste leaves the mark as the single source of truth.
const MARK_STYLE_PROPERTIES = [
    "font-weight",
    "font-style",
    "text-decoration",
    "text-decoration-line"
];

/**
 * Strips the style declarations that duplicate tiptap marks from pasted HTML,
 * leaving every other declaration (colours, spacing, alignment) untouched.
 */
export function stripMarkStyles(html: string): string {
    const doc = new DOMParser().parseFromString(html, "text/html");

    doc.body.querySelectorAll<HTMLElement>("[style]").forEach((element) => {
        MARK_STYLE_PROPERTIES.forEach((property) =>
            element.style.removeProperty(property)
        );

        if (!element.style.length) {
            element.removeAttribute("style");
        }
    });

    return doc.body.innerHTML;
}
