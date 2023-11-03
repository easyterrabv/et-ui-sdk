<template>
    <section class="et-sdk-side-bar-section group/section">
        <EtLabel class="et-sdk-side-bar-section--label-wrapper">
            <span
                class="et-sdk-side-bar-section--label-wrapper--label"
                v-if="!isCollapsed"
                ><slot name="label"></slot
            ></span>
            <span
                class="et-sdk-side-bar-section--label-wrapper--action"
                :class="{
                    'et-sdk-side-bar-section--label-wrapper--action__side-bar-collapsed':
                        isCollapsed
                }"
            >
                <slot name="action"></slot>
            </span>
        </EtLabel>
        <slot></slot>
        <div class="et-sdk-side-bar-section-bottom-line"></div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EtLabel from "../etText/EtLabel.vue";

export default defineComponent({
    components: {
        EtLabel
    },
    props: {
        isCollapsed: {
            type: Boolean,
            required: false,
            default: false
        }
    }
});
</script>

<style>
.et-sdk-side-bar-section--label-wrapper {
    padding-bottom: 4px;
    display: flex;
    flex-direction: row;
}

.et-sdk-side-bar-section--label-wrapper--label {
    flex-grow: 1;
    padding-left: 32px;
    padding-right: 32px;
    font-size: var(--et-sdk-font-size-normal);
    line-height: 20px;
    font-weight: var(--et-sdk-font-weight-semibold);
}

.et-sdk-side-bar-section--label-wrapper--action {
    cursor: pointer;
    margin-left: 8px;
    margin-right: 24px;

    padding-left: 4px;
    padding-right: 4px;

    border-radius: 999999px;

    text-align: center;

    background-color: var(--et-sdk-dark-100);
}

.et-sdk-side-bar-section--label-wrapper--action:hover {
    background-color: var(--et-sdk-light-0);
    color: var(--et-sdk-blue-600);
}

.et-sdk-side-bar-section--label-wrapper--action__side-bar-collapsed {
    margin-right: 8px;
    flex-grow: 1;
}

.et-sdk-side-bar-section-bottom-line {
    border-bottom: 1px solid var(--et-sdk-dark-200);
    margin: 24px;
}

.et-sdk-side-bar-section:last-child .et-sdk-side-bar-section-bottom-line {
    display: none;
}
</style>
