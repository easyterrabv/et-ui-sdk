<template>
    <EtModal class="sdk-modal-date-time-picker">
        <template #header> Pick date & time </template>

        <div class="sdk-modal-date-time-picker__input-wrapper">
            <EtDatePicker
                :model-value="date"
                @update:model-value="setDateFromDatePicker"
                class="sdk-modal-date-time-picker__input-wrapper__datepicker"
            />
            <EtTimePicker
                :model-value="time"
                ref="timePickerRef"
                @update:model-value="setTimeFromTimePicker"
                class="sdk-modal-date-time-picker__input-wrapper__timepicker"
            />
        </div>

        <EtForm
            class="sdk-modal-date-time-picker__input-form"
            @submit="handleDateSelect"
        >
            <EtFormGroup>
                <EtInput
                    ref="inputRef"
                    :model-value="asFormattedString"
                    @change="handleFormattedStringChange"
                />
            </EtFormGroup>
        </EtForm>

        <template #footer>
            <div class="sdk-modal-date-time-picker__footer_buttons">
                <EtButtonDefault @click="modalProvide?.closeModal(props.guid)"
                    >Cancel</EtButtonDefault
                >
                <EtButtonSuccess @click="handleDateSelect"
                    >Select</EtButtonSuccess
                >
            </div>
        </template>
    </EtModal>
</template>

<script setup lang="ts">
import EtModal from "./EtModal.vue";
import EtButtonDefault from "../etButton/EtButtonDefault.vue";
import EtButtonSuccess from "../etButton/EtButtonSuccess.vue";
import { computed, inject, nextTick, onMounted, type PropType, ref } from "vue";
import type { IEtModalProvide } from "../etProvider/EtModalProviderInterfaces";
import EtDatePicker from "../etDatePicker/EtDatePicker.vue";
import EtTimePicker from "../etDatePicker/EtTimePicker.vue";
import EtFormGroup from "../etForm/EtFormGroup.vue";
import EtInput from "../etForm/EtInput.vue";
import EtForm from "../etForm/EtForm.vue";
import { formatDateTime } from "../../helpers/date";
import { wait } from "../../helpers/async";

const modalProvide = inject<IEtModalProvide>("SDKModalProvide");

const props = defineProps({
    guid: {
        type: String,
        required: true
    },
    onDateSelect: {
        type: Function as PropType<(date: Date) => void>,
        required: false
    }
});

const date = ref(new Date());
const timePickerRef = ref<typeof EtTimePicker | null>(null);
const inputRef = ref<typeof EtInput | null>(null);

const time = computed(() => {
    const now = date.value;
    return [now.getHours(), now.getMinutes()] as [number, number];
});

const asFormattedString = computed(() => {
    return formatDateTime(date.value);
});

function setDateFromDatePicker(
    newDate: Date | (Date | undefined)[] | undefined
) {
    const currentYear = date.value.getFullYear();
    const currentMonth = date.value.getMonth();
    const currentDate = date.value.getDate();

    if (Array.isArray(newDate)) {
        newDate = newDate[0];
    }

    if (!newDate) {
        newDate = new Date();
    }

    if (
        newDate.getFullYear() === currentYear &&
        newDate.getMonth() === currentMonth &&
        newDate.getDate() === currentDate
    ) {
        return;
    }

    const _date = new Date(date.value);
    _date.setFullYear(newDate.getFullYear());
    _date.setMonth(newDate.getMonth());
    _date.setDate(newDate.getDate());

    date.value = _date;
}

function setTimeFromTimePicker(newTime: [number, number]) {
    const currentHours = date.value.getHours();
    const currentMinutes = date.value.getMinutes();

    if (newTime[0] === currentHours && newTime[1] === currentMinutes) {
        return;
    }

    const _date = new Date(date.value);
    _date.setHours(newTime[0]);
    _date.setMinutes(newTime[1]);

    date.value = _date;
}

async function handleFormattedStringChange(value: string | number | null) {
    if (!value) {
        return;
    }

    const newDate = new Date(value);

    const currentYear = date.value.getFullYear();
    const currentMonth = date.value.getMonth();
    const currentDate = date.value.getDate();
    const currentHours = date.value.getHours();
    const currentMinutes = date.value.getMinutes();

    if (
        newDate.getFullYear() === currentYear &&
        newDate.getMonth() === currentMonth &&
        newDate.getDate() === currentDate &&
        newDate.getHours() === currentHours &&
        newDate.getMinutes() === currentMinutes
    ) {
        return;
    }

    const _date = new Date(date.value);
    _date.setFullYear(newDate.getFullYear());
    _date.setMonth(newDate.getMonth());
    _date.setDate(newDate.getDate());
    _date.setHours(newDate.getHours());
    _date.setMinutes(newDate.getMinutes());

    date.value = _date;

    await nextTick();

    timePickerRef.value?.fixScrollPositions();
}

onMounted(() => {
    inputRef.value?.focus?.();
});

async function handleDateSelect() {
    await wait(50);
    props.onDateSelect?.(date.value);
    modalProvide?.closeModal(props.guid);
}
</script>

<style>
.sdk-modal-date-time-picker__input-wrapper {
    display: flex;
    gap: 15px;
}

.sdk-modal-date-time-picker__input-form {
    margin-top: 15px;
}

.sdk-modal-date-time-picker__footer_buttons {
    display: flex;
    gap: 15px;

    flex-grow: 1;

    .et-sdk-button {
        flex-grow: 1;
    }
}

.sdk-modal-date-time-picker__input-wrapper__datepicker,
.sdk-modal-date-time-picker__input-wrapper__timepicker {
    border: 0;
}
</style>
