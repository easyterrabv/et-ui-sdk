<template>
    <div
        class="et-sdk-data-grid--checkbox-cell et-sdk-data-grid--cell"
        @click.stop="() => checkedRows?.toggle(props.row)"
    >
        <div class="et-sdk-data-grid--checkbox-cell--checkbox">
            <EtCheckbox
                @click.stop="() => checkedRows?.toggle(props.row)"
                :checked="checkedRows?.isSelected(props.row)"
                readonly
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import EtCheckbox from "../../etForm/EtCheckbox.vue";
import { type PropType, inject } from "vue";
import type { CheckedProvide, RowObject } from "../interfaces/DataGridMethods";

const props = defineProps({
    row: {
        type: Object as PropType<RowObject>,
        required: true
    }
});

const checkedRows = inject<CheckedProvide>("checkedRows");
</script>
