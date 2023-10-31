<template>
    <div
        class="et-sdk-sidebar-button-wrapper"
        :class="{
            'et-sdk-sidebar-button-wrapper__menu-open': !isCollapsed,
            'et-sdk-sidebar-button-wrapper__menu-collapsed': isCollapsed
        }"
    >
        <EtButton
            ref="etButton"
            :type="type"
            @click="onClick"
            :size="UI_SIZING.S"
            class="et-sdk-sidebar-button__menu-open"
            :active="isActive"
            :disabled="internalDisabled"
            :readonly="readonly"
            v-bind="{ ...$attrs }"
        >
            <span v-if="$slots.icon">
                <slot name="icon"></slot>
            </span>
            <span v-if="!isCollapsed">
                <slot></slot>
            </span>
        </EtButton>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { UI_TYPES, UI_SIZING } from "../../helpers/enums";
import EtButton from "../etButton/EtButton.vue";

export default defineComponent({
    props: {
        isActive: {
            type: Boolean,
            required: false,
            default: false
        },
        isCollapsed: {
            type: Boolean,
            required: false,
            default: false
        },
        disabled: {
            required: false,
            type: [Boolean, Function],
            default: false
        },
        readonly: { required: false, type: Boolean, default: false },
        type: {
            required: false,
            type: String as PropType<UI_TYPES>,
            default: UI_TYPES.DEFAULT
        }
    },
    components: {
        EtButton
    },
    data() {
        return {
            UI_SIZING
        };
    },
    computed: {
        internalDisabled() {
            if (typeof this.disabled === "boolean") {
                return this.disabled;
            }
            return this.disabled?.();
        }
    },
    methods: {
        onClick(event: Event) {
            if (this.internalDisabled || this.readonly) {
                event.preventDefault();
                return;
            }

            this.$emit("click", event);
        },
        focus() {
            (this.$refs.etButton as any).focus();
        },
        blur() {
            (this.$refs.etButton as any).blur();
        }
    },
    expose: ["focus", "blur"],
    emits: {
        click: (event: Event) => !!event,
        focus: () => true,
        blur: () => true
    }
});
</script>

<style>
.et-sdk-sidebar-button-wrapper {
    max-width: 100%;
    width: 100%;
    padding-top: 4px;
    padding-bottom: 4px;
}

.et-sdk-sidebar-button-wrapper__menu-open {
    padding-left: 16px;
    padding-right: 16px;
}

.et-sdk-sidebar-button-wrapper__menu-collapsed {
    padding-left: 8px;
    padding-right: 8px;
    text-align: center;
}

.et-sdk-sidebar-button__menu-open {
    width: 100%;
}
</style>
