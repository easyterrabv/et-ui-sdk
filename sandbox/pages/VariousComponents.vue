<template>
    <EtDrawer :drawerOpen="drawerOpen">
        <template #drawer>
            <EtHeaderBlock>
                Hi, this is drawer content!
            </EtHeaderBlock>
            <EtSection>
                <template #header>
                    Recent Interactions
                </template>
                <template #tabs>
                    <EtTabs>
                        <EtTab isActive>
                            Tab 1
                        </EtTab>
                        <EtTab>
                            Tab 2
                        </EtTab>
                    </EtTabs>
                </template>
                A bit of content <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lectus sapien, semper quis est quis, tempus porttitor enim. Proin posuere enim sed accumsan sodales. Suspendisse sit amet diam vel nisl bibendum ornare et eu sem.
            </EtSection>
        </template>

        <EtContent>
            <template #header>
                <EtHeaderBlock>
                    Various Components

                    <EtBadge
                        class="mx-4"
                        :type="UI_TYPES.SUCCESS"
                    >
                        Random Badge
                    </EtBadge>

                    <template #actions>
                        <EtButtonPrimary
                            @click="e => drawerOpen = !drawerOpen">
                            Toggle Drawer!
                        </EtButtonPrimary>
                    </template>
                </EtHeaderBlock>
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

                <EtButtonSuccess
                    class="ml-4"
                    @click="e => console.log('test', e)">
                    Success!
                </EtButtonSuccess>

                <EtButtonDanger
                    class="ml-4"
                    @click="e => console.log('test', e)">
                    Danger!
                </EtButtonDanger>

                <EtButtonWarning
                    class="ml-4"
                    @click="e => console.log('test', e)">
                    Warning!
                </EtButtonWarning>
            </div>

            <div class="mt-4">
                <EtButtonDefault
                    :size="UI_SIZING.S"
                    @click="e => console.log('test', e)">
                    Hello!
                </EtButtonDefault>

                <EtButtonPrimary
                    :size="UI_SIZING.S"
                    class="ml-4"
                    @click="e => console.log('test', e)">
                    Primary!
                </EtButtonPrimary>

                <EtButtonSuccess
                    :size="UI_SIZING.S"
                    class="ml-4"
                    @click="e => console.log('test', e)">
                    Success!
                </EtButtonSuccess>

                <EtButtonDanger
                    :size="UI_SIZING.S"
                    class="ml-4"
                    @click="e => console.log('test', e)">
                    Danger!
                </EtButtonDanger>

                <EtButtonWarning
                    :size="UI_SIZING.S"
                    class="ml-4"
                    @click="e => console.log('test', e)">
                    Warning!
                </EtButtonWarning>
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

            <div class="mt-4">
                <EtToggle
                    v-model="toggleTest"
                    :size="UI_SIZING.S">
                    Click to toggle nothing at all!
                </EtToggle>
                <EtToggle
                    v-model="toggleTest"
                    :size="UI_SIZING.M">
                    Click to toggle nothing at all!
                </EtToggle>
            </div>

            <div class="mt-4">
                <EtPopover>
                    <template #toggle>
                        <EtButtonDefault
                            :size="UI_SIZING.S"
                            @click="e => console.log('test', e)">
                            Toggle PopOver
                        </EtButtonDefault>
                    </template>
                    <EtBox>
                        Hello!
                    </EtBox>
                </EtPopover>
            </div>

            <div class="mt-4">
                <EtFormGroup>
                    <template #label>
                        Toggle Test
                    </template>
                    <EtInputGroupAddon>
                        <EtToggle
                            v-model="disabledToggleInput">
                        </EtToggle>
                    </EtInputGroupAddon>
                    <EtInput
                        v-model="inputTest"
                        :disabled="disabledToggleInput"
                        placeholder="Test"
                        clear-button
                    ></EtInput>
                </EtFormGroup>
            </div>

            <div class="mt-4">
                <EtBadge
                    :size="UI_SIZING.M"
                    :type="UI_TYPES.DEFAULT"
                >
                    Default
                </EtBadge>

                <EtBadge
                    class="ml-4"
                    :size="UI_SIZING.M"
                    :type="UI_TYPES.PRIMARY"
                >
                    Primary
                </EtBadge>

                <EtBadge
                    class="ml-4"
                    :size="UI_SIZING.M"
                    :type="UI_TYPES.SUCCESS"
                >
                    Success
                </EtBadge>

                <EtBadge
                    class="ml-4"
                    :size="UI_SIZING.M"
                    :type="UI_TYPES.DANGER"
                >
                    Danger
                </EtBadge>

                <EtBadge
                    class="ml-4"
                    :size="UI_SIZING.M"
                    :type="UI_TYPES.WARNING"
                >
                    Warning
                </EtBadge>
            </div>

            <div class="mt-4">
                <EtBadge
                    :size="UI_SIZING.S"
                    :type="UI_TYPES.DEFAULT"
                >
                    Default
                </EtBadge>

                <EtBadge
                    class="ml-4"
                    :size="UI_SIZING.S"
                    :type="UI_TYPES.PRIMARY"
                >
                    Primary
                </EtBadge>

                <EtBadge
                    class="ml-4"
                    :size="UI_SIZING.S"
                    :type="UI_TYPES.SUCCESS"
                >
                    Success
                </EtBadge>

                <EtBadge
                    class="ml-4"
                    :size="UI_SIZING.S"
                    :type="UI_TYPES.DANGER"
                >
                    Danger
                </EtBadge>

                <EtBadge
                    class="ml-4"
                    :size="UI_SIZING.S"
                    :type="UI_TYPES.WARNING"
                >
                    Warning
                </EtBadge>
            </div>

            <EtCard class="mt-4">
                <template #header>
                    Card header with small inputs
                </template>
                <EtFormGroup>
                    <template #label>
                        Hello Test Smaller Size
                    </template>
                    <EtInput
                        :size="UI_SIZING.S"
                        v-model="inputTest"
                        placeholder="First"
                        clear-button
                    ></EtInput>
                    <EtInputGroupAddon
                        :size="UI_SIZING.S"
                    >
                        And Then
                    </EtInputGroupAddon>
                    <EtInput
                        :size="UI_SIZING.S"
                        v-model="inputTest"
                        placeholder="Second"
                        clear-button
                    ></EtInput>
                    <EtButtonSuccess
                        :size="UI_SIZING.S"
                        @click="e => console.log('test', e)">
                        Submit
                    </EtButtonSuccess>
                </EtFormGroup>
            </EtCard>

            <div>
                <EtAlert
                    class="mt-4"
                    :type="UI_TYPES.DEFAULT"
                >
                    Hi! This is a default alert
                </EtAlert>
                <EtAlert
                    class="mt-4"
                    :type="UI_TYPES.PRIMARY"
                >
                    Hi! This is a primary alert
                </EtAlert>
                <EtAlert
                    class="mt-4"
                    :type="UI_TYPES.SUCCESS"
                >
                    Hi! This is a success alert
                </EtAlert>
                <EtAlert
                    class="mt-4"
                    :type="UI_TYPES.DANGER"
                >
                    Hi! This is a danger alert
                </EtAlert>
                <EtAlert
                    class="mt-4"
                    :type="UI_TYPES.WARNING"
                >
                    Hi! This is a warning alert
                </EtAlert>
            </div>
        </EtContent>
    </EtDrawer>
</template>

<script lang="ts">
import {defineComponent} from "vue-demi";
import {UI_SIZING, UI_TYPES} from "../../src/enums";

import EtDrawer from "src/layouts/Drawer.vue";
import EtContent from "src/layouts/Content.vue";

import EtIconHouse from "src/components/etIcon/EtIconHouse.vue";

import EtButtonDefault from "src/components/etButton/EtButtonDefault.vue";
import EtButtonPrimary from "src/components/etButton/EtButtonPrimary.vue";
import EtButtonSuccess from "src/components/etButton/EtButtonSuccess.vue";
import EtButtonDanger from "src/components/etButton/EtButtonDanger.vue";
import EtButtonWarning from "src/components/etButton/EtButtonWarning.vue";

import EtInput from "src/components/etForm/EtInput.vue";
import EtInputGroup from "src/components/etForm/EtInputGroup.vue";
import EtInputGroupAddon from "src/components/etForm/EtInputGroupAddon.vue";
import EtToggle from "src/components/etForm/EtToggle.vue";

import EtHeaderBlock from "src/components/EtHeaderBlock.vue";
import EtBox from "src/components/EtBox.vue";
import EtCard from "src/components/EtCard.vue";
import EtSection from "src/components/EtSection.vue";
import EtBadge from "src/components/etBadge/EtBadge.vue";
import EtAlert from "src/components/etAlert/EtAlert.vue";

import EtPopover from "src/components/EtPopover.vue";

import EtTabs from "src/components/etTabs/EtTabs.vue";
import EtTab from "src/components/etTabs/EtTab.vue";

import EtFormGroup from "src/components/etForm/EtFormGroup.vue";

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
        EtDrawer,
        EtContent,

        EtIconHouse,

        EtButtonDefault,
        EtButtonPrimary,
        EtButtonSuccess,
        EtButtonDanger,
        EtButtonWarning,

        EtInput,
        EtInputGroup,
        EtInputGroupAddon,
        EtFormGroup,
        EtToggle,

        EtHeaderBlock,
        EtCard,
        EtBox,
        EtSection,
        EtBadge,
        EtAlert,
        EtPopover,

        EtTabs,
        EtTab
    },
    data() {
        return {
            inputTest: null,
            toggleTest: false,

            drawerOpen: false,
            disabledToggleInput: true
        }
    },
})
</script>