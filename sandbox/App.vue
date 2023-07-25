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
                    Components
                </EtTopBarItem>
            </template>

            <template #topEnd>
                <EtTopBarItem>
                    <a href="#">
                        <EtIconArrowRightFromBracket title="Sign out" />
                    </a>
                </EtTopBarItem>
            </template>

            <EtMenuLeft>
                <template #menu="scope">

                    <EtSideBarSection :isCollapsed="scope.isCollapsed">
                        <template #label>
                            Components
                        </template>
                        <router-link to="/various">
                            <EtSideBarItem
                                :isActive="$route.matched.some(({path}) => path === '/various')"
                                :isCollapsed="scope.isCollapsed">
                                <template #icon>
                                    <EtIconEnvelope />
                                </template>
                                Various
                            </EtSideBarItem>
                        </router-link>
                        <router-link to="/inputs">
                            <EtSideBarItem
                                :isActive="$route.matched.some(({path}) => path === '/inputs')"
                                :isCollapsed="scope.isCollapsed">
                                <template #icon>
                                    <EtIconCircleDot />
                                </template>
                                Inputs
                            </EtSideBarItem>
                        </router-link>
                        <router-link to="/simple-table">
                            <EtSideBarItem
                                :isActive="$route.matched.some(({path}) => path === '/simple-table')"
                                :isCollapsed="scope.isCollapsed">
                                <template #icon>
                                    <EtIconCircleDot />
                                </template>
                                Simple Table
                            </EtSideBarItem>
                        </router-link>
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

                <router-view v-slot="{ Component }">
                    <transition
                        class="transition ease-out duration-75"
                        enter-from-class="opacity-0"
                        enter-to-class="delay-75 opacity-100"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                    >
                        <component :is="Component" />
                    </transition>
                </router-view>
            </EtMenuLeft>
        </EtMenuTop>
    </EtFull>
</template>

<script lang="ts">
import {defineComponent} from "vue";

import EtFull from "src/layouts/Full.vue";
import EtMenuTop from "src/layouts/MenuTop.vue";
import EtMenuLeft from "src/layouts/MenuLeft.vue";

import EtTopBarItem from "src/components/etMenu/EtTopBarItem.vue";
import EtIconArrowRightFromBracket from "src/components/etIcon/EtIconArrowRightFromBracket.vue";

import EtSideBarSection from "src/components/etMenu/EtSideBarSection.vue";
import EtSideBarItem from "src/components/etMenu/EtSideBarItem.vue";

import EtIconAnglesLeft from "src/components/etIcon/EtIconAnglesLeft.vue";
import EtIconHouse from "src/components/etIcon/EtIconHouse.vue";
import EtIconEnvelope from "src/components/etIcon/EtIconEnvelope.vue";
import EtIconCircleDot from "src/components/etIcon/EtIconCircleDot.vue";
import EtIconTag from "src/components/etIcon/EtIconTag.vue";
import EtIconPlus from "src/components/etIcon/EtIconPlus.vue";

import {UI_SIZING, UI_TYPES} from "../src/enums";

export default defineComponent({
    computed: {
        UI_TYPES() {
            return UI_TYPES
        },
        UI_SIZING() {
            return UI_SIZING
        }
    },
    components: {
        EtFull,
        EtMenuTop,
        EtMenuLeft,

        EtTopBarItem,
        EtIconArrowRightFromBracket,
        EtSideBarSection,
        EtSideBarItem,

        EtIconAnglesLeft,
        EtIconHouse,
        EtIconEnvelope,
        EtIconCircleDot,
        EtIconTag,
        EtIconPlus
    }
});
</script>