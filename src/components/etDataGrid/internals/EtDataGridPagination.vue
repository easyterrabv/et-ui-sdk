<template>
    <div
        v-if="pagination && pagination.totalRows > 0"
        class="et-sdk-data-grid-pagination"
    >
        {{ start }} - {{ end }} of {{ pagination.totalRows }}
        <span
            class="et-sdk-data-grid-pagination--button"
            :class="{
                'et-sdk-data-grid-pagination--button__disabled': !hasPrevious
            }"
            @click="() => previousPage()"
        >
            <EtIconChevronLeft />
        </span>
        <span
            class="et-sdk-data-grid-pagination--button"
            :class="{
                'et-sdk-data-grid-pagination--button__disabled': !hasNext
            }"
            @click="() => nextPage()"
        >
            <EtIconChevronRight />
        </span>
    </div>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import type { PaginationProvide } from "../interfaces/DataGridMethods";

import EtIconChevronLeft from "src/components/etIcon/EtIconChevronLeft.vue";
import EtIconChevronRight from "src/components/etIcon/EtIconChevronRight.vue";

const pagination = inject<PaginationProvide>("pagination");
const defaultPerPage = 50;

const start = computed(
    () =>
        ((pagination?.page || 1) - 1) *
            (pagination?.perPage || defaultPerPage) +
        1
);
const end = computed(() => {
    let count = start.value + (pagination?.perPage || defaultPerPage) - 1;
    if (count > (pagination?.totalRows || 0)) {
        count = pagination?.totalRows || 0;
    }
    return count;
});

const hasPrevious = computed(() => {
    if (!pagination) {
        return false;
    }

    return pagination?.page > 1;
});
const hasNext = computed(() => {
    const perPage = pagination?.perPage || 50;
    const totalRows = pagination?.totalRows || 0;

    if (totalRows === 0) {
        return false;
    }

    const totalPages = totalRows / perPage;
    const currentPage = pagination?.page || 1;
    return currentPage < totalPages;
});

function previousPage() {
    if (!hasPrevious || !pagination) {
        return;
    }
    pagination.page--;
}

function nextPage() {
    if (!hasNext || !pagination) {
        return;
    }
    pagination.page++;
}
</script>

<style>
.et-sdk-data-grid-pagination {
    color: var(--et-sdk-dark-400);
    font-weight: var(--et-sdk-font-weight-semibold);
    font-size: var(--et-sdk-font-size-small);
}

.et-sdk-data-grid-pagination--button {
    padding: 8px;
    margin-left: 2px;
    margin-right: 2px;

    border-radius: 9999px;
    cursor: pointer;
}

.et-sdk-data-grid-pagination--button:not(
        .et-sdk-data-grid-pagination--button__disabled
    ):hover {
    background-color: var(--et-sdk-dark-100);
}

.et-sdk-data-grid-pagination--button:last-child {
    margin-right: 0;
}

.et-sdk-data-grid-pagination--button__disabled {
    cursor: not-allowed;
    color: var(--et-sdk-dark-300);
}
</style>
