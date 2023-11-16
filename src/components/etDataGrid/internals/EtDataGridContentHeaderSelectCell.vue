<template>
    <div
        class="et-sdk-data-grid--checkbox-cell et-sdk-data-grid--cell"
        @click.stop="() => checkedRows?.toggleAll()"
    >
        <div class="et-sdk-data-grid--checkbox-cell--checkbox">
            <EtCheckbox
                @click.stop="() => checkedRows?.toggleAll()"
                :checked="checkedRows?.allSelected()"
                :indeterminate="checkedRows?.someSelected()"
                readonly
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import EtCheckbox from "../../etForm/EtCheckbox.vue";
import { inject } from "vue";
import type { CheckedProvide } from "../interfaces/DataGridMethods";
const checkedRows = inject<CheckedProvide>("checkedRows");
</script>
