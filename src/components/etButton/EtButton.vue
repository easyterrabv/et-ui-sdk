<template>
    <button
        ref="elButton"
        class="et-button border-2 rounded drop-shadow-sm whitespace-nowrap inline-block cursor-default"
        :class="computedClasses"
        @mouseup.left.stop="(e) => clickDebounce.debounce(e)"
        @keyup.enter="(e) => clickDebounce.debounce(e)"
        @focus="emit('focus')"
        @blur="emit('blur')"
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import {
    defineProps,
    withDefaults,
    defineEmits,
    defineExpose,
    ref,
    computed
} from "vue-demi";
import { UI_SIZING, UI_TYPES } from "../../enums";
import { Debounce } from "../../helpers/debounce";
import {
    sizeToClass, typeToButtonActiveClass,
    typeToButtonClass,
    typeToButtonDisabledClass,
    typeToButtonHoverClass
} from "../../helpers/typeToClass";

export interface Props {
    disabled?: Boolean;
    readonly?: Boolean;
    active?: Boolean;
    size?: UI_SIZING;
    type?: UI_TYPES;
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    readonly: false,
    active: false,
    size: UI_SIZING.M,
    type: UI_TYPES.DEFAULT
});

const onClick = (event: Event) => {
    if (props.disabled || props.readonly) {
        event.preventDefault();
        return;
    }

    emit("click", event);
};
const focus = () => elButton?.value?.focus();
const blur = () => elButton?.value?.blur();

const clickDebounce = new Debounce(onClick, 100);
const elButton = ref<HTMLButtonElement | null>(null);

const computedClasses = computed<String>(() => {
    return [
        typeToButtonClass(props.type),
        sizeToClass(props.size),
        !props.disabled && !props.readonly ? typeToButtonHoverClass(props.type) : "",
        !props.disabled && props.active ? typeToButtonActiveClass(props.type) : "",
        props.disabled ? typeToButtonDisabledClass(props.type) : "",
    ].join(" ");
});

const emit = defineEmits<{
    (e: "click", event: Event): void;
    (e: "focus"): void;
    (e: "blur"): void;
}>();

defineExpose({
    focus,
    blur
});
</script>
