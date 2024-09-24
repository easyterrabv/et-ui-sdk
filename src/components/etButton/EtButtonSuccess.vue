<template>
    <EtButton
        class="et-sdk-button-success"
        v-bind="{ ...$props, ...$attrs }"
        :type="UI_TYPES.SUCCESS"
    >
        <slot></slot>
    </EtButton>
</template>

<script setup lang="ts">
import EtButton from "./EtButton.vue";
import { UI_TYPES } from "../../helpers/enums";

import { type ISharedButtonProps, propDefaults } from "./IEtButtonStatic";

withDefaults(defineProps<ISharedButtonProps>(), {
    ...propDefaults
});
</script>
