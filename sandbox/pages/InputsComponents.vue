<template>
    <EtContent>
        <EtCard style="margin-top: 16px;">
            <template #header>
                Basic inputs
            </template>

            <EtForm @submit="doSubmit">
                <EtFormGroup>
                    <template #label>Simple Input</template>
                    <EtInput/>
                </EtFormGroup>

                <EtFormGroup>
                    <template #label>Simple Input with pre</template>
                    <EtInput>
                        <template #pre>With Pre</template>
                    </EtInput>
                </EtFormGroup>
                <EtFormGroup>
                    <template #label>Simple Input with Post</template>
                    <EtInput>
                        <template #post>With Post</template>
                    </EtInput>
                </EtFormGroup>

                <EtFormGroup>
                    <template #label>Simple Readonly Input with overlay</template>
                    <EtInput readonly>
                        <template #post>With Post</template>
                        <template #overlay>
                            <EtBadgePrimary>
                                One Primary badge
                            </EtBadgePrimary>
                            <EtBadgePrimary>
                                Two Primary badge
                            </EtBadgePrimary>
                            <EtBadgePrimary>
                                Three Primary badge
                            </EtBadgePrimary>
                        </template>
                    </EtInput>
                </EtFormGroup>

                <EtFormGroup>
                    <template #label>Simple Grey Input</template>
                    <EtInput theme="grey" placeholder="placeholder text"/>
                </EtFormGroup>

                <EtFormGroup>
                    <template #label>Simple Gmail Style Input</template>
                    <EtInput theme="gmail" placeholder="placeholder text"/>
                </EtFormGroup>

                <EtFormGroup>
                    <template #label>Disabled Simple Gmail Style Input</template>
                    <EtInput theme="gmail" placeholder="placeholder text" disabled />
                </EtFormGroup>

                <EtFormGroup>
                    <EtInput theme="gmail" placeholder="placeholder text">
                        <template #pre>
                            VoucherId
                        </template>
                    </EtInput>
                </EtFormGroup>

                <EtFormGroup>
                    <EtInput theme="gmail" placeholder="placeholder text" disabled>
                        <template #pre>
                            VoucherId
                        </template>
                    </EtInput>
                </EtFormGroup>

                <EtFormGroup style="margin-top: 16px;">
                    <template #label>Password Input</template>
                    <EtInput type="password"/>
                </EtFormGroup>
            </EtForm>

            <EtFormGroup style="margin-top: 16px;">
                <template #label>Simple Input small size</template>
                <EtInput :size="UI_SIZING.S"/>
            </EtFormGroup>

            <EtFormGroup style="margin-top: 16px;">
                <template #label>Simple Input size with alert</template>
                <EtInput error />
                <template #after>
                    <EtAlertDanger>Danger</EtAlertDanger>
                </template>
            </EtFormGroup>

            <EtFormGroup style="margin-top: 16px;">
                <template #label>Simple textarea</template>
                <EtTextarea v-model="textareaContent" placeholder="Type something" />
            </EtFormGroup>

            <EtFormGroup style="margin-top: 16px;">
                <template #label>WYSIWYG</template>
                <EtWysiwyg
                    v-model="wysiwygContent"
                    ref="wysiwyg"
                    hasAttachments
                    @attachments="handleAttachments"
                    :inlineImageUploadCallback="handleInlineImageUpload"
                >
                    <template #inner>
                        <EtButtonDefault
                            :size="UI_SIZING.XS"
                        >
                            Random button for test
                        </EtButtonDefault>
                    </template>
                </EtWysiwyg>
            </EtFormGroup>

            <EtFormGroup style="margin-top: 16px;">
                <template #label>Color picker</template>
                <EtInputColorPicker v-model="colorPicked"></EtInputColorPicker>
            </EtFormGroup>

            <EtFormGroup style="margin-top: 16px;">
                <template #label>Color picker</template>
                <EtInputColorPicker v-model="colorPicked" no-input></EtInputColorPicker>
            </EtFormGroup>

            <EtFormGroup style="margin-top: 16px;">
                <template #label>Min Max</template>
                <EtInputNumberRange v-model="numberRange"></EtInputNumberRange>
            </EtFormGroup>

            <EtFormGroup style="margin-top: 16px;">
                <template #label>File Drop Input</template>
                <EtInputFileDrop />
            </EtFormGroup>

            <EtFormGroup style="margin-top: 16px;">
                <template #label>Checkbox with label</template>
                <EtCheckboxWithLabel>
                    Tick this checkbox and nothing will happen
                </EtCheckboxWithLabel>
            </EtFormGroup>

            <EtFormGroup style="margin-top: 16px;">
                <template #label>Checkbox with label</template>
                <EtCheckboxWithLabel disabled>
                    Tick this checkbox and nothing will happen
                </EtCheckboxWithLabel>
            </EtFormGroup>
        </EtCard>

        <EtCard style="margin-top: 16px;">
            <template #header>
                Grouped inputs
            </template>

            <EtFormGroup>
                <template #label>Simple Input</template>
                <EtInputGroupAddon>
                    Addon
                </EtInputGroupAddon>
                <EtInput placeholder="Input"/>
            </EtFormGroup>

            <EtFormGroup style="margin-top: 16px;">
                <template #label>Simple Input</template>
                <EtInput placeholder="First Input"/>
                <EtInputGroupAddon>
                    With a addon in between
                </EtInputGroupAddon>
                <EtInput placeholder="Second Input"/>
            </EtFormGroup>
        </EtCard>

        <EtCard style="margin-top: 16px;">
            <template #header>
                Select
            </template>

            <EtInputSelect v-model="multipleSelectedOptions" :options="options" multiple></EtInputSelect>
            <EtInputSelect v-model="singleSelectedOption" :options="options"></EtInputSelect>
            <EtButtonSelect v-model="multipleSelectedOptions" :options="options"></EtButtonSelect>
        </EtCard>

        <EtCard style="margin-top: 16px;">
            <template #header>
                Date pickers
            </template>
            <EtInputDate v-model="selectedDate"></EtInputDate>
            <div style="margin-top: 16px;">
                <EtInputDateRange v-model="selectedDateRange"></EtInputDateRange>
            </div>
            <div style="margin-top: 16px;">
                <EtInputDateRange :size="UI_SIZING.S" v-model="selectedDateRange"></EtInputDateRange>
            </div>
            <div style="margin-top: 16px;">
                <EtInputTime v-model="selectedTime"></EtInputTime>
            </div>
            <div style="margin-top: 16px;">
                <EtInputTime :size="UI_SIZING.S" v-model="selectedTime"></EtInputTime>
            </div>
        </EtCard>

        <EtCard style="margin-top: 16px;">
            <template #header>
                Dynamic Select
            </template>

            <EtDynamicSelect
                :dataGetter="dataGetter"
                :onOptionSelect="onOptionSelect"
            >
                Select Items
            </EtDynamicSelect>
        </EtCard>
    </EtContent>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {UI_SIZING, UI_TYPES} from "../../src/helpers/enums";

import EtContent from "src/layouts/Content.vue";
import EtCard from "src/components/EtCard.vue";

import EtInput from "src/components/etForm/EtInput.vue";
import EtInputGroup from "src/components/etForm/EtInputGroup.vue";
import EtInputGroupAddon from "src/components/etForm/EtInputGroupAddon.vue";

import EtForm from "src/components/etForm/EtForm.vue";
import EtFormGroup from "src/components/etForm/EtFormGroup.vue";
import EtInputDate from "src/components/etForm/EtInputDate.vue";
import EtInputDateRange from "src/components/etForm/EtInputDateRange.vue";
import EtInputSelect from "src/components/etForm/EtInputSelect.vue";
import EtButtonSelect from "src/components/etForm/EtButtonSelect.vue";
import EtTextarea from "src/components/etForm/EtTextarea.vue";
import EtWysiwyg from "src/components/etForm/EtWysiwyg.vue";
import EtInputNumberRange from "src/components/etForm/EtInputNumberRange.vue";
import EtInputFileDrop from "src/components/etForm/EtInputFileDrop.vue";

import EtInputTime from "src/components/etForm/EtInputTime.vue";

import EtAlertDanger from "src/components/etAlert/EtAlertDanger.vue";

import EtCheckboxWithLabel from "src/components/etForm/EtCheckboxWithLabel.vue";

import EtDynamicSelect from "src/components/etForm/EtDynamicSelect.vue";

import {OptionModel} from "../../src/models/Option";
import {wait} from "../../src/helpers/async";
import EtButton from "../../src/components/etButton/EtButton.vue";
import EtButtonDefault from "../../src/components/etButton/EtButtonDefault.vue";
import EtBadge from "src/components/etBadge/EtBadge.vue";
import EtBadgePrimary from "src/components/etBadge/EtBadgePrimary.vue";
import EtInputColorPicker from "src/components/etForm/EtInputColorPicker.vue";

export default defineComponent({
    components: {
        EtInputColorPicker,
        EtBadgePrimary,
        EtBadge,
        EtButtonDefault,
        EtButton,
        EtContent,
        EtCard,
        EtForm,
        EtFormGroup,

        EtInput,
        EtInputGroup,
        EtInputGroupAddon,

        EtCheckboxWithLabel,

        EtInputDate,
        EtInputDateRange,
        EtInputSelect,
        EtButtonSelect,

        EtTextarea,
        EtWysiwyg,
        EtInputNumberRange,
        EtInputFileDrop,

        EtInputTime,
        EtAlertDanger,
        EtDynamicSelect
    },
    data() {
        return {
            selectedDate: new Date(),
            selectedDateRange: [],

            singleSelectedOption: null,
            multipleSelectedOptions: [],
            options: [
                new OptionModel({
                    value: 'test 1',
                    label: 'Test 1'
                }),
                new OptionModel({
                    value: 'test 2',
                    label: 'Test 2'
                }),
                new OptionModel({
                    value: 'test 3',
                    label: 'Test 3'
                }),
                new OptionModel({
                    value: 'test 4',
                    label: 'Test 4'
                }),
                new OptionModel({
                    value: 'test 5',
                    label: 'Test 5'
                }),
                new OptionModel({
                    value: 'test 6',
                    label: 'Test 6',
                    type: UI_TYPES.DANGER
                }),
                new OptionModel({
                    value: 'test 7',
                    label: 'Test 7'
                }),
                new OptionModel({
                    value: 'test 8',
                    label: 'Test 8'
                }),
            ],

            textareaContent: '',
            wysiwygContent: 'Preset test content in here <strong>Bold and strong</strong> <table><tr><th>Header 1</th><th>Header 2</th></tr><tr><td>Content 1</td><td>Content 2</td></tr><tr><td>Content 1</td><td>Content 2</td></tr></table>',
            numberRange: [],

            selectedTime: [13, 22],

            colorPicked: '#000000'
        }
    },
    computed: {
        UI_SIZING() {
            return UI_SIZING
        }
    },
    methods: {
        doSubmit() {
            alert('do Submit');
        },
        onOptionSelect(selectedOption: OptionModel | OptionModel[] | null) {
            console.log('selected Option', selectedOption);
        },
        async dataGetter(searchValue: string) {
            console.log("Handling search 2222!", searchValue);

            await wait(1500);

            return [
                new OptionModel({
                    value: 1,
                    label: "Item one"
                }),
                new OptionModel({
                    value: 2,
                    label: "Item two"
                }),
                new OptionModel({
                    value: 3,
                    label: "Item three"
                }),
                new OptionModel({
                    value: 4,
                    label: "Item four"
                }),
                new OptionModel({
                    value: 5,
                    label: "Item five"
                }),
                new OptionModel({
                    value: 6,
                    label: "Item six"
                }),
                new OptionModel({
                    value: 7,
                    label: "Item seven"
                }),
                new OptionModel({
                    value: 8,
                    label: "Item eight"
                })
            ];
        },
        handleAttachments(files: FileList) {
            console.log(files);
        },
        handleInlineImageUpload(file: File) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            return new Promise((resolve, reject) => {
                reader.onload = function () {
                    console.log(reader.result);
                    resolve(reader.result);
                };
            });
        }
    },
    mounted() {

        // setTimeout(() => {
        //     (this.$refs.wysiwyg as any).focus();
        // }, 2000);

        // this.multipleSelectedOptions = [
        //     this.options.find(opt => opt.value === 'test 2'),
        //     this.options.find(opt => opt.value === 'test 3'),
        //     this.options.find(opt => opt.value === 'test 4'),
        // ];
    }
})

</script>