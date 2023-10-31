<template>
    <div
        ref="checkbox"
        class="et-sdk-checkbox"
        :class="{
            'et-sdk-checkbox__checked': checked,
            'et-sdk-checkbox__indeterminate': indeterminate
        }"
        type="checkbox"
        :tabindex="tabindex"
        :name="name"
        :disabled="disabled"
        @click="handleOnClick"
        :indeterminate="internalIndeterminate"
        @keyup.enter="internalChecked = !internalChecked"
    >
        <!--        <div v-if="checked">&check;</div>-->
        <!--        <div v-else-if="indeterminate">&minus;</div>-->
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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
                    const checkboxRef = this.$refs.checkbox as any;
                    checkboxRef.indeterminate = this.internalIndeterminate;
                });
                this.$emit("update:indeterminate", this.internalIndeterminate);
            }
        }
    },
    methods: {
        handleOnClick() {
            if (this.readonly || this.disabled) {
                return;
            }

            this.internalChecked = !this.internalChecked;
        }
    },
    emits: {
        "update:checked": (value: boolean) => true,
        "update:indeterminate": (value: boolean) => true
    }
});
</script>

<style>
.et-sdk-checkbox {
    appearance: none;
    vertical-align: middle;
    cursor: pointer;
    background-color: white;
    border-radius: 4px;
    border: 1.5px solid var(--et-sdk-dark-400);
    position: relative;
    color: var(--et-sdk-blue-600);
    fill: var(--et-sdk-blue-600);
    text-align: center;
    line-height: 12px;
    font-size: var(--et-sdk-font-size-large);
    font-weight: var(--et-sdk-font-weight-bold);

    width: 15px;
    height: 15px;
}

.et-sdk-checkbox:before {
    position: absolute;
    left: -2px;
    top: -1px;
}

.et-sdk-checkbox__checked:before {
    content: "\2713";
}

.et-sdk-checkbox__indeterminate:before {
    content: "\2013";
    left: 1px;
}
</style>
