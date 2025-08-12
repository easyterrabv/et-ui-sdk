<template>
    <EtTooltip>
        <span
            class="et-sdk-data-grid-icon-button"
            v-if="checkedRows && isVisible"
            @click="() => handleBulkMethod(bulkMethod)"
        >
            <component
                v-bind="bulkMethodProps"
                :is="bulkMethod.component || EtIconSquare"
            />
        </span>
        <template #tooltip v-if="title">
            {{ title }}
        </template>
    </EtTooltip>
</template>

<script setup lang="ts">
import EtIconSquare from "../../etIcon/EtIconSquare.vue";
import EtTooltip from "../../EtToolTip.vue";
import { computed, inject, type PropType } from "vue";
import type { BulkMethod, CheckedProvide } from "../interfaces/DataGridMethods";

const props = defineProps({
    bulkMethod: {
        type: Object as PropType<BulkMethod>,
        required: true
    }
});

const checkedRows = inject<CheckedProvide>("checkedRows");
const hasAnyChecked = computed(() => checkedRows && checkedRows.anySelected());

const isVisible = computed(() => {
    if (!checkedRows) {
        return false;
    }

    if (typeof props.bulkMethod.isVisible === "boolean") {
        return props.bulkMethod.isVisible;
    }

    if (props.bulkMethod.isVisible === undefined) {
        return true;
    }

    return props.bulkMethod.isVisible(checkedRows?.rows);
});

const title = computed(() => {
    if (!props.bulkMethod.title) {
        return "";
    }

    if (typeof props.bulkMethod.title === "string") {
        return props.bulkMethod.title;
    }

    if (!checkedRows) {
        return "";
    }

    return props.bulkMethod.title(checkedRows.rows);
});

const bulkMethodProps = computed(() => {
    const bProps = props.bulkMethod.meta ? props.bulkMethod.meta : {};

    if (checkedRows && props.bulkMethod.rowsAsProp) {
        bProps.rows = checkedRows.rows;
    }

    return bProps;
});

async function handleBulkMethod(bulkMethod: BulkMethod) {
    if (!bulkMethod) {
        return;
    }

    if (!hasAnyChecked.value) {
        return;
    }

    const method = bulkMethod.method;
    if (!method) {
        return;
    }

    const rows = checkedRows?.rows || [];
    if (!rows || rows.length <= 0) {
        return;
    }

    await method(rows);
}
</script>
