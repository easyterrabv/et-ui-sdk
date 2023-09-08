<template>
    <EtContent>
        <EtCard class="mt-4">
            <template #header>
                Basic inputs
            </template>

            <EtForm @submit="doSubmit">
                <EtFormGroup>
                    <template #label>Simple Input</template>
                    <EtInput/>
                </EtFormGroup>

                <EtFormGroup class="mt-4">
                    <template #label>Password Input</template>
                    <EtInput type="password"/>
                </EtFormGroup>
            </EtForm>

            <EtFormGroup class="mt-4">
                <template #label>Simple Input small size</template>
                <EtInput :size="UI_SIZING.S"/>
            </EtFormGroup>

            <EtFormGroup class="mt-4">
                <template #label>Simple Input size with alert</template>
                <EtInput error />
                <template #after>
                    <EtAlertDanger>Danger</EtAlertDanger>
                </template>
            </EtFormGroup>

            <EtFormGroup class="mt-4">
                <template #label>Simple textarea</template>
                <EtTextarea v-model="textareaContent" placeholder="Type something" />
            </EtFormGroup>

            <EtFormGroup class="mt-4">
                <template #label>WYSIWYG</template>
                <EtWysiwyg v-model="wysiwygContent"></EtWysiwyg>
            </EtFormGroup>

            <EtFormGroup class="mt-4">
                <template #label>Min Max</template>
                <EtInputNumberRange v-model="numberRange"></EtInputNumberRange>
            </EtFormGroup>

            <EtFormGroup class="mt-4">
                <template #label>File Drop Input</template>
                <EtInputFileDrop />
            </EtFormGroup>
        </EtCard>

        <EtCard class="mt-4">
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

            <EtFormGroup class="mt-4">
                <template #label>Simple Input</template>
                <EtInput placeholder="First Input"/>
                <EtInputGroupAddon>
                    With a addon in between
                </EtInputGroupAddon>
                <EtInput placeholder="Second Input"/>
            </EtFormGroup>
        </EtCard>

        <EtCard class="mt-4">
            <template #header>
                Select
            </template>

            <EtInputSelect v-model="multipleSelectedOptions" :options="options" multiple></EtInputSelect>
            <EtButtonSelect v-model="multipleSelectedOptions" :options="options" multiple></EtButtonSelect>
        </EtCard>

        <EtCard class="mt-4" style="height: 800px;">
            <template #header>
                Date pickers
            </template>
            <EtInputDate v-model="selectedDate"></EtInputDate>
            <div class="mt-4">
                <EtInputDateRange v-model="selectedDateRange"></EtInputDateRange>
            </div>
            <div class="mt-4">
                <EtInputDateRange :size="UI_SIZING.S" v-model="selectedDateRange"></EtInputDateRange>
            </div>
            <div class="mt-4">
                <EtInputTime v-model="selectedTime"></EtInputTime>
            </div>
            <div class="mt-4">
                <EtInputTime :size="UI_SIZING.S" v-model="selectedTime"></EtInputTime>
            </div>
        </EtCard>
    </EtContent>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {UI_SIZING, UI_TYPES} from "../../src/enums";

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

import {OptionModel} from "../../src/models/Option";

export default defineComponent({
    components: {
        EtContent,
        EtCard,
        EtForm,
        EtFormGroup,
        EtInput,
        EtInputGroup,
        EtInputGroupAddon,

        EtInputDate,
        EtInputDateRange,
        EtInputSelect,
        EtButtonSelect,

        EtTextarea,
        EtWysiwyg,
        EtInputNumberRange,
        EtInputFileDrop,

        EtInputTime,
        EtAlertDanger
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
            wysiwygContent: 'Preset test content in here <strong>Bold and strong</strong>',
            numberRange: [],

            selectedTime: [13, 22]
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
        }
    },
    mounted() {
        // this.multipleSelectedOptions = [
        //     this.options.find(opt => opt.value === 'test 2'),
        //     this.options.find(opt => opt.value === 'test 3'),
        //     this.options.find(opt => opt.value === 'test 4'),
        // ];
    }
})

</script>