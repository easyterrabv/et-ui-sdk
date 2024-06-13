<template>
    <div
        class="et-sdk-toasts__container"
        :class="'toasts-container-' + location"
    >
        <TransitionGroup :name="'list-' + location">
            <EtToast
                v-for="toast in toastGroup"
                :key="toast.guid"
                :toast="toast"
            />
        </TransitionGroup>
    </div>
</template>

<script lang="ts" setup>
import type { IEtActiveToast } from "../etProvider/EtToastProviderInterfaces";
import type { PropType } from "vue";
import EtToast from "./EtToast.vue";

defineProps({
    toastGroup: {
        type: Array as PropType<IEtActiveToast[]>,
        required: true
    },
    location: {
        type: String as PropType<
            | "top-left"
            | "top-center"
            | "top-right"
            | "bottom-left"
            | "bottom-center"
            | "bottom-right"
        >,
        default: "bottom-right"
    }
});
</script>

<style>
.et-sdk-toasts__container {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 5px;

    &.toasts-container-top-left {
        top: 100px;
        left: 25px;
    }

    &.toasts-container-top-center {
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
    }

    &.toasts-container-top-right {
        top: 100px;
        right: 25px;
    }

    &.toasts-container-bottom-left {
        bottom: 25px;
        left: 25px;
    }

    &.toasts-container-bottom-center {
        bottom: 25px;
        left: 50%;
        transform: translateX(-50%);
    }

    &.toasts-container-bottom-right {
        bottom: 25px;
        right: 25px;
    }
}

.list-top-left-enter-active,
.list-top-center-enter-active,
.list-top-right-enter-active,
.list-bottom-left-enter-active,
.list-bottom-center-enter-active,
.list-bottom-right-enter-active {
    transition: all 0.5s ease;
}

.list-top-left-leave-active,
.list-top-center-leave-active,
.list-top-right-leave-active,
.list-bottom-left-leave-active,
.list-bottom-center-leave-active,
.list-bottom-right-leave-active {
    transition: all 0.5s ease;
}

.list-top-left-enter-from,
.list-top-left-leave-to,
.list-bottom-left-enter-from,
.list-bottom-left-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

.list-top-center-enter-from,
.list-top-center-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}

.list-bottom-center-enter-from,
.list-bottom-center-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.list-top-right-enter-from,
.list-top-right-leave-to,
.list-bottom-right-enter-from,
.list-bottom-right-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
