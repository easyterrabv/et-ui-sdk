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
        <span v-if="!isCollapsed" class="et-sdk-sidebar-item__label">
            <slot></slot>
        </span>
        <span v-if="!isCollapsed && $slots.extra">
            <slot name="extra"></slot>
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
    padding-top: 7px;
    padding-bottom: 7px;
    cursor: pointer;
    font-size: var(--et-sdk-font-size-normal);
    line-height: 20px;
    transition: all 150ms ease-in-out;
    background-color: var(--et-sdk-dark-50);
    word-break: break-all;

    display: flex;
    flex-direction: row;
    gap: 5px;
}

.et-sdk-sidebar-item__label {
    flex-grow: 1;
}

.et-sdk-sidebar-item__active {
    color: var(--et-sdk-light-0);
    background-color: var(--et-sdk-blue-600);
}

.et-sdk-sidebar-item:hover {
    background-color: var(--et-sdk-light-0);
}

.et-sdk-sidebar-item__active:hover {
    background-color: var(--et-sdk-blue-700);
}

.et-sdk-sidebar-item__sidebar-open {
    margin-right: 20px;
    margin-left: 20px;
    border-radius: 6px;
    padding-left: 10px;
    padding-right: 10px;
}

.et-sdk-sidebar-item--icon {
    width: 22px;
    padding-right: 5px;
    color: var(--et-sdk-dark-600);
}

.et-sdk-sidebar-item__sidebar-closed {
    margin-left: 6px;
    margin-right: 6px;
    border-radius: 6px;
    text-align: center;

    display: block;

    .et-sdk-sidebar-item--icon {
        width: 12px;
        padding: 0;
        text-align: center;
    }
}

.et-sdk-sidebar-item__active--icon {
    color: var(--et-sdk-light-0);
}
</style>
