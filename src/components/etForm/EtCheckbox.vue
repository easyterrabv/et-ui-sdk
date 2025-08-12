<template>
    <div
        ref="checkbox"
        class="et-sdk-checkbox"
        :class="{
            'et-sdk-checkbox--checked': internalChecked,
            'et-sdk-checkbox--indeterminate': indeterminate,
            'et-sdk-checkbox--disabled': disabled
        }"
        type="checkbox"
        :tabindex="tabindex"
        :name="name"
        :disabled="disabled"
        @click="handleOnClick"
        :indeterminate="internalIndeterminate"
        @keyup.enter="internalChecked = !internalChecked"
    >
        <svg
            v-if="internalChecked"
            class="et-sdk-checkbox__checked-icon"
            width="12"
            height="10"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="m11.477 1.776-.88-.887a.469.469 0 0 0-.664-.003L4.412 6.363 2.076 4.01a.469.469 0 0 0-.663-.003l-.887.88a.469.469 0 0 0-.003.663L4.07 9.124c.183.184.48.185.663.003l6.742-6.688a.469.469 0 0 0 .003-.663Z"
                fill-rule="nonzero"
            />
        </svg>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { generateId } from "../../helpers/random";

export default defineComponent({
    props: {
        name: {
            type: String,
            default() {
                return generateId(25, "input");
            }
        },
        checked: {
            type: Boolean,
            default: false
        },
        indeterminate: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        tabindex: {
            type: Number,
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
                    if (!checkboxRef || !checkboxRef.indeterminate || !this) {
                        return;
                    }
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
        "update:checked": (_value: boolean) => true,
        "update:indeterminate": (_value: boolean) => true
    }
});
</script>

<style>
.et-sdk-checkbox {
    appearance: none;
    vertical-align: middle;
    cursor: pointer;
    background-color: var(--et-sdk-light-0);
    border-radius: 4px;
    border: 1px solid var(--et-sdk-dark-400);
    color: var(--et-sdk-blue-600);
    fill: var(--et-sdk-blue-600);
    text-align: center;
    font-size: var(--et-sdk-font-size-extra-large);
    line-height: 28px;
    font-weight: var(--et-sdk-font-weight-bold);

    width: 17px;
    height: 17px;

    display: flex;
    align-items: center;
    justify-content: center;
}

.et-sdk-checkbox--indeterminate:before {
    content: "\2013";
}

.et-sdk-checkbox--disabled {
    cursor: not-allowed;
    background-color: var(--et-sdk-dark-100);
}
</style>
