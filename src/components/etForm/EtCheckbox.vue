<template>
    <input
        ref="checkbox"
        v-model="internalChecked"
        class="et-checkbox appearance-none align-middle outline-none cursor-pointer bg-white rounded-sm ring-1 relative text-primary fill-primary text-center checked:after:content-['\2713'] indeterminate:after:content-['\2014'] w-3 h-3 text-base leading-3 font-extrabold after:absolute after:-left-[1px] after:-top-[1px]"
        type="checkbox"
        :tabindex="tabindex"
        :name="name"
        :disabled="disabled"
        :onclick="readonly ? 'return false;' : ''"
        :indeterminate="internalIndeterminate"
        @keyup.enter="internalChecked = !internalChecked"
    />
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import { generateId } from "../../helpers/random";

export default defineComponent({
    model: {
        // backwards compatibility with vue2.x
        prop: "checked",
        event: "update:checked"
    },
    props: {
        name: {
            type: String,
            required: false,
            default() {
                return generateId(25, "input");
            }
        },
        checked: {
            type: Boolean,
            required: false,
            default: false
        },
        indeterminate: {
            type: Boolean,
            required: false,
            default: false
        },
        readonly: {
            type: Boolean,
            required: false,
            default: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        tabindex: {
            type: Number,
            required: false,
            default: 1
        }
    },
    data() {
        return {
            internalChecked: false,
            internalIndeterminate: this.indeterminate
        };
    },
    watch: {
        checked: {
            immediate: true,
            handler() {
                this.internalChecked = this.checked;
            }
        },
        indeterminate() {
            this.internalIndeterminate = this.indeterminate;
        },
        internalChecked: {
            immediate: true,
            handler() {
                this.$emit("update:checked", this.internalChecked);
            }
        },
        internalIndeterminate: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    this.$refs.checkbox.indeterminate =
                        this.internalIndeterminate;
                });
                this.$emit("update:indeterminate", this.internalIndeterminate);
            }
        }
    },
    emits: {
        "update:checked": () => true,
        "update:indeterminate": () => true
    }
});
</script>
