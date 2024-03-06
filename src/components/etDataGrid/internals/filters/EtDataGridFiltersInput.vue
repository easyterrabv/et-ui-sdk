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
                <EtDataGridFiltersInputValue
                    v-for="filterDisplay in filterValuesList"
                    :filterDisplay="filterDisplay"
                />

                <span
                    class="et-sdk-data-grid__filter-content__filter-placeholder"
                    v-if="!filterValuesList || filterValuesList.length <= 0"
                >
                    No filters applied
                </span>
            </div>
            <div
                class="et-sdk-data-grid__filter-icon et-sdk-data-grid__filter-icon--clear"
                v-if="filterValuesList?.length > 0"
                @click.stop="clearFilters"
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
                @keyup.esc="hideToolTip"
            >
                <div class="et-sdk-data-grid__filters-container">
                    <EtDataGridFilter
                        v-for="filterDefinition in filterDefinitions"
                        :filterDefinition="filterDefinition"
                        @on-enter="() => applyFilters()"
                    />
                </div>
                <div class="et-sdk-data-grid__filters-functionality">
                    <EtButtonDefault
                        v-if="!!onFilterSave"
                        class="et-sdk-data-grid__filters-search-button"
                        @click="() => saveFilters()"
                    >
                        Save search filter
                    </EtButtonDefault>
                    <EtButtonPrimary
                        class="et-sdk-data-grid__filters-search-button"
                        @click="() => applyFilters()"
                    >
                        Search
                    </EtButtonPrimary>
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
    provide,
    type Ref,
    type PropType,
    markRaw
} from "vue";
import type {
    FilterDefinition,
    FilterDisplay,
    FilterObject,
    FiltersProvide,
    FiltersStagingProvide
} from "../../interfaces/DataGridFilters";
import type { Instance } from "@popperjs/core/lib/types";
import { createPopper } from "@popperjs/core";
import {
    EtOverlayEvent,
    type IEtOverlayProvide
} from "../../../etProvider/EtOverlayProviderInterfaces";

import EtButtonPrimary from "../../../etButton/EtButtonPrimary.vue";
import EtButtonDefault from "../../../etButton/EtButtonDefault.vue";
import EtDataGridFilter from "./EtDataGridFilter.vue";
import EtDataGridFiltersInputValue from "./EtDataGridFiltersInputValue.vue";
import EtDataGridFilterSaveModal from "./EtDataGridFilterSaveModal.vue";
import type { IEtModalProvide } from "../../../etProvider/EtModalProviderInterfaces";

const filters = inject<FiltersProvide>("filters");
const sdkOverlay = inject<IEtOverlayProvide>("SDKOverlayProvide");
const modalProvide = inject<IEtModalProvide>("SDKModalProvide");

if (modalProvide) {
    modalProvide.registerModal(
        "SDKDataGridPickSavedName",
        markRaw(EtDataGridFilterSaveModal)
    );
}

const props = defineProps({
    onFilterSave: {
        type: Function as PropType<
            (label: string, filtersObj: FilterObject) => void | null
        >,
        default: null
    }
});

const filterDefinitions = computed(() => filters?.getFiltersDefinitions());
const hasFilterDefinitions = computed(() => !!filters?.hasFilters());
const filterValuesList = computed(() => {
    const filterValuesObject = filters?.filtersValues || {};

    return Object.entries(filterValuesObject)
        .filter(([key, value]) => !!value)
        .map(([key, value]) => ({
            field: key,
            value,
            definition: (filterDefinitions?.value || []).find(
                (definition) => definition.field == key
            )
        })) as FilterDisplay[];
});

const filterValueStaging = reactive<FiltersStagingProvide>({
    filtersValues: {},
    setFilter(field, value) {
        this.filtersValues[field] = value;
    },
    getFilter(field) {
        return this.filtersValues[field] ?? null;
    }
});
provide<FiltersStagingProvide>("filterValueStaging", filterValueStaging);

const toggle = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const isVisible = ref(false);
provide<Ref<boolean>>("dropDownVisible", isVisible);
let popperInstance: Instance;

const emit = defineEmits<{
    (e: "filtersCleared"): void;
}>();

function saveFilters() {
    if (!props.onFilterSave || !filterValueStaging) {
        return;
    }

    if (modalProvide) {
        modalProvide.openModal("SDKDataGridPickSavedName", {
            callback(label: string) {
                if (label) {
                    props.onFilterSave(label, filterValueStaging.filtersValues);
                }
            }
        });
    } else {
        const label = prompt("Label");

        if (label) {
            props.onFilterSave(label, filterValueStaging.filtersValues);
        }
    }
}

function clearFilters() {
    if (!filters) {
        return;
    }

    filters.clearFilters();
    emit("filtersCleared");
}

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

    const firstInput = content.value?.querySelector("input");
    if (firstInput) {
        firstInput.focus();
    }
}

async function hideToolTip() {
    isVisible.value = false;
    sdkOverlay?.setVisibility(false);
}

async function applyFilters() {
    const validFilters = Object.entries(
        filterValueStaging.filtersValues || {}
    ).reduce((prev, [key, value]) => {
        const definition: FilterDefinition | undefined =
            filterDefinitions.value?.find((def) => def.field === key);
        if (!definition) {
            return prev;
        }

        const validator = definition.validator;

        if (value === null || value === undefined) {
            return prev;
        }

        if (typeof value === "string") {
            value = value.trim();
            if (!value) {
                return prev;
            }
        }

        // no validator = assume valid;
        if (!validator) {
            prev[key] = value;
            return prev;
        }

        if (validator(value)) {
            prev[key] = value;
            return prev;
        }

        return prev;
    }, {} as FilterObject);

    filters?.setFilters(JSON.parse(JSON.stringify(validFilters)));
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

    display: flex;
    flex-direction: row;
    padding: 0;

    background: var(--et-sdk-light-0);
    box-shadow: var(--et-sdk-shadow-light);
    border-radius: 8px;
}

.et-sdk-data-grid__filter-content {
    flex-grow: 1;
    overflow-x: auto;
    white-space: nowrap;
}

.et-sdk-data-grid__filter-icon {
    width: 52px;
    font-size: 16px;
    text-align: center;
    color: var(--et-sdk-dark-500);
}

.et-sdk-data-grid__filter-icon--clear {
    cursor: pointer;
}

.et-sdk-data-grid__filters-wrapper {
    z-index: 30;
    width: var(--data-grid-filter-input-width);

    border-radius: 8px;
    background-color: var(--et-sdk-light-0);
    box-shadow: var(--et-sdk-shadow-large);
}

.et-sdk-data-grid__filters-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 15px 30px;
}

.et-sdk-data-grid__filters-search-button {
    width: fit-content;
    padding-left: 30px;
    padding-right: 30px;
}

.et-sdk-data-grid__filters-functionality {
    padding: 20px 30px;
    margin-top: 15px;
    background-color: var(--et-sdk-dark-50);

    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

.et-sdk-data-grid__filters-functionality > * {
    margin-left: 8px;
    margin-right: 8px;
}

.et-sdk-data-grid__filters-functionality > *:first-child {
    margin-left: 0;
}

.et-sdk-data-grid__filters-functionality > *:last-child {
    margin-right: 0;
}

.et-sdk-data-grid__filter-content__filter-placeholder {
    color: var(--et-sdk-dark-400);
}
</style>
