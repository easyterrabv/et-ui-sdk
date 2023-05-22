<template>
    <div class="w-full">
        <MenuLeft>

            <template #menu="scope">
                <div  class="bg-primary w-full h-14" :class="scope.isCollapsed ? 'p-4' : 'p-2'">
                <img
                    v-if="!scope.isCollapsed"
                    class="mx-auto"
                    src="https://cdn.easyterra.com/images/themes/easyterra/logo.svg"
                    alt="EasyTerra"
                    width="196"
                    height="40" />

                <img
                    v-else
                    class="mx-auto"
                    src="https://cdn.easyterra.com/images/themes/default/favicon.png"
                />
                </div>
                <EtMenuItem :is-collapsed="scope.isCollapsed">
                    <template #icon>
                        <EtIconAnglesLeft title="Buttons" />
                    </template>
                    Buttons
                </EtMenuItem>
                <EtMenuItem :is-collapsed="scope.isCollapsed" isActive>
                    Forms
                    <template #submenu>
                        <EtMenuItem>
                            Sub - Buttons
                        </EtMenuItem>
                        <EtMenuItem>
                            Sub - Menu Item With Relatively Long Text
                        </EtMenuItem>
                    </template>
                </EtMenuItem>
                <EtMenuItem :is-collapsed="scope.isCollapsed">
                    Menu Item With Relatively Long Text
                </EtMenuItem>
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
import EtMenuItem from "../src/components/etMenu/EtMenuItem.vue";
import {UI_SIZING, UI_TYPES} from "../src/enums";

import HouseIcon from "../src/components/etIcons/EtIconHouse.vue"

import {
    ref,
} from "vue-demi";
import EtIconHouse from "../src/components/etIcons/EtIconHouse.vue";
import EtIconAnglesLeft from "../src/components/etIcons/EtIconAnglesLeft.vue";

const focusButton = ref<EtButton | null>(null);

setTimeout(() => {
    focusButton.value?.focus();

    setTimeout(() => {
        focusButton.value?.blur();
    }, 2000);
}, 2000);

</script>