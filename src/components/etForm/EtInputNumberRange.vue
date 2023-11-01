<template>
    <EtInputGroup class="et-sdk-input-number-range-wrapper" :name="name">
        <EtInput
            :modelValue="firstNumber"
            @change="onFirstChange"
            type="number"
            :autocomplete="autocomplete"
            wrapperClasses="et-sdk-input-number-range--input"
            :name="name + '_1'"
            :disable="disabled"
            :readonly="readonly"
            :required="required"
            :placeholder="placeholder"
            :size="size"
        />
        <EtInputGroupAddon :size="size"> - </EtInputGroupAddon>
        <EtInput
            :modelValue="secondNumber"
            @change="onSecondChange"
            type="number"
            :autocomplete="autocomplete"
            wrapperClasses="et-sdk-input-number-range--input"
            :name="name + '_2'"
            :disable="disabled"
            :readonly="readonly"
            :required="required"
            :placeholder="placeholder"
            :size="size"
        />
    </EtInputGroup>
</template>

<script lang="ts">
import EtInput, { commonInputProps } from "./EtInput.vue";
import EtInputGroup from "./EtInputGroup.vue";
import EtInputGroupAddon from "./EtInputGroupAddon.vue";
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        ...commonInputProps
    },
    components: {
        EtInput,
        EtInputGroup,
        EtInputGroupAddon
    },
    data() {
        return {
            firstNumber: undefined as number | undefined,
            secondNumber: undefined as number | undefined
        };
    },
    watch: {
        firstNumber(value) {
            if (this.secondNumber !== undefined && value > this.secondNumber) {
                this.secondNumber = value;
            }
        },
        secondNumber(value) {
            if (this.firstNumber !== undefined && value < this.firstNumber) {
                this.firstNumber = value;
            }
        }
    },
    methods: {
        fixValue(
            value: string | number | null | undefined
        ): number | undefined {
            if (typeof value === "string") {
                return parseInt(value);
            }

            if ((value && isNaN(value)) || value === null) {
                return undefined;
            }

            return value;
        },
        onFirstChange(value: string | number | null | undefined) {
            this.firstNumber = this.fixValue(value);
        },
        onSecondChange(value: string | number | null | undefined) {
            this.secondNumber = this.fixValue(value);
        }
    }
});
</script>

<style>
.et-sdk-input-number-range--input {
    width: 128px;
}
</style>
