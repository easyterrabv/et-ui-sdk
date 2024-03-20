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
        <EtIconCheck
            class="et-sdk-checkbox__checked-icon"
            v-if="internalChecked"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { generateId } from "../../helpers/random";

import EtIconCheck from "../etIcon/EtIconCheckSolid.vue";

export default defineComponent({
    components: {
        EtIconCheck
    },
    model: {
        // backwards compatibility with vue2.x
        prop: "checked",
        event: "update:checked"
    },
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
    background-color: var(--et-sdk-light-0);
    border-radius: 4px;
    border: 1.5px solid var(--et-sdk-dark-400);
    position: relative;
    color: var(--et-sdk-blue-600);
    fill: var(--et-sdk-blue-600);
    text-align: center;
    font-size: var(--et-sdk-font-size-extra-large);
    line-height: 28px;
    font-weight: var(--et-sdk-font-weight-bold);

    width: 15px;
    height: 15px;
}

.et-sdk-checkbox:before {
    position: absolute;
    left: -2px;
    top: -8px;
}

.et-sdk-checkbox__checked-icon {
    position: absolute;
    left: -3px;
    top: -1px;
    font-size: 16px;
}

.et-sdk-checkbox--indeterminate:before {
    content: "\2013";
    left: 1px;
}

.et-sdk-checkbox--disabled {
    cursor: not-allowed;
    background-color: var(--et-sdk-dark-100);
}
</style>
