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

                    <EtSideBarSection :isCollapsed="scope.isCollapsed">
                        <template #label>
                            Status
                        </template>
                        <EtSideBarItem isActive :isCollapsed="scope.isCollapsed">
                            <template #icon>
                                <EtIconEnvelope />
                            </template>
                            All
                        </EtSideBarItem>
                        <EtSideBarItem :isCollapsed="scope.isCollapsed">
                            <template #icon>
                                <EtIconCircleDot />
                            </template>
                            Open
                        </EtSideBarItem>
                        <EtSideBarItem :isCollapsed="scope.isCollapsed">
                            <template #icon>
                                <EtIconCircleDot />
                            </template>
                            Closed
                        </EtSideBarItem>
                        <EtSideBarItem :isCollapsed="scope.isCollapsed">
                            <template #icon>
                                <EtIconCircleDot />
                            </template>
                            New
                        </EtSideBarItem>
                    </EtSideBarSection>

                    <EtSideBarSection :isCollapsed="scope.isCollapsed">
                        <template #label>
                            Labels
                        </template>
                        <template #action>
                            <EtIconPlus />
                        </template>
                        <EtSideBarItem :isCollapsed="scope.isCollapsed">
                            <template #icon>
                                <EtIconTag class="!text-text" />
                            </template>
                            Booking notifications
                        </EtSideBarItem>
                        <EtSideBarItem :isCollapsed="scope.isCollapsed">
                            <template #icon>
                                <EtIconTag class="!text-text" />
                            </template>
                            Price Alerts
                        </EtSideBarItem>
                        <EtSideBarItem :isCollapsed="scope.isCollapsed">
                            <template #icon>
                                <EtIconTag class="!text-text" />
                            </template>
                            Booking notifications
                        </EtSideBarItem>
                        <EtSideBarItem :isCollapsed="scope.isCollapsed">
                            <template #icon>
                                <EtIconTag class="!text-text" />
                            </template>
                            Price Alerts
                        </EtSideBarItem>
                        <EtSideBarItem :isCollapsed="scope.isCollapsed">
                            <template #icon>
                                <EtIconTag class="!text-text" />
                            </template>
                            Booking notifications
                        </EtSideBarItem>
                        <EtSideBarItem :isCollapsed="scope.isCollapsed">
                            <template #icon>
                                <EtIconTag class="!text-text" />
                            </template>
                            Price Alerts
                        </EtSideBarItem>
                    </EtSideBarSection>
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

import EtSideBarSection from "src/components/etMenu/EtSideBarSection.vue";
import EtSideBarItem from "src/components/etMenu/EtSideBarItem.vue";

import EtIconAnglesLeft from "src/components/etIcon/EtIconAnglesLeft.vue";
import EtIconArrowRightFromBracket from "src/components/etIcon/EtIconArrowRightFromBracket.vue";
import EtIconHouse from "src/components/etIcon/EtIconHouse.vue";
import EtIconEnvelope from "src/components/etIcon/EtIconEnvelope.vue";
import EtIconCircleDot from "src/components/etIcon/EtIconCircleDot.vue";
import EtIconTag from "src/components/etIcon/EtIconTag.vue";
import EtIconPlus from "src/components/etIcon/EtIconPlus.vue";

import EtButtonDefault from "src/components/etButton/EtButtonDefault.vue";
import EtButtonPrimary from "src/components/etButton/EtButtonPrimary.vue";

import EtInput from "src/components/etForm/EtInput.vue";
import EtInputGroup from "src/components/etForm/EtInputGroup.vue";
import EtInputGroupAddon from "src/components/etForm/EtInputGroupAddon.vue";

import EtFormGroup from "src/components/etForm/EtFormGroup.vue";

export default defineComponent({
    components: {
        EtFull,
        EtMenuTop,
        MenuLeft,
        EtTopBarItem,

        EtIconAnglesLeft,
        EtIconArrowRightFromBracket,
        EtIconHouse,
        EtIconEnvelope,
        EtIconCircleDot,
        EtIconTag,
        EtIconPlus,

        EtButtonDefault,
        EtButtonPrimary,

        EtInput,
        EtInputGroup,
        EtInputGroupAddon,
        EtFormGroup,

        EtSideBarSection,
        EtSideBarItem
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