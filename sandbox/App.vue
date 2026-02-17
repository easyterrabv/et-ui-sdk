<template>
    <EtOverlayProvider>
        <EtToastProvider>
            <EtModalProvider>
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
                                                <EtIconMedalDuo />
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
                                    <router-link to="/modals">
                                        <EtSideBarItem
                                            :isActive="$route.matched.some(({path}) => path === '/modals')"
                                            :isCollapsed="scope.isCollapsed">
                                            <template #icon>
                                                <EtIconGarageOpen />
                                            </template>
                                            Modals / Toasts
                                        </EtSideBarItem>
                                    </router-link>
                                    <router-link to="/test">
                                        <EtSideBarItem
                                            :isActive="$route.matched.some(({path}) => path === '/test')"
                                            :isCollapsed="scope.isCollapsed">
                                            <template #icon>
                                                <EtIconGarageOpen />
                                            </template>
                                            Test
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
                                    <EtSideBarItem :isCollapsed="scope.isCollapsed">
                                        <template #icon>
                                            <EtIconTag style="color: initial;" />
                                        </template>
                                        WITH_A_SUPER_LONG_NAME_WITHOUT_SPACES
                                    </EtSideBarItem>
                                    <EtSideBarItem :isCollapsed="scope.isCollapsed">
                                        <template #icon>
                                            <EtIconTag style="color: initial;" />
                                        </template>
                                        WITH_A_SUPER_LONG_NAME_WITHOUT_SPACES_AND_EXTRA
                                        <template #extra>
                                            <EtIconTag style="color: initial;" />
                                        </template>
                                    </EtSideBarItem>
                                </EtSideBarSection>

                                <EtSideBarSection :isCollapsed="scope.isCollapsed">
                                    <template #label>
                                        Buttons
                                    </template>

                                    <EtSideBarButton disabled :isCollapsed="scope.isCollapsed" @click="() => console.log('Aii, I am disabled, you should not see this')">
                                        <template #icon>
                                            <EtIconTag style="color: initial;" />
                                        </template>
                                        Disabled
                                    </EtSideBarButton>

                                    <EtSideBarButton :isCollapsed="scope.isCollapsed" @click="() => console.log('test')">
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
            </EtModalProvider>
        </EtToastProvider>
    </EtOverlayProvider>
</template>

<script lang="ts" setup>
import EtOverlayProvider from "src/components/etProvider/EtOverlayProvider.vue";
import EtModalProvider from "src/components/etProvider/EtModalProvider.vue";
import EtFull from "src/layouts/Full.vue";
import EtMenuTop from "src/layouts/MenuTop.vue";
import EtMenuLeft from "src/layouts/MenuLeft.vue";

import EtTopBarItem from "src/components/etMenu/EtTopBarItem.vue";
import EtIconArrowRightFromBracket from "src/components/etIcon/EtIconArrowRightFromBracket.vue";

import EtSideBarSection from "src/components/etMenu/EtSideBarSection.vue";
import EtSideBarItem from "src/components/etMenu/EtSideBarItem.vue";
import EtSideBarButton from "src/components/etMenu/EtSideBarButton.vue";

import EtIconEnvelope from "src/components/etIcon/EtIconEnvelope.vue";
import EtIconTable from "src/components/etIcon/EtIconTable.vue";
import EtIconTag from "src/components/etIcon/EtIconTag.vue";
import EtIconPlus from "src/components/etIcon/EtIconPlus.vue";
import EtIconTurnRight from "src/components/etIcon/EtIconTurnRight.vue";
import EtIconGarageOpen from "../src/components/etIcon/EtIconGarageOpen.vue";
import EtToastProvider from "src/components/etProvider/EtToastProvider.vue";
import EtIconMedalDuo from "src/components/etIcon/EtIconMedalDuo.vue";
</script>