<template>
    <div class="w-full">
        <MenuLeft>

            <template #menu>
                <EtMenuSection>
                    <EtMenuItem>
                        Buttons
                    </EtMenuItem>
                    <EtMenuItem>
                        Forms
                    </EtMenuItem>
                </EtMenuSection>
            </template>

            <template
                v-for="size in Object.keys(UI_SIZING)">
                <EtButton
                    v-for="type in Object.keys(UI_TYPES)"
                    :size="UI_SIZING[size]"
                    @click="e => console.log('test', e)"
                    :type="UI_TYPES[type]">
                    Hello!
                </EtButton>
                <br />
                <br />
            </template>

            <HouseIcon></HouseIcon>

        </MenuLeft>
    </div>
</template>

<script setup lang="ts">
import MenuLeft from "../src/layouts/menuLeft.vue";

import EtButton from "../src/components/etButton/EtButton.vue";
import EtMenuSection from "../src/components/EtMenuSection.vue";
import EtMenuItem from "../src/components/EtMenuItem.vue";
import {UI_SIZING, UI_TYPES} from "../src/enums";

import HouseIcon from "../src/components/etIcons/EtIconHouse.vue"

import {
    ref,
} from "vue-demi";

const focusButton = ref<EtButton | null>(null);

setTimeout(() => {
    focusButton.value?.focus();

    setTimeout(() => {
        focusButton.value?.blur();
    }, 2000);
}, 2000);

</script>