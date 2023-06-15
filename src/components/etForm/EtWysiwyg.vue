<template>
    <div class="et-wysiwyg block w-full" v-if="editor" :name="name">
        <div
            class="et-wysiwyg-toolbar flex flex-row gap-2 rounded-t-md p-2 text-text ring-1 ring-default-light"
        >
            <EtButtonGroup>
                <EtButton
                    :size="UI_SIZING.S"
                    :type="
                        editor.isActive('bold')
                            ? UI_TYPES.PRIMARY
                            : UI_TYPES.DEFAULT
                    "
                    :disabled="disabled || readonly"
                    @click="runEditorMethod('toggleBold')"
                >
                    <EtIconBold title="Make Bold" />
                </EtButton>
                <EtButton
                    :size="UI_SIZING.S"
                    :type="
                        editor.isActive('italic')
                            ? UI_TYPES.PRIMARY
                            : UI_TYPES.DEFAULT
                    "
                    :disabled="disabled || readonly"
                    @click="runEditorMethod('toggleItalic')"
                >
                    <EtIconItalic title="Make Italic" />
                </EtButton>
                <EtButton
                    :size="UI_SIZING.S"
                    :type="
                        editor.isActive('underline')
                            ? UI_TYPES.PRIMARY
                            : UI_TYPES.DEFAULT
                    "
                    :disabled="disabled || readonly"
                    @click="runEditorMethod('toggleUnderline')"
                >
                    <EtIconUnderline title="Underline Text" />
                </EtButton>
            </EtButtonGroup>

            <EtButtonGroup>
                <EtButton
                    :size="UI_SIZING.S"
                    :type="
                        editor.isActive('bulletList')
                            ? UI_TYPES.PRIMARY
                            : UI_TYPES.DEFAULT
                    "
                    :disabled="disabled || readonly"
                    @click="runEditorMethod('toggleBulletList')"
                >
                    <EtIconListUl title="Make Unordered List" />
                </EtButton>
                <EtButton
                    :size="UI_SIZING.S"
                    :type="
                        editor.isActive('orderedList')
                            ? UI_TYPES.PRIMARY
                            : UI_TYPES.DEFAULT
                    "
                    :disabled="disabled || readonly"
                    @click="runEditorMethod('toggleOrderedList')"
                >
                    <EtIconListOl title="Make Ordered List" />
                </EtButton>
            </EtButtonGroup>

            <EtButtonGroup>
                <EtButton
                    :size="UI_SIZING.S"
                    :type="
                        editor.isActive({ textAlign: 'left' })
                            ? UI_TYPES.PRIMARY
                            : UI_TYPES.DEFAULT
                    "
                    :disabled="disabled || readonly"
                    @click="runEditorMethod('setTextAlign', 'left')"
                >
                    <EtIconAlignLeft title="Align Text Left" />
                </EtButton>
                <EtButton
                    :size="UI_SIZING.S"
                    :type="
                        editor.isActive({ textAlign: 'center' })
                            ? UI_TYPES.PRIMARY
                            : UI_TYPES.DEFAULT
                    "
                    :disabled="disabled || readonly"
                    @click="runEditorMethod('setTextAlign', 'center')"
                >
                    <EtIconAlignCenter title="Align Text Center" />
                </EtButton>
                <EtButton
                    :size="UI_SIZING.S"
                    :type="
                        editor.isActive({ textAlign: 'right' })
                            ? UI_TYPES.PRIMARY
                            : UI_TYPES.DEFAULT
                    "
                    :disabled="disabled || readonly"
                    @click="runEditorMethod('setTextAlign', 'right')"
                >
                    <EtIconAlignRight title="Align Text Right" />
                </EtButton>
            </EtButtonGroup>

            <EtButtonGroup>
                <EtButton
                    :size="UI_SIZING.S"
                    :type="
                        editor.isActive('blockquote')
                            ? UI_TYPES.PRIMARY
                            : UI_TYPES.DEFAULT
                    "
                    :disabled="disabled || readonly"
                    @click="runEditorMethod('toggleBlockquote')"
                >
                    <EtIconQuoteLeft title="Make Quote" />
                </EtButton>
                <EtPopover ref="anchorPopover" manual>
                    <template #toggle>
                        <EtButton
                            :size="UI_SIZING.S"
                            @click="toggleAnchorPopover"
                            :type="
                                editor.isActive('link') ? 'primary' : 'default'
                            "
                            :disabled="disabled || readonly"
                        >
                            <EtIconLink title="Make Link" />
                        </EtButton>
                    </template>
                    <EtBox ref="anchorPopoverContent" class="!p-2">
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
                                placeholder="Url"
                            />
                            <EtInputSelect
                                :options="urlTargetOptions"
                                v-model="urlTarget"
                                :size="UI_SIZING.S"
                                @focus="() => onSelectFocus()"
                                @blur="() => onSelectBlur()"
                                class="!w-24"
                            ></EtInputSelect>
                        </EtInputGroup>
                        <EtButtonGroup class="mt-2">
                            <EtButtonDanger
                                class="!grow-0"
                                :size="UI_SIZING.S"
                                @click="
                                    () => {
                                        urlHref = null;
                                        addLink();
                                    }
                                "
                                :disabled="disabled || readonly"
                            >
                                <EtIconTrash></EtIconTrash>
                            </EtButtonDanger>
                            <EtButtonDefault
                                @click="() => cancelLink()"
                                :size="UI_SIZING.S"
                                :disabled="disabled || readonly"
                            >
                                cancel
                            </EtButtonDefault>
                            <EtButtonSuccess
                                @click="() => addLink()"
                                :size="UI_SIZING.S"
                                :disabled="disabled || readonly"
                            >
                                Save
                            </EtButtonSuccess>
                        </EtButtonGroup>
                    </EtBox>
                </EtPopover>
            </EtButtonGroup>

            <EtButtonGroup>
                <EtButton
                    v-for="heading in [1, 2, 3, 4, 5, 6]"
                    :key="heading"
                    :size="UI_SIZING.S"
                    :type="
                        editor.isActive('heading', { level: heading })
                            ? 'primary'
                            : 'default'
                    "
                    :disabled="disabled || readonly"
                    @click="
                        runEditorMethod('toggleHeading', { level: heading })
                    "
                >
                    H{{ heading }}
                </EtButton>
            </EtButtonGroup>
        </div>
        <div class="et-wysiwyg-content">
            <EditorContent class="et-wysiwyg-editor" :editor="editor" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Link } from "@tiptap/extension-link";
import { Heading } from "@tiptap/extension-heading";
import EtButtonGroup from "src/components/etButton/EtButtonGroup.vue";
import EtButton from "src/components/etButton/EtButton.vue";
import EtButtonDanger from "src/components/etButton/EtButtonDanger.vue";
import EtButtonDefault from "src/components/etButton/EtButtonDefault.vue";
import EtButtonSuccess from "src/components/etButton/EtButtonSuccess.vue";
import EtIconBold from "src/components/etIcon/EtIconBold.vue";
import EtIconItalic from "src/components/etIcon/EtIconItalic.vue";
import EtIconUnderline from "src/components/etIcon/EtIconUnderline.vue";
import EtIconListUl from "src/components/etIcon/EtIconListUl.vue";
import EtIconListOl from "src/components/etIcon/EtIconListOl.vue";
import EtIconAlignLeft from "src/components/etIcon/EtIconAlignLeft.vue";
import EtIconAlignCenter from "src/components/etIcon/EtIconAlignCenter.vue";
import EtIconAlignRight from "src/components/etIcon/EtIconAlignRight.vue";
import EtIconQuoteLeft from "src/components/etIcon/EtIconQuoteLeft.vue";
import EtIconLink from "src/components/etIcon/EtIconLink.vue";
import EtIconTrash from "src/components/etIcon/EtIconTrash.vue";
import EtPopover from "src/components/EtPopover.vue";
import EtBox from "src/components/EtBox.vue";
import EtInputGroup from "src/components/etForm/EtInputGroup.vue";
import EtInputGroupAddon from "src/components/etForm/EtInputGroupAddon.vue";
import EtInput from "src/components/etForm/EtInput.vue";
import EtInputSelect from "src/components/etForm/EtInputSelect.vue";
import { UI_SIZING, UI_TYPES } from "../../enums";
import { OptionModel } from "../../models/Option";
import { wait } from "../../helpers/async";
import { generateId } from "src/helpers/random";

export default defineComponent({
    model: {
        // backwards compatibility with vue2.x
        prop: "modelValue",
        event: "update:modelValue"
    },
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
            type: String,
            required: false,
            default: null
        }
    },
    computed: {
        UI_SIZING() {
            return UI_SIZING;
        },
        UI_TYPES() {
            return UI_TYPES;
        }
    },
    components: {
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

        EtIconBold,
        EtIconItalic,
        EtIconUnderline,
        EtIconListUl,
        EtIconListOl,
        EtIconAlignLeft,
        EtIconAlignCenter,
        EtIconAlignRight,
        EtIconQuoteLeft,
        EtIconLink,
        EtIconTrash
    },
    data() {
        return {
            editor: null as Editor,
            innerData: null as string | null,

            urlHref: null,
            urlTarget: null as OptionModel | null,
            urlTargetOptions: [
                new OptionModel({ label: "Empty", value: "" }),
                new OptionModel({ label: "Blank", value: "_blank" }),
                new OptionModel({ label: "Self", value: "_self" }),
                new OptionModel({ label: "Parent", value: "_parent" }),
                new OptionModel({ label: "Top", value: "_top" })
            ],
            urlFocusPoint: null as "input" | "select" | null
        };
    },
    watch: {
        innerData: {
            immediate: true,
            handler(value) {
                this.$emit("update:modelValue", this.innerData);
            }
        },
        disabled: "setEditable",
        readonly: "setEditable"
    },
    methods: {
        runEditorMethod(method, ...args) {
            this.editor
                ?.chain()
                .focus()
                [method]?.(...args)
                .run();
        },
        onInputFocus() {
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
            this.$refs.urlHrefInput.focus();
        },
        async commonBlur() {
            await wait(150);
            if (!this.urlFocusPoint) {
                this.cancelLink();
            }
        },
        async toggleAnchorPopover() {
            if (!this.urlHref) {
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

            this.$refs.anchorPopover.togglePopover();
            await wait(50);
            this.$refs.urlHrefInput.focus();
        },
        cancelLink() {
            this.urlHref = null;
            this.urlTarget = null;
            this.$refs.anchorPopover.hide();
        },
        addLink() {
            let chain = this.editor.chain().focus().extendMarkRange("link");

            if (!this.urlHref) {
                chain = chain.unsetLink();
            } else {
                chain = chain.setLink({
                    href: this.urlHref,
                    target: this.urlTarget?.value
                });
            }

            chain.run();
            this.cancelLink();
        },
        setEditable() {
            this.editor.setEditable(!(this.disabled || this.readonly));
        }
    },
    mounted() {
        this.editor = new Editor({
            content: this.innerData,
            editable: !(this.disabled || this.readonly),
            editorProps: {
                attributes: {
                    class: "prose prose-sm !max-w-full min-h-[300px] rounded-b-md border-0 p-2 focus-visible:ring-0 focus-visible:ring-offset-0 text-text shadow-sm ring-1 ring-default-light placeholder:text-text-light focus:ring-1 focus:ring-primary transition-colors duration-200 ease-in-out"
                }
            },
            extensions: [
                StarterKit,
                Underline,
                Typography,
                Link.configure({
                    openOnClick: false,
                    HTMLAttributes: {
                        rel: "noopener",
                        target: ""
                    }
                }),
                TextAlign.configure({
                    types: ["paragraph"],
                    alignments: ["left", "center", "right"]
                }),
                Heading
            ],
            onUpdate: () => {
                this.innerData = this.editor.getHTML();
            }
        });
    },
    beforeUnmount() {
        this.editor?.destroy();
    }
});
</script>
