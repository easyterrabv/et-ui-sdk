<template>
    <div
        class="et-sdk-tab"
        :class="{
            'et-sdk-tab__active': isActive
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

<style>
.et-sdk-tab {
    padding: 6px 12px;

    cursor: pointer;

    font-size: var(--et-sdk-font-size-normal);
    line-height: 20px;
}

.et-sdk-tab__active {
    border-bottom: 1px solid var(--et-sdk-blue-600);
}
</style>
