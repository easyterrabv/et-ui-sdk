<template>
    <div class="et-sdk-wysiwyg" v-if="editor" :name="name">
        <div
            class="et-sdk-wysiwyg--toolbar"
            :class="{
                'et-sdk-wysiwyg--toolbar__disabled': hasDisabledInput
            }"
        >
            <div class="grow">
                <div class="et-sdk-wysiwyg--toolbar--tools">
                    <EtButtonGroup v-if="enabledInputGroups.includes('style')">
                        <EtButton
                            :tabindex="9999"
                            :size="UI_SIZING.S"
                            :type="
                                editor.isActive('bold')
                                    ? UI_TYPES.PRIMARY
                                    : UI_TYPES.DEFAULT
                            "
                            :disabled="hasDisabledInput"
                            @click="runEditorMethod('toggleBold')"
                        >
                            <EtIconBold title="Make Bold" />
                        </EtButton>
                        <EtButton
                            :size="UI_SIZING.S"
                            :tabindex="9999"
                            :type="
                                editor.isActive('italic')
                                    ? UI_TYPES.PRIMARY
                                    : UI_TYPES.DEFAULT
                            "
                            :disabled="hasDisabledInput"
                            @click="runEditorMethod('toggleItalic')"
                        >
                            <EtIconItalic title="Make Italic" />
                        </EtButton>
                        <EtButton
                            :size="UI_SIZING.S"
                            :tabindex="9999"
                            :type="
                                editor.isActive('underline')
                                    ? UI_TYPES.PRIMARY
                                    : UI_TYPES.DEFAULT
                            "
                            :disabled="hasDisabledInput"
                            @click="runEditorMethod('toggleUnderline')"
                        >
                            <EtIconUnderline title="Underline Text" />
                        </EtButton>
                    </EtButtonGroup>

                    <EtButtonGroup v-if="enabledInputGroups.includes('list')">
                        <EtButton
                            :size="UI_SIZING.S"
                            :tabindex="9999"
                            :type="
                                editor.isActive('bulletList')
                                    ? UI_TYPES.PRIMARY
                                    : UI_TYPES.DEFAULT
                            "
                            :disabled="hasDisabledInput"
                            @click="runEditorMethod('toggleBulletList')"
                        >
                            <EtIconListUl title="Make Unordered List" />
                        </EtButton>
                        <EtButton
                            :size="UI_SIZING.S"
                            :tabindex="9999"
                            :type="
                                editor.isActive('orderedList')
                                    ? UI_TYPES.PRIMARY
                                    : UI_TYPES.DEFAULT
                            "
                            :disabled="hasDisabledInput"
                            @click="runEditorMethod('toggleOrderedList')"
                        >
                            <EtIconListOl title="Make Ordered List" />
                        </EtButton>
                    </EtButtonGroup>

                    <EtButtonGroup v-if="enabledInputGroups.includes('align')">
                        <EtButton
                            :size="UI_SIZING.S"
                            :tabindex="9999"
                            :type="
                                editor.isActive({ textAlign: 'left' })
                                    ? UI_TYPES.PRIMARY
                                    : UI_TYPES.DEFAULT
                            "
                            :disabled="hasDisabledInput"
                            @click="runEditorMethod('setTextAlign', 'left')"
                        >
                            <EtIconAlignLeft title="Align Text Left" />
                        </EtButton>
                        <EtButton
                            :size="UI_SIZING.S"
                            :tabindex="9999"
                            :type="
                                editor.isActive({ textAlign: 'center' })
                                    ? UI_TYPES.PRIMARY
                                    : UI_TYPES.DEFAULT
                            "
                            :disabled="hasDisabledInput"
                            @click="runEditorMethod('setTextAlign', 'center')"
                        >
                            <EtIconAlignCenter title="Align Text Center" />
                        </EtButton>
                        <EtButton
                            :size="UI_SIZING.S"
                            :tabindex="9999"
                            :type="
                                editor.isActive({ textAlign: 'right' })
                                    ? UI_TYPES.PRIMARY
                                    : UI_TYPES.DEFAULT
                            "
                            :disabled="hasDisabledInput"
                            @click="runEditorMethod('setTextAlign', 'right')"
                        >
                            <EtIconAlignRight title="Align Text Right" />
                        </EtButton>
                        <EtButton
                            :size="UI_SIZING.S"
                            :tabindex="9999"
                            :type="
                                editor.isActive({ textAlign: 'justify' })
                                    ? UI_TYPES.PRIMARY
                                    : UI_TYPES.DEFAULT
                            "
                            :disabled="hasDisabledInput"
                            @click="runEditorMethod('setTextAlign', 'justify')"
                        >
                            <EtIconAlignJustify title="Align Text Justify" />
                        </EtButton>
                    </EtButtonGroup>

                    <EtButtonGroup v-if="enabledInputGroups.includes('misc')">
                        <EtButton
                            :size="UI_SIZING.S"
                            :tabindex="9999"
                            :type="
                                editor.isActive('blockquote')
                                    ? UI_TYPES.PRIMARY
                                    : UI_TYPES.DEFAULT
                            "
                            :disabled="hasDisabledInput"
                            @click="runEditorMethod('toggleBlockquote')"
                        >
                            <EtIconQuoteLeft title="Make Quote" />
                        </EtButton>
                        <EtPopover ref="anchorPopover" manual>
                            <template #toggle>
                                <EtButton
                                    :size="UI_SIZING.S"
                                    :tabindex="9999"
                                    @click="toggleAnchorPopover"
                                    :type="
                                        editor.isActive('link')
                                            ? UI_TYPES.PRIMARY
                                            : UI_TYPES.DEFAULT
                                    "
                                    :disabled="hasDisabledInput"
                                >
                                    <EtIconLink title="Make Link" />
                                </EtButton>
                            </template>
                            <EtBox ref="anchorPopoverContent">
                                <EtInputGroup>
                                    <EtInputGroupAddon>
                                        <EtIconLink title="Make Link" />
                                    </EtInputGroupAddon>
                                    <EtInput
                                        v-model="urlHref"
                                        :size="UI_SIZING.S"
                                        ref="urlHrefInput"
                                        @enter="() => addLink()"
                                        @focus="() => onInputFocus()"
                                        @blur="() => onInputBlur()"
                                        :disabled="hasDisabledInput"
                                        placeholder="Url"
                                    />
                                    <EtInputSelect
                                        class="et-sdk-wysiwyg--toolbar--tools--anchor-select"
                                        :options="urlTargetOptions"
                                        v-model="urlTarget"
                                        :size="UI_SIZING.S"
                                        :disabled="hasDisabledInput"
                                        @focus="() => onSelectFocus()"
                                        @blur="() => onSelectBlur()"
                                    ></EtInputSelect>
                                </EtInputGroup>
                                <EtButtonGroup>
                                    <EtButtonDanger
                                        class="no-grow"
                                        :size="UI_SIZING.S"
                                        :tabindex="9999"
                                        @click="
                                            () => {
                                                urlHref = undefined;
                                                addLink();
                                            }
                                        "
                                        :disabled="hasDisabledInput"
                                    >
                                        <EtIconTrash></EtIconTrash>
                                    </EtButtonDanger>
                                    <EtButtonDefault
                                        @click="() => cancelLink()"
                                        :size="UI_SIZING.S"
                                        :tabindex="9999"
                                        :disabled="hasDisabledInput"
                                    >
                                        cancel
                                    </EtButtonDefault>
                                    <EtButtonSuccess
                                        @click="() => addLink()"
                                        :size="UI_SIZING.S"
                                        :disabled="hasDisabledInput"
                                    >
                                        Save
                                    </EtButtonSuccess>
                                </EtButtonGroup>
                            </EtBox>
                        </EtPopover>
                        <EtButton
                            v-if="inlineImageUploadCallback"
                            :size="UI_SIZING.S"
                            :tabindex="9999"
                            :type="UI_TYPES.DEFAULT"
                            :disabled="hasDisabledInput"
                            @click="handleInlineImage"
                        >
                            <EtIconImage title="Add image" />
                        </EtButton>
                        <EtButton
                            v-if="hasAttachments"
                            :size="UI_SIZING.S"
                            :tabindex="9999"
                            :type="UI_TYPES.DEFAULT"
                            :disabled="hasDisabledInput"
                            @click="handleAttachment"
                        >
                            <EtIconPaperclip title="Add attachment" />
                        </EtButton>
                    </EtButtonGroup>

                    <!--
                        Normally falls under the misc group. But also should be able to have
                        attachments without the other items in the group
                     -->
                    <EtButtonGroup
                        v-else-if="
                            !enabledInputGroups.includes('misc') &&
                            hasAttachments
                        "
                    >
                        <EtButton
                            :size="UI_SIZING.S"
                            :tabindex="9999"
                            :type="UI_TYPES.DEFAULT"
                            :disabled="hasDisabledInput"
                            @click="handleAttachment"
                        >
                            <EtIconPaperclip title="Add attachment" />
                        </EtButton>
                    </EtButtonGroup>

                    <EtButtonGroup
                        v-if="enabledInputGroups.includes('heading')"
                    >
                        <EtButton
                            v-for="heading in [1, 2, 3, 4, 5, 6]"
                            :key="heading"
                            :size="UI_SIZING.S"
                            :tabindex="9999"
                            :type="
                                editor.isActive('heading', { level: heading })
                                    ? UI_TYPES.PRIMARY
                                    : UI_TYPES.DEFAULT
                            "
                            :disabled="hasDisabledInput"
                            @click="
                                runEditorMethod('toggleHeading', {
                                    level: heading
                                })
                            "
                        >
                            H{{ heading }}
                        </EtButton>
                    </EtButtonGroup>

                    <EtButtonGroup v-if="enabledInputGroups.includes('table')">
                        <EtButton
                            :size="UI_SIZING.S"
                            :tabindex="9999"
                            :type="UI_TYPES.DEFAULT"
                            :disabled="hasDisabledInput"
                            @click="
                                runEditorMethod('insertTable', {
                                    rows: 2,
                                    cols: 2,
                                    withHeaderRow: true
                                })
                            "
                        >
                            <EtLayer title="Add Table">
                                <EtIconTable
                                    transform="shrink-2"
                                    class="et-sdk-simple-table-icon-main"
                                />
                                <EtIconCirclePlus
                                    transform="right-6 down-6 shrink-3"
                                    class="et-sdk-simple-table-icon-secondary__success"
                                />
                            </EtLayer>
                        </EtButton>
                        <EtButton
                            :size="UI_SIZING.S"
                            :tabindex="9999"
                            :type="UI_TYPES.DEFAULT"
                            :disabled="hasDisabledInput"
                            @click="runEditorMethod('deleteTable')"
                        >
                            <EtLayer title="Remove Table">
                                <EtIconTable
                                    transform="shrink-2"
                                    class="et-sdk-simple-table-icon-main"
                                />
                                <EtIconCircleMinus
                                    transform="right-6 down-6 shrink-3"
                                    class="et-sdk-simple-table-icon-secondary__danger"
                                />
                            </EtLayer>
                        </EtButton>
                        <EtButton
                            :size="UI_SIZING.S"
                            :tabindex="9999"
                            :type="UI_TYPES.DEFAULT"
                            :disabled="hasDisabledInput"
                            @click="runEditorMethod('addColumnAfter')"
                        >
                            <EtLayer title="Add column">
                                <EtIconTableColumns
                                    transform="shrink-2"
                                    class="et-sdk-simple-table-icon-main"
                                />
                                <EtIconCirclePlus
                                    transform="right-6 down-6 shrink-3"
                                    class="et-sdk-simple-table-icon-secondary__success"
                                />
                            </EtLayer>
                        </EtButton>
                        <EtButton
                            :size="UI_SIZING.S"
                            :tabindex="9999"
                            :type="UI_TYPES.DEFAULT"
                            :disabled="hasDisabledInput"
                            @click="runEditorMethod('deleteColumn')"
                        >
                            <EtLayer title="Remove column">
                                <EtIconTableColumns
                                    transform="shrink-2"
                                    class="et-sdk-simple-table-icon-main"
                                />
                                <EtIconCircleMinus
                                    transform="right-6 down-6 shrink-3"
                                    class="et-sdk-simple-table-icon-secondary__danger"
                                />
                            </EtLayer>
                        </EtButton>
                        <EtButton
                            :size="UI_SIZING.S"
                            :tabindex="9999"
                            :type="UI_TYPES.DEFAULT"
                            :disabled="hasDisabledInput"
                            @click="runEditorMethod('addRowAfter')"
                        >
                            <EtLayer title="Add row">
                                <EtIconTableCells
                                    transform="shrink-2"
                                    class="et-sdk-simple-table-icon-main"
                                />
                                <EtIconCirclePlus
                                    transform="right-6 down-6 shrink-3"
                                    class="et-sdk-simple-table-icon-secondary__success"
                                />
                            </EtLayer>
                        </EtButton>
                        <EtButton
                            :size="UI_SIZING.S"
                            :tabindex="9999"
                            :type="UI_TYPES.DEFAULT"
                            :disabled="hasDisabledInput"
                            @click="runEditorMethod('deleteRow')"
                        >
                            <EtLayer title="Remove row">
                                <EtIconTableCells
                                    transform="shrink-2"
                                    class="et-sdk-simple-table-icon-main"
                                />
                                <EtIconCircleMinus
                                    transform="right-6 down-6 shrink-3"
                                    class="et-sdk-simple-table-icon-secondary__danger"
                                />
                            </EtLayer>
                        </EtButton>
                    </EtButtonGroup>

                    <slot />
                </div>
            </div>

            <div>
                <EtButtonGroup v-if="enabledInputGroups.includes('html')">
                    <EtButton
                        :size="UI_SIZING.S"
                        :tabindex="9999"
                        :type="UI_TYPES.DEFAULT"
                        @click="toggleEditMode"
                    >
                        <EtIconCode
                            v-if="editMode === EDIT_MODES.WYSIWYG"
                            title="Show code"
                        />
                        <EtIconFont
                            v-else-if="editMode === EDIT_MODES.CODE"
                            title="Show WYSIWYG"
                        />
                    </EtButton>
                </EtButtonGroup>
            </div>
        </div>
        <div class="et-sdk-wysiwyg-content" ref="editor">
            <EditorContent
                class="et-sdk-wysiwyg-editor"
                :class="{
                    'et-sdk-wysiwyg-editor--with-inner': $slots.inner
                }"
                :editor="editor"
                v-if="editMode === EDIT_MODES.WYSIWYG"
            />
            <EtTextarea
                v-else-if="editMode === EDIT_MODES.CODE"
                rows="12"
                v-model="innerData"
            />
            <div
                class="et-sdk-wysiwyg-content__inner-bottom-content"
                v-if="$slots.inner"
            >
                <slot name="inner"></slot>
            </div>
        </div>
        <input
            v-if="hasAttachments"
            type="file"
            ref="attachmentFileInput"
            v-bind="attachmentInputArgs"
            style="display: none"
            @change="onAttachmentFileInputChange"
        />
        <input
            v-if="enabledInputGroups.includes('misc')"
            type="file"
            ref="inlineImageInput"
            accept="image/*"
            style="display: none"
            @change="onInlineImageFileInputChange"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import ImageResize from "tiptap-extension-resize-image";
import Image from "@tiptap/extension-image";

import EtButtonGroup from "../etButton/EtButtonGroup.vue";
import EtButton from "../etButton/EtButton.vue";
import EtButtonDanger from "../etButton/EtButtonDanger.vue";
import EtButtonDefault from "../etButton/EtButtonDefault.vue";
import EtButtonSuccess from "../etButton/EtButtonSuccess.vue";
import EtLayer from "../etIcon/EtLayer.vue";
import EtIconBold from "../etIcon/EtIconBold.vue";
import EtIconItalic from "../etIcon/EtIconItalic.vue";
import EtIconUnderline from "../etIcon/EtIconUnderline.vue";
import EtIconListUl from "../etIcon/EtIconListUl.vue";
import EtIconListOl from "../etIcon/EtIconListOl.vue";
import EtIconAlignLeft from "../etIcon/EtIconAlignLeft.vue";
import EtIconAlignCenter from "../etIcon/EtIconAlignCenter.vue";
import EtIconAlignRight from "../etIcon/EtIconAlignRight.vue";
import EtIconAlignJustify from "../etIcon/EtIconAlignJustify.vue";
import EtIconQuoteLeft from "../etIcon/EtIconQuoteLeft.vue";
import EtIconLink from "../etIcon/EtIconLink.vue";
import EtIconTrash from "../etIcon/EtIconTrash.vue";
import EtIconCode from "../etIcon/EtIconCode.vue";
import EtIconFont from "../etIcon/EtIconFont.vue";
import EtIconTable from "../etIcon/EtIconTable.vue";
import EtIconTableColumns from "../etIcon/EtIconTableColumns.vue";
import EtIconTableCells from "../etIcon/EtIconTableCells.vue";
import EtIconCirclePlus from "../etIcon/EtIconCirclePlus.vue";
import EtIconCircleMinus from "../etIcon/EtIconCircleMinus.vue";
import EtIconPaperclip from "../etIcon/EtIconPaperclip.vue";
import EtIconImage from "../etIcon/EtIconImage.vue";
import EtPopover from "../EtPopover.vue";
import EtBox from "../EtBox.vue";
import EtInputGroup from "./EtInputGroup.vue";
import EtInputGroupAddon from "./EtInputGroupAddon.vue";
import EtInput from "./EtInput.vue";
import EtInputSelect from "./EtInputSelect.vue";
import { UI_SIZING, UI_TYPES } from "../../helpers/enums";
import { OptionModel } from "../../models/Option";
import { wait } from "../../helpers/async";
import { generateId } from "../../helpers/random";
import EtTextarea from "./EtTextarea.vue";
import { AllowStyleExtension } from "../../helpers/tiptap/AllowStyleExtension";

export const EDIT_MODES = {
    WYSIWYG: "WYSIWYG",
    CODE: "CODE"
};

export default defineComponent({
    props: {
        name: {
            type: String,
            required: false,
            default() {
                return generateId(25, "input");
            }
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        readonly: {
            type: Boolean,
            required: false,
            default: false
        },
        modelValue: {
            type: [String, Number],
            required: false,
            default: null
        },
        enabledInputGroups: {
            type: Array,
            required: false,
            default() {
                return [
                    "style",
                    "list",
                    "align",
                    "misc",
                    "heading",
                    "table",
                    "html"
                ];
            }
        },
        hasAttachments: {
            type: Boolean,
            default: false
        },
        attachmentInputArgs: {
            type: Object,
            default() {
                return {};
            }
        },
        inlineImageUploadCallback: {
            type: Function as PropType<
                ((file: File) => Promise<string>) | undefined
            >,
            required: false,
            default: undefined
        },
        preventImageDrop: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    components: {
        EtIconPaperclip,
        EtTextarea,
        EtPopover,
        EtBox,
        EditorContent,

        EtInputGroup,
        EtInputGroupAddon,
        EtInput,
        EtInputSelect,

        EtButtonGroup,
        EtButton,
        EtButtonDanger,
        EtButtonDefault,
        EtButtonSuccess,

        EtLayer,

        EtIconBold,
        EtIconItalic,
        EtIconUnderline,
        EtIconListUl,
        EtIconListOl,
        EtIconAlignLeft,
        EtIconAlignCenter,
        EtIconAlignRight,
        EtIconAlignJustify,
        EtIconQuoteLeft,
        EtIconLink,
        EtIconTrash,
        EtIconCode,
        EtIconFont,
        EtIconTable,
        EtIconTableColumns,
        EtIconTableCells,
        EtIconCirclePlus,
        EtIconCircleMinus,
        EtIconImage
    },
    data() {
        return {
            EDIT_MODES,
            // Impossible to set proper type to editor
            editor: null as any,
            innerData: this.modelValue as string | number | undefined,

            urlHref: undefined,
            urlTarget: undefined as OptionModel | undefined,
            urlTargetOptions: [
                new OptionModel({ label: "Empty", value: "" }),
                new OptionModel({ label: "Blank", value: "_blank" }),
                new OptionModel({ label: "Self", value: "_self" }),
                new OptionModel({ label: "Parent", value: "_parent" }),
                new OptionModel({ label: "Top", value: "_top" })
            ],
            urlFocusPoint: null as "input" | "select" | null,

            editMode: EDIT_MODES.WYSIWYG,

            hasDropEventListener: false
        };
    },
    computed: {
        hasDisabledInput() {
            return (
                this.disabled ||
                this.readonly ||
                this.editMode === EDIT_MODES.CODE
            );
        },
        UI_SIZING() {
            return UI_SIZING;
        },
        UI_TYPES() {
            return UI_TYPES;
        }
    },
    watch: {
        innerData: {
            immediate: true,
            handler(value) {
                this.$emit("update:modelValue", value);
                if (this.editMode === EDIT_MODES.CODE && this.editor) {
                    this.editor.commands.setContent(
                        value ? String(value) : "",
                        false
                    );
                }
            }
        },
        modelValue() {
            if (this.innerData !== this.modelValue && this.editor) {
                this.innerData = this.modelValue;
                this.editor.commands.setContent(
                    this.innerData ? String(this.innerData) : "",
                    false
                );
            }
        },
        disabled: "setEditable",
        readonly: "setEditable",
        editMode: "setEditable",
        inlineImageUploadCallback: "inlineImageUploadCallbackChangeHandler"
    },
    methods: {
        inlineImageUploadCallbackChangeHandler() {
            const editor = this.$refs.editor as HTMLElement;

            if (!this.inlineImageUploadCallback && this.hasDropEventListener) {
                this.hasDropEventListener = false;
                editor.removeEventListener("drop", this.onDropHandler);
            } else if (
                this.inlineImageUploadCallback &&
                !this.hasDropEventListener
            ) {
                this.hasDropEventListener = true;
                editor.addEventListener("drop", this.onDropHandler);
            }
        },
        async onDropHandler(event: DragEvent) {
            if (this.editMode === EDIT_MODES.CODE) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            const files = event.dataTransfer?.files || [];
            if (!files || files.length < 0) {
                return;
            }

            const promises = [];
            for (const file of files) {
                promises.push(this.handleInlineImageFile(file));
            }
            await Promise.all(promises);
        },
        toggleEditMode() {
            if (this.editMode === EDIT_MODES.WYSIWYG) {
                this.editMode = EDIT_MODES.CODE;
            } else if (this.editMode === EDIT_MODES.CODE) {
                this.editMode = EDIT_MODES.WYSIWYG;
            }
        },
        runEditorMethod(method: string, ...args: unknown[]) {
            const ctx = this.editor?.chain().focus();
            ctx[method]?.(...args).run();
        },
        onInputFocus() {
            if (this.hasDisabledInput) {
                return;
            }
            this.urlFocusPoint = "input";
        },
        onSelectFocus() {
            this.urlFocusPoint = "select";
        },
        async onInputBlur() {
            await wait(50);
            if (this.urlFocusPoint === "input") {
                this.urlFocusPoint = null;
            }

            await this.commonBlur();
        },
        async onSelectBlur() {
            (this.$refs?.urlHrefInput as any)?.focus?.();
        },
        async commonBlur() {
            await wait(150);
            if (!this.urlFocusPoint) {
                this.cancelLink();
            }
        },
        async toggleAnchorPopover() {
            if (!this.urlHref && this.editor) {
                this.urlHref = this.editor.getAttributes("link").href;
                const target = this.editor.getAttributes("link").target;
                this.urlTarget = this.urlTargetOptions.find(
                    (opt) => opt.value === target
                );
            }

            if (!this.urlTarget) {
                this.urlTarget = this.urlTargetOptions.find(
                    (opt) => opt.value === ""
                );
            }

            await (this.$refs.anchorPopover as any)?.toggleDropdown();
            await wait(50);
            (this.$refs.urlHrefInput as any).focus();
        },
        cancelLink() {
            this.urlHref = undefined;
            this.urlTarget = undefined;
            (this.$refs.anchorPopover as any)?.hideDropDown();
        },
        addLink() {
            let chain = this.editor?.chain().focus().extendMarkRange("link");

            if (!this.urlHref && chain) {
                chain = chain.unsetLink();
            } else if (chain) {
                chain = chain.setLink({
                    href: this.urlHref ?? "",
                    target: this.urlTarget?.value
                });
            }

            chain?.run();
            this.cancelLink();
        },
        setEditable() {
            this.editor?.setEditable(!this.hasDisabledInput);
        },
        focus() {
            const editor = this.$refs.editor as HTMLElement;
            const input = editor.querySelector(
                ".et-sdk-wysiwyg--editor-textarea"
            ) as HTMLElement;
            input?.focus();
        },
        blur() {
            const editor = this.$refs.editor as HTMLElement;
            const input = editor.querySelector(
                ".et-sdk-wysiwyg--editor-textarea"
            ) as HTMLElement;
            input?.blur();
        },
        handleAttachment() {
            (this.$refs.attachmentFileInput as any)?.click?.();
        },
        onAttachmentFileInputChange(event: Event) {
            const target = event.target as HTMLInputElement;
            const files = target.files || [];

            if (!files || files.length < 0) {
                return;
            }

            this.$emit("attachments", files);
            target.value = "";
        },
        handleInlineImage() {
            (this.$refs.inlineImageInput as any)?.click?.();
        },
        async onInlineImageFileInputChange(event: Event) {
            const target = event.target as HTMLInputElement;
            const files = target.files || [];

            if (!files || files.length < 0) {
                return;
            }

            await this.handleInlineImageFile(files[0]!);
            target.value = "";
        },
        async handleInlineImageFile(file: File) {
            if (!this.inlineImageUploadCallback) {
                console.error(
                    "Can't add image without inlineImageUploadCallback function"
                );
                return;
            }

            const url = await this.inlineImageUploadCallback(file);
            if (url) {
                this.runEditorMethod("setImage", {
                    src: url
                });
            }
        }
    },
    mounted() {
        this.editor = new Editor({
            content: this.innerData ? String(this.innerData) : "",
            editable: !this.hasDisabledInput,
            editorProps: {
                attributes: {
                    class: "et-sdk-wysiwyg--editor-textarea prose"
                },
                handleDrop: (view, event) => {
                    const files = event.dataTransfer?.files;

                    if (files && files.length) {
                        const file = files[0];
                        if (
                            file?.type.startsWith("image/") &&
                            this.preventImageDrop
                        ) {
                            event.preventDefault();
                            event.stopPropagation();
                            return true;
                        }
                    }
                    return false;
                },
                handlePaste: (view, event) => {
                    const files = event.clipboardData?.files;

                    if (files && files.length) {
                        const file = files[0];
                        if (
                            file?.type.startsWith("image/") &&
                            this.preventImageDrop
                        ) {
                            event.preventDefault();
                            event.stopPropagation();
                            return true;
                        } else if (file?.type.startsWith("image/")) {
                            this.handleInlineImageFile(file);

                            event.preventDefault();
                            event.stopPropagation();
                            return true;
                        }
                    }
                    return false;
                }
            },
            extensions: [
                StarterKit.configure({
                    link: {
                        openOnClick: false,
                        HTMLAttributes: {
                            rel: "noopener",
                            target: ""
                        }
                    }
                }),
                Typography,
                Table,
                TableCell,
                TableHeader,
                TableRow,
                Image.configure({
                    allowBase64: true
                }),
                ImageResize.configure({
                    inline: false
                }),
                TextAlign.configure({
                    types: ["paragraph"],
                    alignments: ["left", "center", "right"]
                }),
                AllowStyleExtension
            ],
            onUpdate: () => {
                this.innerData = this.editor?.getHTML();
            }
        });

        this.$nextTick(this.inlineImageUploadCallbackChangeHandler);
    },
    beforeUnmount() {
        this.editor?.destroy();

        const editor = this.$refs.editor as HTMLElement;
        try {
            editor?.removeEventListener("drop", this.onDropHandler);
        } catch (e) {
            console.warn("Failed to remove drop event listener:", e);
        }
    },
    emits: ["update:modelValue", "attachments"]
});
</script>

<style>
.et-sdk-wysiwyg {
    display: block;
    width: 100%;
}

.et-sdk-wysiwyg--toolbar {
    display: flex;
    flex-direction: row;
    gap: 8px;

    border-top-left-radius: var(--et-sdk-input-border-radius);
    border-top-right-radius: var(--et-sdk-input-border-radius);

    padding: 8px;

    border: 1px solid var(--et-sdk-dark-300);
    font-weight: var(--et-sdk-font-weight-normal);
    border-bottom: none;
    font-size: var(--et-sdk-font-size-normal);
    line-height: 20px;
    color: var(--et-sdk-dark-800);

    background-color: var(--et-sdk-dark-100);
}

.et-sdk-wysiwyg--toolbar--tools {
    display: flex;
    flex-direction: row;
    gap: 8px;
    flex-wrap: wrap;
}

.et-sdk-wysiwyg--toolbar--tools--anchor-select {
    width: 100px;
}

.et-sdk-simple-table-icon-main {
    color: var(--et-sdk-dark-300);
}

.et-sdk-simple-table-icon-secondary__success {
    color: var(--et-sdk-success-700);
}

.et-sdk-simple-table-icon-secondary__danger {
    color: var(--et-sdk-danger-700);
}

.et-sdk-wysiwyg--toolbar__disabled .et-sdk-simple-table-icon-main {
    color: var(--et-sdk-dark-400);
}

.et-sdk-wysiwyg--toolbar__disabled .et-sdk-simple-table-icon-secondary__success,
.et-sdk-wysiwyg--toolbar__disabled .et-sdk-simple-table-icon-secondary__danger {
    color: var(--et-sdk-dark-600);
}

.et-sdk-wysiwyg--editor-textarea {
    max-width: 100%;
    min-height: 300px;
    border-bottom-left-radius: var(--et-sdk-input-border-radius);
    border-bottom-right-radius: var(--et-sdk-input-border-radius);
    padding: 8px;
    border-top: none;
    font-weight: var(--et-sdk-font-weight-normal);
}

.et-sdk-wysiwyg--editor-textarea th {
    border: 1px solid var(--et-sdk-dark-200);
    padding: 0 4px;
    background-color: var(--et-sdk-dark-50);
}

.et-sdk-wysiwyg--editor-textarea td {
    border: 1px solid var(--et-sdk-dark-200);
    padding: 4px 4px 0;
}

.et-sdk-wysiwyg-content {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--et-sdk-dark-300);
    border-bottom-left-radius: var(--et-sdk-input-border-radius);
    border-bottom-right-radius: var(--et-sdk-input-border-radius);
}

.et-sdk-wysiwyg--editor-textarea:focus {
    outline: none;
}

.et-sdk-wysiwyg-content:has(.et-sdk-wysiwyg--editor-textarea:focus) {
    outline: 2px solid;
}

.et-sdk-wysiwyg-content__inner-bottom-content {
    padding: 8px;
}
</style>
