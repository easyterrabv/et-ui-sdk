<template>
    <div
        class="et-sdk-input-color-picker"
        :class="{
            'et-sdk-input-color-picker--no-input': noInput
        }"
    >
        <EtInput
            v-if="!noInput"
            class="et-sdk-input-color-picker__input"
            :size="size"
            v-model="model"
        >
            <template #pre>
                <input
                    :autocomplete="'off'"
                    autocapitalize="off"
                    autocorrect="off"
                    spellcheck="false"
                    class="et-sdk-input-color-picker__color-display"
                    type="color"
                    v-model="model"
                />
            </template>
        </EtInput>
        <div class="et-sdk-input-color-options">
            <div
                class="et-sdk-input-color-option"
                :class="{
                    'et-sdk-input-color-option--selected':
                        model === fixedColorOption
                }"
                v-for="fixedColorOption in fixedColorOptions"
                :key="fixedColorOption"
                @click="model = fixedColorOption"
                :style="{ 'background-color': fixedColorOption }"
            ></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { UI_SIZING } from "../../helpers/enums";
import EtInput from "./EtInput.vue";
import { type PropType, watch } from "vue";

defineProps({
    size: {
        required: false,
        type: String,
        default: UI_SIZING.M
    },
    noInput: {
        required: false,
        type: Boolean,
        default: false
    },
    fixedColorOptions: {
        required: false,
        type: Array as PropType<string[]>,
        default: () => [
            "#94A3B8",
            "#334155",
            "#F87171",
            "#DC2626",
            "#34D399",
            "#059669",
            "#60A5FA",
            "#2563EB",
            "#A78BFA",
            "#4338CA",
            "#FBBF24",
            "#D97706"
        ]
    }
});

const model = defineModel({
    type: String
});

watch(
    () => model.value,
    (value) => {
        if (!value) {
            value = "#000000";
        }

        if (!value.startsWith("#")) {
            value = "#" + value;
        }

        if (value.length > 7) {
            value = value.substring(0, 7);
        }

        if (value !== model.value) {
            model.value = value;
        }
    }
);
</script>

<style>
.et-sdk-input-color-picker {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.et-sdk-input-color-picker__color-display {
    height: 100%;
    border-radius: 4px;

    inline-size: 100%;
    aspect-ratio: 1;
}

.et-sdk-input-color-options {
    display: flex;
    flex-direction: row;

    border: 1px solid var(--et-sdk-dark-200);
    border-top-width: 0;
    border-radius: 4px;
    padding: 10px 4px 4px;
    margin-top: -5px;
}

.et-sdk-input-color-picker--no-input .et-sdk-input-color-options {
    border-top-width: 1px;
    margin-top: 0;
    padding: 4px;
}

.et-sdk-input-color-option {
    height: 20px;
    aspect-ratio: 1/1;
    border-radius: 4px;
    margin: 2px;
    cursor: pointer;

    &.et-sdk-input-color-option--selected {
        outline: 2px solid var(--et-sdk-dark-700);
        outline-offset: 1px;
    }
}
</style>
