<template>
    <EtFull>
        <EtMenuTop>
            <template #top>
                <img
                    src="https://cdn.easyterra.com/images/themes/easyterra/logo.svg"
                    alt="EasyTerra"
                    class="mr-4"
                    width="196"
                    height="40" />

                <EtTopBarItem active>
                    Tickets
                </EtTopBarItem>
                <EtTopBarItem>
                    Messages
                </EtTopBarItem>
                <EtTopBarItem>
                    Customers
                </EtTopBarItem>
                <EtTopBarItem>
                    Support Desk
                </EtTopBarItem>
            </template>

            <template #topEnd>
                <EtTopBarItem>
                    <a href="#">
                        <EtIconArrowRightFromBracket title="Sign out" />
                    </a>
                </EtTopBarItem>
            </template>

            <MenuLeft>
                <template #menu="scope">
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
        </EtMenuTop>
    </EtFull>
</template>

<script lang="ts">
import {defineComponent} from "vue-demi";

import EtFull from "src/layouts/Full.vue";
import EtMenuTop from "src/layouts/MenuTop.vue";
import MenuLeft from "src/layouts/menuLeft.vue";
import EtTopBarItem from "src/components/etMenu/EtTopBarItem.vue";
import EtMenuItem from "src/components/etMenu/EtMenuItem.vue";

import EtIconAnglesLeft from "src/components/etIcon/EtIconAnglesLeft.vue";
import EtIconArrowRightFromBracket from "src/components/etIcon/EtIconArrowRightFromBracket.vue";
import EtIconHouse from "src/components/etIcon/EtIconHouse.vue";

import EtButtonDefault from "src/components/etButton/EtButtonDefault.vue";
import EtButtonPrimary from "src/components/etButton/EtButtonPrimary.vue";

import EtInput from "src/components/etForm/EtInput.vue";
import EtInputGroup from "src/components/etForm/EtInputGroup.vue";
import EtInputGroupAddon from "src/components/etForm/EtInputGroupAddon.vue";
import EtInputLabel from "src/components/etForm/EtInputLabel.vue";

import EtFormGroup from "src/components/etForm/EtFormGroup.vue";

export default defineComponent({
    components: {
        EtFull,
        EtMenuTop,
        MenuLeft,
        EtMenuItem,
        EtTopBarItem,

        EtIconAnglesLeft,
        EtIconArrowRightFromBracket,
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