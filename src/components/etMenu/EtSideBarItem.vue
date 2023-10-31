<template>
    <div
        class="et-sdk-sidebar-item"
        :class="{
            'et-sdk-sidebar-item__active': isActive,
            'et-sdk-sidebar-item__sidebar-open': !isCollapsed,
            'et-sdk-sidebar-item__sidebar-closed': isCollapsed
        }"
    >
        <span
            v-if="$slots.icon"
            class="et-sdk-sidebar-item--icon"
            :class="{
                'et-sdk-sidebar-item__active--icon': isActive
            }"
        >
            <slot name="icon"></slot>
        </span>
        <span v-if="!isCollapsed">
            <slot></slot>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
        }
    }
});
</script>

<style>
.et-sdk-sidebar-item {
    padding-top: 4px;
    padding-bottom: 4px;
    cursor: pointer;
    font-size: var(--et-sdk-font-size-small);
    transition: all 150ms ease-in-out;
    background-color: var(--et-sdk-dark-50);
}

.et-sdk-sidebar-item__active {
    color: var(--et-sdk-light-0);
    background-color: var(--et-sdk-blue-600);
}

.et-sdk-sidebar-item:hover {
    background-color: white;
}

.et-sdk-sidebar-item__active:hover {
    background-color: var(--et-sdk-blue-700);
}

.et-sdk-sidebar-item__sidebar-open {
    margin-right: 24px;
    border-top-right-radius: 17px;
    border-bottom-right-radius: 17px;
    padding-left: 24px;
}

.et-sdk-sidebar-item__sidebar-closed {
    margin-left: 8px;
    margin-right: 8px;
    border-radius: 99999px;
    text-align: center;
}

.et-sdk-sidebar-item--icon {
    width: 12px;
    padding-left: 8px;
    padding-right: 8px;
    color: var(--et-sdk-blue-600);
}

.et-sdk-sidebar-item__active--icon {
    color: white;
}
</style>
