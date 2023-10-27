<template>
    <div
        class="et-button-group content-stretch flex [&>*]:!rounded-none [&>.et-button-default:hover]:z-10 [&>*:focus]:z-10 [&>.et-sdk-popover_.et-button]:!rounded-none"
        :class="{
            'flex-col [&>*:first-child]:!rounded-t-md [&>*:last-child]:!rounded-b-md [&>.et-button-group>*]:!rounded-none [&>.et-button-group:last-child>*:first-child]:!rounded-bl-md [&>.et-button-group:last-child>*:last-child]:!rounded-br-md [&>.et-button-group:first-child>*:first-child]:!rounded-tl-md [&>.et-button-group:first-child>*:last-child]:!rounded-tr-md':
                isVertical,
            'flex-row [&>*]:flex-grow [&>*:first-child]:!rounded-l-md [&>*:last-child]:!rounded-r-md [&>.et-sdk-popover:first-child_.et-button]:!rounded-l-md [&>.et-sdk-popover:last-child_.et-button]:!rounded-r-md':
                !isVertical
        }"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        isVertical: {
            type: Boolean,
            required: false,
            default: false
        }
    }
});
</script>
