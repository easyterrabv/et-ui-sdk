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

            <div>
                <EtButtonDefault
                    @click="e => console.log('test', e)">
                    Hello!
                </EtButtonDefault>

                <EtButtonPrimary
                    class="ml-4"
                    @click="e => console.log('test', e)">
                    Primary!
                </EtButtonPrimary>
            </div>

            <div class="mt-4">
                <EtInput
                    v-model="inputTest"
                    placeholder="Test"
                    clear-button
                ></EtInput>
            </div>

            <div class="mt-4">
                <EtFormGroup>
                    <template #label>
                        Hello
                    </template>
                    <EtInputGroupAddon>
                        <EtIconHouse></EtIconHouse>
                    </EtInputGroupAddon>
                    <EtInput
                        v-model="inputTest"
                        placeholder="Test"
                        clear-button
                    ></EtInput>
                    <EtButtonPrimary
                        @click="e => console.log('test', e)">
                        Submit
                    </EtButtonPrimary>
                </EtFormGroup>
            </div>

            <div class="mt-4">
                <EtFormGroup>
                    <template #label>
                        Hello Test
                    </template>
                    <EtInput
                        v-model="inputTest"
                        placeholder="First"
                        clear-button
                    ></EtInput>
                    <EtInputGroupAddon>
                        And Then
                    </EtInputGroupAddon>
                    <EtInput
                        v-model="inputTest"
                        placeholder="Second"
                        clear-button
                    ></EtInput>
                    <EtButtonPrimary
                        @click="e => console.log('test', e)">
                        Submit
                    </EtButtonPrimary>
                </EtFormGroup>
            </div>
        </MenuLeft>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue-demi";

import MenuLeft from "../src/layouts/menuLeft.vue";
import EtMenuItem from "../src/components/etMenu/EtMenuItem.vue";

import EtIconAnglesLeft from "../src/components/etIcon/EtIconAnglesLeft.vue";
import EtIconHouse from "../src/components/etIcon/EtIconHouse.vue";

import EtButtonDefault from "../src/components/etButton/EtButtonDefault.vue";
import EtButtonPrimary from "../src/components/etButton/EtButtonPrimary.vue";

import EtInput from "../src/components/etForm/EtInput.vue";
import EtInputGroup from "../src/components/etForm/EtInputGroup.vue";
import EtInputGroupAddon from "../src/components/etForm/EtInputGroupAddon.vue";
import EtInputLabel from "../src/components/etForm/EtInputLabel.vue";

import EtFormGroup from "../src/components/etForm/EtFormGroup.vue";

export default defineComponent({
    components: {
        MenuLeft,
        EtMenuItem,

        EtIconAnglesLeft,
        EtIconHouse,

        EtButtonDefault,
        EtButtonPrimary,

        EtInput,
        EtInputGroup,
        EtInputGroupAddon,
        EtInputLabel,
        EtFormGroup
    },
    data() {
        return {
            inputTest: null
        }
    },
    watch: {
        inputTest() {
            console.log(this.inputTest);
        }
    }
});
</script>