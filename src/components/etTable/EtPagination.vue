<template>
    <EtButtonGroup class="et-pagination">
        <EtButton
            size="s"
            :disabled="innerValue === 1"
            @click="innerValue = innerValue - 1"
        >
            <EtIconChevronLeft title="Previous page" />
        </EtButton>
        <EtButton
            size="s"
            :type="1 === innerValue ? UI_TYPES.PRIMARY : UI_TYPES.DEFAULT"
            @click="innerValue = 1"
        >
            1
        </EtButton>
        <EtButton
            v-for="(v, index) in betweenButtons"
            :key="index"
            size="s"
            :type="v === innerValue ? UI_TYPES.PRIMARY : UI_TYPES.DEFAULT"
            :readonly="v === '...'"
            @click="innerValue = v"
        >
            {{ v }}
        </EtButton>
        <EtButton
            size="s"
            v-if="perPage !== totalRows"
            :type="pages === innerValue ? UI_TYPES.PRIMARY : UI_TYPES.DEFAULT"
            @click="innerValue = pages"
        >
            {{ pages }}
        </EtButton>
        <EtButton
            size="s"
            :disabled="innerValue === pages"
            @click="innerValue = innerValue + 1"
        >
            <EtIconChevronRight title="Next page" />
        </EtButton>
    </EtButtonGroup>
</template>

<script>
import EtButtonGroup from "src/components/etButton/EtButtonGroup.vue";
import EtButton from "src/components/etButton/EtButton.vue";

import EtIconChevronLeft from "src/components/etIcon/EtIconChevronLeft.vue";
import EtIconChevronRight from "src/components/etIcon/EtIconChevronRight.vue";
import { UI_TYPES } from "src/enums";

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
            innerValue: this.modelValue
        };
    },
    computed: {
        innerTotalRows() {
            return parseInt(this.totalRows);
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
    emits: ["update:modelValue"]
};
</script>
