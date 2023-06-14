<template>
    <EtContent>
        <EtCard class="mt-4">
            <template #header>
                Basic inputs
            </template>

            <EtFormGroup>
                <template #label>Simple Input</template>
                <EtInput/>
            </EtFormGroup>

            <EtFormGroup class="mt-4">
                <template #label>Simple Input small size</template>
                <EtInput :size="UI_SIZING.S"/>
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

            <EtInputSelect v-model="singleSelectedOption" :options="options" multiple></EtInputSelect>
        </EtCard>

        <EtCard class="mt-4" style="height: 800px;">
            <template #header>
                Date pickers
            </template>
            <EtInputDate v-model="selectedDate"></EtInputDate>
            <div class="mt-4">
                <EtInputDateRange v-model="selectedDateRange"></EtInputDateRange>
                {{selectedDateRange}}
            </div>
        </EtCard>
    </EtContent>
</template>

<script lang="ts">
import {defineComponent} from "vue-demi";
import {UI_SIZING} from "../../src/enums";

import EtContent from "src/layouts/Content.vue";
import EtCard from "src/components/EtCard.vue";

import EtInput from "src/components/etForm/EtInput.vue";
import EtInputGroup from "src/components/etForm/EtInputGroup.vue";
import EtInputGroupAddon from "src/components/etForm/EtInputGroupAddon.vue";

import EtFormGroup from "src/components/etForm/EtFormGroup.vue";
import EtInputDate from "src/components/etForm/EtInputDate.vue";
import EtInputDateRange from "src/components/etForm/EtInputDateRange.vue";
import EtInputSelect from "src/components/etForm/EtInputSelect.vue";

import EtDatePicker from "src/components/etDatePicker/etDatePicker.vue";

import {OptionModel} from "../../src/models/Option";

export default defineComponent({
    components: {
        EtContent,
        EtCard,
        EtFormGroup,
        EtInput,
        EtInputGroup,
        EtInputGroupAddon,

        EtInputDate,
        EtInputDateRange,
        EtInputSelect,

        EtDatePicker
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
            ],
        }
    },
    computed: {
        UI_SIZING() {
            return UI_SIZING
        }
    },

})

</script>