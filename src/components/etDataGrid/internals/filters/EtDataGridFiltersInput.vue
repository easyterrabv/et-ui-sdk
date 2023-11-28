<template>
    <div class="et-sdk-data-grid__filter-wrapper" v-if="hasFilterDefinitions">
        <div
            class="et-sdk-data-grid__filter-input et-sdk-input-like"
            ref="toggle"
            @click="toggleInput"
        >
            <div class="et-sdk-data-grid__filter-icon">
                <EtIconSearch />
            </div>
            <div class="et-sdk-data-grid__filter-content hide-scrollbar">
                <span
                    v-for="filterValue in filterValuesList"
                    class="et-sdk-data-grid__filter-content__filter-value"
                >
                    <span
                        class="et-sdk-data-grid__filter-content__filter-value__label"
                        >{{ filterValue.label }}</span
                    >
                    {{ filterValue.value }}
                </span>
            </div>
            <div
                class="et-sdk-data-grid__filter-icon et-sdk-data-grid__filter-icon--clear"
                @click.stop="() => filters?.clearFilters()"
            >
                <EtIconTimes />
            </div>
        </div>

        <Teleport to="body">
            <div
                ref="content"
                class="et-sdk-data-grid__filters-wrapper"
                v-show="isVisible"
                @click.stop=""
            >
                <div class="et-sdk-data-grid__filters-container">
                    <EtDataGridFilter
                        v-for="filterDefinition in filterDefinitions"
                        :filterDefinition="filterDefinition"
                    />
                </div>
                <div class="et-sdk-data-grid__filters-functionality">
                    <EtButtonPrimary
                        class="et-sdk-data-grid__filters-search-button"
                        @click="() => applyFilters()"
                        >Search</EtButtonPrimary
                    >
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script lang="ts" setup>
import EtIconSearch from "../../../etIcon/EtIconSearch.vue";
import EtIconTimes from "../../../etIcon/EtIconTimes.vue";

import {
    inject,
    computed,
    ref,
    onMounted,
    reactive,
    onBeforeUnmount,
    provide
} from "vue";
import type {
    FiltersProvide,
    FiltersStagingProvide
} from "../../interfaces/DataGridMethods";
import type { Instance } from "@popperjs/core/lib/types";
import { createPopper } from "@popperjs/core";
import type { IEtOverlayProvide } from "../../../etProvider/EtOverlayProviderInterfaces";
import { EtOverlayEvent } from "../../../etProvider/EtOverlayProviderInterfaces";

import EtButtonPrimary from "../../../etButton/EtButtonPrimary.vue";
import EtDataGridFilter from "./EtDataGridFilter.vue";

const filters = inject<FiltersProvide>("filters");
const sdkOverlay = inject<IEtOverlayProvide>("SDKOverlayProvide");

const filterDefinitions = computed(() => filters?.getFiltersDefinitions());
const hasFilterDefinitions = computed(() => !!filterDefinitions.value);
const filterValuesList = computed(() => {
    const filterValuesObject = filters?.filtersValues || {};

    return Object.entries(filterValuesObject)
        .filter(([key, value]) => !!value)
        .map(([key, value]) => ({
            field: key,
            value,
            label: (filterDefinitions?.value || []).find(
                (definition) => definition.field == key
            )?.label
        }));
});

const filterValueStaging = reactive<FiltersStagingProvide>({
    filtersValues: {},
    setFilter(field, value) {
        console.log(field, value);
        this.filtersValues[field] = value;
    },
    getFilter(field) {
        return this.filtersValues[field] || null;
    }
});
provide<FiltersStagingProvide>("filterValueStaging", filterValueStaging);

const toggle = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const isVisible = ref(false);
let popperInstance: Instance;

async function toggleInput() {
    if (isVisible.value) {
        await hideToolTip();
    } else {
        await showToolTip();
    }
}

async function showToolTip() {
    filterValueStaging.filtersValues = JSON.parse(
        JSON.stringify(filters?.filtersValues || {})
    );
    isVisible.value = true;
    sdkOverlay?.setTransparency(true);
    sdkOverlay?.setVisibility(true);
    await popperInstance?.update();
}

async function hideToolTip() {
    isVisible.value = false;
    sdkOverlay?.setVisibility(false);
}

async function applyFilters() {
    filters?.setFilters(
        JSON.parse(JSON.stringify(filterValueStaging.filtersValues || {}))
    );
    await hideToolTip();
}

onMounted(() => {
    popperInstance = reactive(
        createPopper(
            toggle.value as HTMLElement,
            content.value as HTMLElement,
            {
                placement: "bottom-start",
                modifiers: [
                    {
                        name: "offset",
                        options: {
                            offset: [0, 6]
                        }
                    }
                ]
            }
        )
    );

    sdkOverlay?.addEvent(EtOverlayEvent.onClick, hideToolTip);
});

onBeforeUnmount(() => {
    sdkOverlay?.removeEvent(EtOverlayEvent.onClick, hideToolTip);
});
</script>

<style>
:root {
    --data-grid-filter-input-width: 750px;
}

.et-sdk-data-grid__filter-wrapper {
    width: var(--data-grid-filter-input-width);
}

.et-sdk-data-grid__filter-input {
    margin-top: 4px;
    line-height: 52px;
    box-shadow: none;
    background-color: var(--et-sdk-blue-50);

    display: flex;
    flex-direction: row;
    padding: 0;
}

.et-sdk-data-grid__filter-content {
    flex-grow: 1;
    overflow-x: auto;
    white-space: nowrap;
}

.et-sdk-data-grid__filter-icon {
    width: 52px;
    text-align: center;
    color: var(--et-sdk-dark-500);
}

.et-sdk-data-grid__filter-icon--clear {
    cursor: pointer;
}

.et-sdk-data-grid__filters-wrapper {
    z-index: 30;
    width: calc(var(--data-grid-filter-input-width) * 0.8);

    border-radius: 8px;
    background-color: var(--et-sdk-light-0);
    box-shadow: var(--et-sdk-shadow-large);

    padding: 30px;
}

.et-sdk-data-grid__filters-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.et-sdk-data-grid__filters-search-button {
    width: fit-content;
    padding-left: 30px;
    padding-right: 30px;
}

.et-sdk-data-grid__filters-functionality {
    margin-top: 15px;
    float: right;
}

.et-sdk-data-grid__filter-content__filter-value {
    background-color: var(--et-sdk-light-0);
    padding: 5px 15px;
    border: 1px solid var(--et-sdk-dark-300);
    border-radius: 999px;
    margin-right: 5px;
    font-weight: var(--et-sdk-font-weight-semibold);
}

.et-sdk-data-grid__filter-content__filter-value__label {
    color: var(--et-sdk-dark-500);
    font-weight: var(--et-sdk-font-weight-normal);
    font-size: var(--et-sdk-font-size-normal-s);
}
</style>