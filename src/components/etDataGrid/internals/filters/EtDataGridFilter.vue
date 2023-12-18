<template>
    <div class="et-sdk-data-grid-filter">
        <div
            class="et-sdk-data-grid-filter__label"
            v-show="![FilterInputType.CHECKBOX].includes(filterType)"
        >
            {{ filterDefinition.label }}
        </div>

        <div class="et-sdk-data-grid-filter__input">
            <EtDataGridFilter
                :filterDefinition="filterDefinition"
                @keyup.enter="emitEnter"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { FilterDefinition } from "../../interfaces/DataGridFilters";

import EtDataGridFilter from "./EtDataGridFilterInput.vue";
import { wait } from "../../../../helpers/async";
import { FilterInputType } from "../../interfaces/DataGridFilters";
import { computed } from "vue";

const props = defineProps({
    filterDefinition: {
        type: Object as PropType<FilterDefinition>,
        required: true
    }
});

const filterType = computed(
    () => props.filterDefinition.type ?? FilterInputType.INPUT
);

const emit = defineEmits<{
    (e: "onEnter"): void;
}>();

async function emitEnter() {
    // Little delay, otherwise this might trigger before a new value is set in the actual filter
    await wait(50);
    emit("onEnter");
}
</script>

<style>
.et-sdk-data-grid-filter {
    display: flex;
    flex-direction: row;
    gap: 15px;
}

.et-sdk-data-grid-filter__label {
    width: 150px;
    line-height: 32px;
    font-weight: var(--et-sdk-font-weight-normal);
    font-size: var(--et-sdk-font-size-normal-s);
    color: var(--et-sdk-dark-500);
}

.et-sdk-data-grid-filter__input {
    flex-grow: 1;
    /* Keep width fixed by subtracting (label width + gap) */
    max-width: calc(100% - 165px);
}
</style>
