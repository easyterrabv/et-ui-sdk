<template>
    <EtOverlayProvider>
        <EtFull>
            <EtMenuTop>
                <template #top>
                    <img
                        src="https://cdn.easyterra.com/images/themes/easyterra/logo.svg"
                        alt="EasyTerra"
                        style="margin-right: 16px;"
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
                                        <EtIconTurnRight />
                                    </template>
                                    Inputs
                                </EtSideBarItem>
                            </router-link>
                            <router-link to="/data-grid">
                                <EtSideBarItem
                                    :isActive="$route.matched.some(({path}) => path === '/data-grid')"
                                    :isCollapsed="scope.isCollapsed">
                                    <template #icon>
                                        <EtIconTable />
                                    </template>
                                    Data Grid
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
                                    <EtIconTag style="color: initial;" />
                                </template>
                                Booking notifications
                            </EtSideBarItem>
                            <EtSideBarItem :isCollapsed="scope.isCollapsed">
                                <template #icon>
                                    <EtIconTag style="color: initial;" />
                                </template>
                                Price Alerts
                            </EtSideBarItem>
                            <EtSideBarItem :isCollapsed="scope.isCollapsed">
                                <template #icon>
                                    <EtIconTag style="color: initial;" />
                                </template>
                                Booking notifications
                            </EtSideBarItem>
                            <EtSideBarItem :isCollapsed="scope.isCollapsed">
                                <template #icon>
                                    <EtIconTag style="color: initial;" />
                                </template>
                                Price Alerts
                            </EtSideBarItem>
                            <EtSideBarItem :isCollapsed="scope.isCollapsed">
                                <template #icon>
                                    <EtIconTag style="color: initial;" />
                                </template>
                                Booking notifications
                            </EtSideBarItem>
                            <EtSideBarItem :isCollapsed="scope.isCollapsed">
                                <template #icon>
                                    <EtIconTag style="color: initial;" />
                                </template>
                                Price Alerts
                            </EtSideBarItem>
                        </EtSideBarSection>

                        <EtSideBarSection :isCollapsed="scope.isCollapsed">
                            <template #label>
                                Buttons
                            </template>

                            <EtSideBarButton disabled :isCollapsed="scope.isCollapsed" @click="(e: Event) => console.log('Aii, I am disabled, you should not see this')">
                                <template #icon>
                                    <EtIconTag style="color: initial;" />
                                </template>
                                Disabled
                            </EtSideBarButton>

                            <EtSideBarButton :isCollapsed="scope.isCollapsed" @click="(e: Event) => console.log('test')">
                                <template #icon>
                                    <EtIconTag style="color: initial;" />
                                </template>
                                Test
                            </EtSideBarButton>
                        </EtSideBarSection>
                    </template>

                    <router-view v-slot="{ Component }">
                        <component v-if="Component" :is="Component" />
                    </router-view>
                </EtMenuLeft>
            </EtMenuTop>
        </EtFull>
    </EtOverlayProvider>
</template>

<script lang="ts">
import {defineComponent} from "vue";

import EtOverlayProvider from "src/components/etProvider/EtOverlayProvider.vue";
import EtFull from "src/layouts/Full.vue";
import EtMenuTop from "src/layouts/MenuTop.vue";
import EtMenuLeft from "src/layouts/MenuLeft.vue";

import EtTopBarItem from "src/components/etMenu/EtTopBarItem.vue";
import EtIconArrowRightFromBracket from "src/components/etIcon/EtIconArrowRightFromBracket.vue";

import EtSideBarSection from "src/components/etMenu/EtSideBarSection.vue";
import EtSideBarItem from "src/components/etMenu/EtSideBarItem.vue";
import EtSideBarButton from "src/components/etMenu/EtSideBarButton.vue";

import EtIconAnglesLeft from "src/components/etIcon/EtIconAnglesLeft.vue";
import EtIconHouse from "src/components/etIcon/EtIconHouse.vue";
import EtIconEnvelope from "src/components/etIcon/EtIconEnvelope.vue";
import EtIconCircleDot from "src/components/etIcon/EtIconCircleDot.vue";
import EtIconTable from "src/components/etIcon/EtIconTable.vue";
import EtIconTag from "src/components/etIcon/EtIconTag.vue";
import EtIconPlus from "src/components/etIcon/EtIconPlus.vue";
import EtIconTurnRight from "src/components/etIcon/EtIconTurnRight.vue";

import {UI_SIZING, UI_TYPES} from "../src/helpers/enums";

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
        EtOverlayProvider,
        EtFull,
        EtMenuTop,
        EtMenuLeft,

        EtTopBarItem,
        EtSideBarButton,
        EtIconArrowRightFromBracket,
        EtSideBarSection,
        EtSideBarItem,

        EtIconAnglesLeft,
        EtIconHouse,
        EtIconEnvelope,
        EtIconCircleDot,
        EtIconTag,
        EtIconPlus,
        EtIconTurnRight,
        EtIconTable
    }
});
</script>