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
                        style="margin-left: 16px; margin-right: 16px;"
                        :type="UI_TYPES.SUCCESS"
                    >
                        Random Badge
                    </EtBadge>

                    <template #actions>
                        <EtButtonPrimary
                            @click="() => drawerOpen = !drawerOpen">
                            Toggle Drawer!
                        </EtButtonPrimary>
                    </template>
                </EtHeaderBlock>
            </template>

            <div>
                <EtButtonDefault
                    @click="(e: Event) => console.log('test', e)">
                    Default!
                </EtButtonDefault>

                <EtButtonPrimary
                    style="margin-left: 16px;"
                    @click="(e: Event) => console.log('test', e)">
                    Primary!
                </EtButtonPrimary>

                <EtButtonSuccess
                    style="margin-left: 16px;"
                    @click="(e: Event) => console.log('test', e)">
                    Success!
                </EtButtonSuccess>

                <EtButtonDanger
                    style="margin-left: 16px;"
                    @click="(e: Event) => console.log('test', e)">
                    Danger!
                </EtButtonDanger>

                <EtButtonWarning
                    style="margin-left: 16px;"
                    @click="(e: Event) => console.log('test', e)">
                    Warning!
                </EtButtonWarning>

                <EtButtonText
                    style="margin-left: 16px;"
                    @click="(e: Event) => console.log('test', e)">
                    Text!
                </EtButtonText>
            </div>

            <div style="margin-top: 16px;">
                <EtButtonDefault
                    disabled
                    @click="(e: Event) => console.log('test', e)">
                    Default Disabled!
                </EtButtonDefault>

                <EtButtonPrimary
                    disabled
                    style="margin-left: 16px;"
                    @click="(e: Event) => console.log('test', e)">
                    Primary Disabled!
                </EtButtonPrimary>

                <EtButtonSuccess
                    disabled
                    style="margin-left: 16px;"
                    @click="(e: Event) => console.log('test', e)">
                    Success Disabled!
                </EtButtonSuccess>

                <EtButtonDanger
                    disabled
                    style="margin-left: 16px;"
                    @click="(e: Event) => console.log('test', e)">
                    Danger Disabled!
                </EtButtonDanger>

                <EtButtonWarning
                    disabled
                    style="margin-left: 16px;"
                    @click="(e: Event) => console.log('test', e)">
                    Warning Disabled!
                </EtButtonWarning>

                <EtButtonText
                    disabled
                    style="margin-left: 16px;"
                    @click="(e: Event) => console.log('test', e)">
                    Text Disabled!
                </EtButtonText>
            </div>

            <div style="margin-top: 16px;">
                <EtButtonDefault
                    active
                    @click="(e: Event) => console.log('test', e)">
                    Default active!
                </EtButtonDefault>

                <EtButtonPrimary
                    active
                    style="margin-left: 16px;"
                    @click="(e: Event) => console.log('test', e)">
                    Primary active!
                </EtButtonPrimary>

                <EtButtonSuccess
                    active
                    style="margin-left: 16px;"
                    @click="(e: Event) => console.log('test', e)">
                    Success active!
                </EtButtonSuccess>

                <EtButtonDanger
                    active
                    style="margin-left: 16px;"
                    @click="(e: Event) => console.log('test', e)">
                    Danger active!
                </EtButtonDanger>

                <EtButtonWarning
                    active
                    style="margin-left: 16px;"
                    @click="(e: Event) => console.log('test', e)">
                    Warning active!
                </EtButtonWarning>

                <EtButtonText
                    active
                    style="margin-left: 16px;"
                    @click="(e: Event) => console.log('test', e)">
                    Text active!
                </EtButtonText>
            </div>

            <div style="margin-top: 16px;">
                <EtButtonDefault
                    readonly
                    @click="(e: Event) => console.log('test', e)">
                    Default readonly!
                </EtButtonDefault>

                <EtButtonPrimary
                    readonly
                    :size="UI_SIZING.XS"
                    style="margin-left: 16px;"
                    @click="(e: Event) => console.log('test', e)">
                    Primary readonly XS
                </EtButtonPrimary>

                <EtButtonSuccess
                    readonly
                    style="margin-left: 16px;"
                    :size="UI_SIZING.S"
                    @click="(e: Event) => console.log('test', e)">
                    Success readonly S
                </EtButtonSuccess>

                <EtButtonDanger
                    readonly
                    style="margin-left: 16px;"
                    :size="UI_SIZING.M"
                    @click="(e: Event) => console.log('test', e)">
                    Danger readonly M
                </EtButtonDanger>

                <EtButtonWarning
                    readonly
                    style="margin-left: 16px;"
                    :size="UI_SIZING.L"
                    @click="(e: Event) => console.log('test', e)">
                    Warning readonly L
                </EtButtonWarning>

                <EtButtonText
                    readonly
                    style="margin-left: 16px;"
                    :size="UI_SIZING.L"
                    @click="(e: Event) => console.log('test', e)">
                    Text readonly L
                </EtButtonText>
            </div>

            <div style="margin-top: 16px;">
                <EtButtonGroup>
                    <EtButtonDefault
                        :size="UI_SIZING.S"
                        @click="(e: Event) => console.log('test', e)">
                        Hello! 1
                    </EtButtonDefault>
                    <EtButtonDefault
                        :size="UI_SIZING.S"
                        @click="(e: Event) => console.log('test', e)">
                        Hello! 2
                    </EtButtonDefault>
                    <EtButtonDefault
                        :size="UI_SIZING.S"
                        @click="(e: Event) => console.log('test', e)">
                        Hello! 3
                    </EtButtonDefault>
                    <EtButtonDefault
                        :size="UI_SIZING.S"
                        @click="(e: Event) => console.log('test', e)">
                        Hello! 4
                    </EtButtonDefault>
                </EtButtonGroup>
            </div>

            <div style="margin-top: 16px;">
                <EtButtonGroup isVertical>
                    <EtButtonDefault
                        :size="UI_SIZING.S"
                        @click="(e: Event) => console.log('test', e)">
                        Hello! 1
                    </EtButtonDefault>
                    <EtButtonDefault
                        :size="UI_SIZING.S"
                        @click="(e: Event) => console.log('test', e)">
                        Hello! 2
                    </EtButtonDefault>
                    <EtButtonDefault
                        :size="UI_SIZING.S"
                        @click="(e: Event) => console.log('test', e)">
                        Hello! 3
                    </EtButtonDefault>
                    <EtButtonGroup>
                        <EtButtonDanger
                            :size="UI_SIZING.S"
                            @click="(e: Event) => console.log('test', e)">
                            Danger!
                        </EtButtonDanger>
                        <EtButtonSuccess
                            :size="UI_SIZING.S"
                            @click="(e: Event) => console.log('test', e)">
                            Success!
                        </EtButtonSuccess>
                    </EtButtonGroup>
                </EtButtonGroup>
            </div>

            <div style="margin-top: 16px;">
                <EtButtonDropdown>
                    Click to toggle dropdown
                    <template #content>
                        <EtButtonGroup isVertical>
                            <EtButtonDefault
                                :size="UI_SIZING.S"
                                @click="(e: Event) => console.log('test', e)">
                                Hello! 1
                            </EtButtonDefault>
                            <EtButtonDefault
                                :size="UI_SIZING.S"
                                @click="(e: Event) => console.log('test', e)">
                                Hello! 2
                            </EtButtonDefault>
                            <EtButtonDefault
                                :size="UI_SIZING.S"
                                @click="(e: Event) => console.log('test', e)">
                                Hello! 3
                            </EtButtonDefault>
                            <EtButtonGroup>
                                <EtButtonDanger
                                    :size="UI_SIZING.S"
                                    @click="(e: Event) => console.log('test', e)">
                                    Danger!
                                </EtButtonDanger>
                                <EtButtonSuccess
                                    :size="UI_SIZING.S"
                                    @click="(e: Event) => console.log('test', e)">
                                    Success!
                                </EtButtonSuccess>
                            </EtButtonGroup>
                        </EtButtonGroup>
                    </template>
                </EtButtonDropdown>
            </div>

            <div style="margin-top: 16px;">
                <EtInput
                    v-model="inputTest"
                    placeholder="Test"
                    clear-button
                ></EtInput>
            </div>

            <div style="margin-top: 16px;">
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
                        @click="(e: Event) => console.log('test', e)">
                        Submit
                    </EtButtonPrimary>
                </EtFormGroup>
            </div>

            <div style="margin-top: 16px;">
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
                        @click="(e: Event) => console.log('test', e)">
                        Submit
                    </EtButtonPrimary>
                </EtFormGroup>
            </div>

            <div style="margin-top: 16px;">
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

            <div style="margin-top: 16px;">
                <EtPopover manual>
                    <template #toggle="{togglePopover}" >
                        <EtButtonDefault
                            style="width: 160px;"
                            :size="UI_SIZING.S" @click="togglePopover"
                        >
                            Toggle PopOver
                        </EtButtonDefault>
                    </template>
                    <EtButtonGroup isVertical>
                        <EtButtonDefault
                            :size="UI_SIZING.S"
                            @click="(e: Event) => console.log('test', e)">
                            Button One
                        </EtButtonDefault>
                        <EtButtonDefault
                            :size="UI_SIZING.S"
                            @click="(e: Event) => console.log('test', e)">
                            Button Two
                        </EtButtonDefault>
                        <EtButtonDefault
                            :size="UI_SIZING.S"
                            @click="(e: Event) => console.log('test', e)">
                            Button Three
                        </EtButtonDefault>
                    </EtButtonGroup>
                </EtPopover>
            </div>

            <div style="margin-top: 16px;">
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

            <div style="margin-top: 16px;">
                <EtBadge
                    :size="UI_SIZING.M"
                    :type="UI_TYPES.DEFAULT"
                >
                    Default
                </EtBadge>

                <EtBadge
                    style="margin-left: 16px;"
                    :size="UI_SIZING.M"
                    :type="UI_TYPES.PRIMARY"
                >
                    Primary
                </EtBadge>

                <EtBadge
                    style="margin-left: 16px;"
                    :size="UI_SIZING.M"
                    :type="UI_TYPES.SUCCESS"
                >
                    Success
                </EtBadge>

                <EtBadge
                    style="margin-left: 16px;"
                    :size="UI_SIZING.M"
                    :type="UI_TYPES.DANGER"
                >
                    Danger
                </EtBadge>

                <EtBadge
                    style="margin-left: 16px;"
                    :size="UI_SIZING.M"
                    :type="UI_TYPES.WARNING"
                >
                    Warning
                </EtBadge>
            </div>

            <div style="margin-top: 16px;">
                <EtBadge
                    :size="UI_SIZING.S"
                    :type="UI_TYPES.DEFAULT"
                >
                    Default
                </EtBadge>

                <EtBadge
                    style="margin-left: 16px;"
                    :size="UI_SIZING.S"
                    :type="UI_TYPES.PRIMARY"
                >
                    Primary
                </EtBadge>

                <EtBadge
                    style="margin-left: 16px;"
                    :size="UI_SIZING.S"
                    :type="UI_TYPES.SUCCESS"
                >
                    Success
                </EtBadge>

                <EtBadge
                    style="margin-left: 16px;"
                    :size="UI_SIZING.S"
                    :type="UI_TYPES.DANGER"
                >
                    Danger
                </EtBadge>

                <EtBadge
                    style="margin-left: 16px;"
                    :size="UI_SIZING.S"
                    :type="UI_TYPES.WARNING"
                >
                    Warning
                </EtBadge>
            </div>

            <EtCard style="margin-top: 16px;">
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
                        @click="(e: Event) => console.log('test', e)">
                        Submit
                    </EtButtonSuccess>
                </EtFormGroup>
            </EtCard>

            <div>
                <EtAlert
                    style="margin-top: 16px;"
                    :type="UI_TYPES.DEFAULT"
                >
                    Hi! This is a default alert
                </EtAlert>
                <EtAlert
                    style="margin-top: 16px;"
                    :type="UI_TYPES.PRIMARY"
                >
                    Hi! This is a primary alert
                </EtAlert>
                <EtAlert
                    style="margin-top: 16px;"
                    :type="UI_TYPES.SUCCESS"
                >
                    Hi! This is a success alert
                </EtAlert>
                <EtAlert
                    style="margin-top: 16px;"
                    :type="UI_TYPES.DANGER"
                >
                    Hi! This is a danger alert
                </EtAlert>
                <EtAlert
                    style="margin-top: 16px;"
                    :type="UI_TYPES.WARNING"
                >
                    Hi! This is a warning alert
                </EtAlert>
            </div>


            <EtResizable>
                This is a resizable box
            </EtResizable>

            <template v-for="formatDate in formatDates">
                <EtDate :date="formatDate"></EtDate><br/>
            </template>

            <EtListGroup>
                <li>
                    Test 1 with some pretty long text, the point is that it shouldn't wrap line
                </li>
                <li>
                    Test 2
                </li>
                <li>
                    Test 3
                </li>
                <li>
                    Test 4
                </li>
            </EtListGroup>
        </EtContent>
    </EtDrawer>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {UI_SIZING, UI_TYPES} from "../../src/helpers/enums";

import EtDrawer from "src/layouts/Drawer.vue";
import EtContent from "src/layouts/Content.vue";

import EtIconHouse from "src/components/etIcon/EtIconHouse.vue";

import EtButtonGroup from "src/components/etButton/EtButtonGroup.vue";
import EtButtonDefault from "src/components/etButton/EtButtonDefault.vue";
import EtButtonPrimary from "src/components/etButton/EtButtonPrimary.vue";
import EtButtonSuccess from "src/components/etButton/EtButtonSuccess.vue";
import EtButtonDanger from "src/components/etButton/EtButtonDanger.vue";
import EtButtonWarning from "src/components/etButton/EtButtonWarning.vue";
import EtButtonText from "src/components/etButton/EtButtonText.vue";

import EtButtonDropdown from "src/components/etButton/EtButtonDropdown.vue";

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
import EtResizable from "src/components/etUtilities/EtResizable.vue"

import EtListGroup from "src/components/etUtilities/EtListGroup.vue";

import EtDate from "src/components/etText/EtDate.vue";

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

        EtButtonGroup,
        EtButtonDefault,
        EtButtonPrimary,
        EtButtonSuccess,
        EtButtonDanger,
        EtButtonWarning,
        EtButtonText,

        EtButtonDropdown,

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
        EtTab,

        EtResizable,
        EtDate,

        EtListGroup
    },
    data() {
        return {
            inputTest: null,
            toggleTest: false,

            drawerOpen: false,
            disabledToggleInput: true,

            formatDates: [
                new Date(1993, 2, 8),
                new Date(2023, 2, 8),
                new Date(2004, 10, 20),
                new Date(2023, 10, 15)
            ]
        }
    },
})
</script>