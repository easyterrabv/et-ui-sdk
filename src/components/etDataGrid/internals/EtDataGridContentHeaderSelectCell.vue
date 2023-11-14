<template>
    <div
        class="et-sdk-data-grid--checkbox-cell et-sdk-data-grid--cell"
        @click="() => checkedRows?.toggleAll()"
    >
        <div class="et-sdk-data-grid--checkbox-cell--checkbox">
            <EtCheckbox
                :checked="checkedRows?.allSelected()"
                :indeterminate="checkedRows?.someSelected()"
                readonly
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import EtCheckbox from "src/components/etForm/EtCheckbox.vue";
import { inject } from "vue";
import { type CheckedProvide } from "../interfaces/DataGridMethods";

const checkedRows =
    inject<CheckedProvide<{ [key: string]: unknown }>>("checkedRows");
</script>
