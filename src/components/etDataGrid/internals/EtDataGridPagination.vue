<template>
    <div
        v-if="criteriaManager.totalRows > 0"
        class="et-sdk-data-grid-pagination"
    >
        <EtPopover class="et-sdk-data-grid-pagination__per-page-popover">
            <template #toggle>
                <span>
                    {{ start }} - {{ end }} of {{ criteriaManager.totalRows }}
                </span>
            </template>
            <EtButtonGroup
                isVertical
                class="et-sdk-data-grid-pagination__per-page-popover__options"
            >
                <EtButtonPrimary :size="UI_SIZING.XS" readonly>
                    Per Page
                </EtButtonPrimary>
                <EtButtonDefault
                    :active="criteriaManager.criteria.perPage === 50"
                    :size="UI_SIZING.XS"
                    @click="() => setPerPage(50)"
                >
                    50
                </EtButtonDefault>
                <EtButtonDefault
                    :active="criteriaManager.criteria.perPage === 100"
                    :size="UI_SIZING.XS"
                    @click="() => setPerPage(100)"
                >
                    100
                </EtButtonDefault>
                <EtButtonDefault
                    :active="criteriaManager.criteria.perPage === 250"
                    :size="UI_SIZING.XS"
                    @click="() => setPerPage(250)"
                >
                    250
                </EtButtonDefault>
                <EtButtonDefault
                    :active="criteriaManager.criteria.perPage === 500"
                    :size="UI_SIZING.XS"
                    @click="() => setPerPage(500)"
                >
                    500
                </EtButtonDefault>
                <EtButtonDefault
                    :active="criteriaManager.criteria.perPage === 1000"
                    :size="UI_SIZING.XS"
                    @click="() => setPerPage(1000)"
                >
                    1000
                </EtButtonDefault>
            </EtButtonGroup>
        </EtPopover>
        <span
            class="et-sdk-data-grid-icon-button"
            :class="{
                'et-sdk-data-grid-icon-button--disabled': !hasPrevious
            }"
            @click="() => previousPage()"
        >
            <EtIconChevronLeft />
        </span>
        <span
            class="et-sdk-data-grid-icon-button"
            :class="{
                'et-sdk-data-grid-icon-button--disabled': !hasNext
            }"
            @click="() => nextPage()"
        >
            <EtIconChevronRight />
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed, type PropType, type UnwrapNestedRefs } from "vue";

import EtIconChevronLeft from "../../etIcon/EtIconChevronLeft.vue";
import EtIconChevronRight from "../../etIcon/EtIconChevronRight.vue";

import EtPopover from "../../EtPopover.vue";
import EtButtonGroup from "../../etButton/EtButtonGroup.vue";
import EtButtonDefault from "../../etButton/EtButtonDefault.vue";
import EtButtonPrimary from "../../etButton/EtButtonPrimary.vue";
import { UI_SIZING } from "../../../helpers/enums";
import type { ICriteriaManager } from "../composables/useCriteriaManager";

const props = defineProps({
    criteriaManager: {
        type: Object as PropType<UnwrapNestedRefs<ICriteriaManager>>,
        required: true
    }
});

const defaultPerPage = 50;

const start = computed(
    () =>
        ((props.criteriaManager.criteria.page || 1) - 1) *
            (props.criteriaManager.criteria.perPage || defaultPerPage) +
        1
);
const end = computed(() => {
    let count =
        start.value +
        (props.criteriaManager.criteria.perPage || defaultPerPage) -
        1;
    if (count > (props.criteriaManager.totalRows || 0)) {
        count = props.criteriaManager.totalRows || 0;
    }
    return count;
});

const hasPrevious = computed(() => {
    return props.criteriaManager.criteria.page > 1;
});
const hasNext = computed(() => {
    const perPage = props.criteriaManager.criteria.perPage || 50;
    const totalRows = props.criteriaManager.totalRows || 0;

    if (totalRows === 0) {
        return false;
    }

    const totalPages = totalRows / perPage;
    const currentPage = props.criteriaManager.criteria.page || 1;
    return currentPage < totalPages;
});

function previousPage() {
    if (!hasPrevious) {
        return;
    }

    props.criteriaManager.criteria.page--;
}

function nextPage() {
    if (!hasNext) {
        return;
    }

    props.criteriaManager.criteria.page++;
}

function setPerPage(perPage: number) {
    props.criteriaManager.criteria.perPage = perPage;
}
</script>

<style>
.et-sdk-data-grid-pagination {
    color: var(--et-sdk-dark-400);
    font-weight: var(--et-sdk-font-weight-semibold);
    font-size: var(--et-sdk-font-size-small);
}

.et-sdk-data-grid-pagination__per-page-popover {
    display: inline-block;
}

.et-sdk-data-grid-pagination__per-page-popover__options {
    font-weight: var(--et-sdk-font-weight-normal);
}
</style>
