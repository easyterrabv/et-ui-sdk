<template>
    <EtButtonGroup class="et-sdk-pagination">
        <EtButton
            :size="UI_SIZING.XS"
            :disabled="innerValue === 1"
            @click="setInnerValue(innerValue - 1)"
        >
            <EtIconChevronLeft title="Previous page" />
        </EtButton>
        <EtButton
            :size="UI_SIZING.XS"
            :type="1 === innerValue ? UI_TYPES.PRIMARY : UI_TYPES.DEFAULT"
            @click="setInnerValue(1)"
        >
            1
        </EtButton>
        <EtButton
            v-for="(v, index) in betweenButtons"
            :key="index"
            :size="UI_SIZING.XS"
            :type="v === innerValue ? UI_TYPES.PRIMARY : UI_TYPES.DEFAULT"
            :readonly="v === '...'"
            @click="setInnerValue(v)"
        >
            {{ v }}
        </EtButton>
        <EtButton
            :size="UI_SIZING.XS"
            v-if="perPage !== totalRows"
            :type="pages === innerValue ? UI_TYPES.PRIMARY : UI_TYPES.DEFAULT"
            @click="setInnerValue(pages)"
        >
            {{ pages }}
        </EtButton>
        <EtButton
            ::size="UI_SIZING.XS"
            :disabled="innerValue === pages"
            @click="setInnerValue(innerValue + 1)"
        >
            <EtIconChevronRight title="Next page" />
        </EtButton>
    </EtButtonGroup>
</template>

<script lang="ts">
import EtButtonGroup from "../etButton/EtButtonGroup.vue";
import EtButton from "../etButton/EtButton.vue";

import EtIconChevronLeft from "../etIcon/EtIconChevronLeft.vue";
import EtIconChevronRight from "../etIcon/EtIconChevronRight.vue";
import { UI_TYPES, UI_SIZING } from "../../helpers/enums";

export default {
    components: {
        EtButtonGroup,
        EtButton,
        EtIconChevronLeft,
        EtIconChevronRight
    },
    props: {
        modelValue: {
            type: Number,
            default: 1
        },
        perPage: {
            type: Number,
            required: true
        },
        totalRows: {
            type: [Number, String],
            required: true
        }
    },
    data() {
        return {
            UI_TYPES,
            UI_SIZING,
            innerValue: this.modelValue
        };
    },
    computed: {
        innerTotalRows() {
            return typeof this.totalRows === "string"
                ? parseInt(this.totalRows)
                : this.totalRows;
        },
        pages() {
            return Math.ceil(this.innerTotalRows / this.perPage);
        },
        betweenButtons() {
            let list = [];

            if (this.perPage === this.totalRows) {
                return [];
            }

            if (this.innerValue < 5) {
                [2, 3, 4, 5].forEach((step) => {
                    if (step < this.pages) {
                        list.push(step);
                    }
                });

                if (this.pages > 5) {
                    list.push("...");
                }
            } else if (this.innerValue > this.pages - 4) {
                if (this.pages - 5 > 1) {
                    list.push("...");
                }

                [
                    this.pages - 4,
                    this.pages - 3,
                    this.pages - 2,
                    this.pages - 1
                ].forEach((step) => {
                    if (step > 1) {
                        list.push(step);
                    }
                });
            } else {
                list = [
                    "...",
                    this.innerValue - 1,
                    this.innerValue,
                    this.innerValue + 1,
                    "..."
                ];
            }

            return list;
        }
    },
    watch: {
        modelValue: {
            immediate: true,
            handler() {
                this.innerValue = this.modelValue;
            }
        },
        innerValue() {
            if (this.innerValue < 1) {
                this.innerValue = 1;
            }

            if (this.innerValue > this.pages) {
                this.innerValue = this.pages;
            }

            this.$emit("update:modelValue", this.innerValue);
        }
    },
    methods: {
        setInnerValue(value: number | string) {
            let newValue = value;
            if (typeof newValue === "string") {
                newValue = parseInt(newValue);
                if (isNaN(newValue)) {
                    newValue = 1;
                }
            }

            this.innerValue = newValue;
        }
    },
    emits: ["update:modelValue"]
};
</script>
