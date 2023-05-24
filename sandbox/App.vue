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

            <EtButtonDefault
                @click="e => console.log('test', e)">
                Hello!
            </EtButtonDefault>

            <EtButtonPrimary
                @click="e => console.log('test', e)">
                Primary!
            </EtButtonPrimary>
        </MenuLeft>
    </div>
</template>

<script setup lang="ts">
import MenuLeft from "../src/layouts/menuLeft.vue";

import EtButton from "../src/components/etButton/EtButton.vue";
import EtButtonDefault from "../src/components/etButton/EtButtonDefault.vue";
import EtButtonPrimary from "../src/components/etButton/EtButtonPrimary.vue";
import EtMenuItem from "../src/components/etMenu/EtMenuItem.vue";


import {ref,} from "vue-demi";
import EtIconAnglesLeft from "../src/components/etIcon/EtIconAnglesLeft.vue";

const focusButton = ref<EtButton | null>(null);

setTimeout(() => {
    focusButton.value?.focus();

    setTimeout(() => {
        focusButton.value?.blur();
    }, 2000);
}, 2000);

</script>