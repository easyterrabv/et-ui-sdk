<template>
    <button
        ref="elButton"
        class="et-button border-2 rounded drop-shadow-sm whitespace-nowrap inline-block cursor-default"
        :class="computedClasses"
        @mouseup.left.stop="(e) => clickDebounce.debounce(e)"
        @keyup.enter="(e) => clickDebounce.debounce(e)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
    >
        <slot></slot>
    </button>
</template>

<script lang="ts">
import {
    defineComponent,
    PropType
} from "vue-demi";
import { UI_SIZING, UI_TYPES } from "../../enums";
import { Debounce } from "../../helpers/debounce";
import {
    sizeToClass,
    typeToButtonActiveClass,
    typeToButtonClass,
    typeToButtonDisabledClass,
    typeToButtonHoverClass
} from "../../helpers/typeToClass";

export default defineComponent({
    props: {
        disabled: {required: false, type: Boolean, default: false},
        readonly: {required: false, type: Boolean, default: false},
        active: {required: false, type: Boolean, default: false},
        size: {required: false, type: String as PropType<UI_SIZING>, default: UI_SIZING.M },
        type: {required: false, type: String as PropType<UI_TYPES>, default: UI_TYPES.DEFAULT },
    },
    data() {
        return {
            clickDebounce: new Debounce(this.onClick, 100),
        }
    },
    computed: {
        computedClasses() {
            const classes: Array<String> = [
                typeToButtonClass(this.type),
                sizeToClass(this.size)
            ];

            if(!this.disabled && !this.readonly){
                classes.push(typeToButtonHoverClass(this.type));
            }

            if(!this.disabled && this.active) {
                classes.push(typeToButtonActiveClass(this.type));
            }

            if(this.disabled) {
                classes.push(typeToButtonDisabledClass(this.type));
            }

            return classes.join(" ");
        }
    },
    methods: {
        onClick(event: Event) {
            if (this.disabled || this.readonly) {
                event.preventDefault();
                return;
            }

            this.$emit("click", event);
        },
        focus() {
            this.$refs.elButton.focus();
        },
        blur() {
            this.$refs.elButton.blur();
        }
    },
    expose: ['focus', 'blur'],
    emits: {
        click: ( event: Event) => true,
        focus: () => true,
        blur: () => true,
    }
});
</script>
