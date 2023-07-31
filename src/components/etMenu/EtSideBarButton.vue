<template>
    <div
        class="et-sidebar-button max-w-full w-full py-1"
        :class="[
            {
                'px-4': !isCollapsed,
                'px-2 text-center': isCollapsed
            }
        ]"
    >
        <EtButton
            :type="type"
            :size="UI_SIZING.S"
            :class="{
                'w-full': !isCollapsed
            }"
            :active="isActive"
            :disabled="disabled"
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
import { UI_TYPES, UI_SIZING } from "../../enums";
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
    }
});
</script>
