<template>
    <div
        class="et-sdk-modal"
        @keydown.esc="keyBoardClose"
        tabindex="-1"
        ref="modalRoot"
    >
        <span
            class="et-sdk-modal__close-button"
            @click="close"
            v-if="modalOptions.showX"
        >
            <EtIconTimes />
        </span>

        <div class="et-sdk-modal__header" v-if="$slots.header">
            <div class="et-sdk-modal__content">
                <slot name="header" />
            </div>
        </div>
        <div class="et-sdk-modal__main" v-if="$slots.default">
            <div class="et-sdk-modal__content">
                <slot />
            </div>
        </div>
        <div class="et-sdk-modal__footer" v-if="$slots.footer">
            <div class="et-sdk-modal__content">
                <slot name="footer" :close="close" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import EtIconTimes from "../etIcon/EtIconTimes.vue";
import type { IModalOptions } from "../etProvider/EtModalProviderInterfaces";
import type { PropType } from "vue";
import { modalOptionsDefaults } from "../etProvider/EtModalProviderInterfaces";
import { onMounted, ref } from "vue";

const modalRoot = ref<HTMLElement | null>(null);

const emit = defineEmits(["close"]);
const props = defineProps({
    modalOptions: {
        type: Object as PropType<IModalOptions>,
        required: false,
        default() {
            return modalOptionsDefaults;
        }
    }
});

function close() {
    emit("close");
}

function keyBoardClose() {
    if (!props.modalOptions?.keyboard) {
        return;
    }
    close();
}

function handleOnOpenFocus() {
    if (!props.modalOptions?.focus) {
        return;
    }

    modalRoot.value?.focus();
}

onMounted(() => {
    handleOnOpenFocus();
});
</script>

<style>
.et-sdk-modal {
    background-color: var(--et-sdk-light-0);
    border-radius: 14px;
    box-shadow: var(--et-sdk-shadow-light);
    max-width: 636px;
    width: 100%;

    padding-top: 10px;

    position: relative;

    &:focus {
        outline: none;
    }
}

.et-sdk-modal__close-button {
    position: absolute;
    right: 45px;
    top: 25px;

    font-size: 20px;
    line-height: 40px;
    text-align: center;

    height: 40px;
    width: 40px;
    color: var(--et-sdk-dark-700);

    &:hover {
        color: var(--et-sdk-dark-500);
        cursor: pointer;
    }
}

.et-sdk-modal__content {
    padding: 20px 45px;
}

.et-sdk-modal__header {
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;

    .et-sdk-modal__content {
        font-weight: var(--et-sdk-font-weight-bold);
        font-size: 24px;
        line-height: 36px;
        color: var(--et-sdk-dark-1000);
    }
}

.et-sdk-modal__main {
    .et-sdk-modal__content {
        padding-top: 0;
    }
}

.et-sdk-modal__footer {
    background-color: var(--et-sdk-dark-50);
    border: 1px solid var(--et-sdk-dark-100);
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;

    .et-sdk-modal__content {
        display: flex;
        flex-direction: row-reverse;
        gap: 15px;
    }
}
</style>
