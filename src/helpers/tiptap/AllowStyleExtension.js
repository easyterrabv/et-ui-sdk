"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowStyleExtension = void 0;
var core_1 = require("@tiptap/core");
exports.AllowStyleExtension = core_1.Extension.create({
    name: "AllowStyle",
    addGlobalAttributes: function () {
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
                    }
                }
            }
        ];
    }
});
