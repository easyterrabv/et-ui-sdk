<template>
    <EtInputGroup class="mt-4 et-input-number-range" :name="name">
        <EtInput
            :modelValue="firstNumber"
            @change="onFirstChange"
            type="number"
            :autocomplete="autocomplete"
            wrapperClasses="!w-32"
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
            wrapperClasses="!w-32"
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
import { defineComponent } from "vue-demi";

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
            firstNumber: null as Number | null,
            secondNumber: null as Number | null
        };
    },
    watch: {
        firstNumber(value) {
            if (this.secondNumber !== null && value > this.secondNumber) {
                this.secondNumber = value;
            }
        },
        secondNumber(value) {
            if (this.firstNumber !== null && value < this.firstNumber) {
                this.firstNumber = value;
            }
        }
    },
    methods: {
        fixValue(value: string | number | null): number | null {
            if (typeof value === "string") {
                return parseInt(value);
            }

            if (value && isNaN(value)) {
                return null;
            }

            return value;
        },
        onFirstChange(value: string | number | null) {
            this.firstNumber = this.fixValue(value);
        },
        onSecondChange(value: string | number | null) {
            this.secondNumber = this.fixValue(value);
        }
    }
});
</script>
