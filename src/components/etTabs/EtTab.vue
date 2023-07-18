<template>
    <div
        class="mx-2 pb-1.5 cursor-pointer text-sm text-default first:ml-0 last:mr-0"
        :class="{
            'border-b-2 border-b-primary': isActive
        }"
        @mouseup.left.stop="(e) => clickDebounce.debounce(e)"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Debounce } from "../../helpers/debounce";

export default defineComponent({
    props: {
        isActive: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            clickDebounce: new Debounce(this.onClick, 100)
        };
    },
    methods: {
        onClick(event: Event) {
            this.$emit("click", event);
        }
    },
    emits: {
        click: (event: Event) => !!event
    }
});
</script>
