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

<script setup lang="ts">
import { computed, ref } from "vue";
import { UI_TYPES, UI_SIZING } from "../../helpers/enums";
import EtButton from "../etButton/EtButton.vue";

interface Props {
    isActive?: boolean;
    isCollapsed?: boolean;
    disabled?: boolean | (() => boolean);
    readonly?: boolean;
    type?: string;
}

const props = withDefaults(defineProps<Props>(), {
    isActive: false,
    isCollapsed: false,
    disabled: false,
    readonly: false,
    type: UI_TYPES.DEFAULT
});

const emit = defineEmits<{
    (e: "click", event: Event): void;
    (e: "focus"): void;
    (e: "blur"): void;
}>();

const etButton = ref<InstanceType<typeof EtButton> | null>(null);

const internalDisabled = computed(() => {
    if (typeof props.disabled === "boolean") {
        return props.disabled;
    }
    return props.disabled?.();
});

const onClick = (event: Event) => {
    if (internalDisabled.value || props.readonly) {
        event.preventDefault();
        return;
    }
    emit("click", event);
};

const focus = () => {
    etButton.value?.focus();
};

const blur = () => {
    etButton.value?.blur();
};

// Expose methods to parent components
defineExpose({ focus, blur });
</script>

<style>
.et-sdk-sidebar-button-wrapper {
    max-width: 100%;
    width: 100%;
    padding-top: 4px;
    padding-bottom: 4px;
}

.et-sdk-sidebar-button-wrapper__menu-open {
    padding-left: 32px;
    padding-right: 32px;
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
