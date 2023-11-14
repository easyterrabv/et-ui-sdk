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
import EtCheckbox from "src/components/etForm/EtCheckbox.vue";
import { type PropType, inject } from "vue";
import { type CheckedProvide } from "../interfaces/DataGridMethods";

const props = defineProps({
    row: {
        type: Object as PropType<{ [key: string]: unknown }>,
        required: true
    }
});

const checkedRows =
    inject<CheckedProvide<{ [key: string]: unknown }>>("checkedRows");
</script>
