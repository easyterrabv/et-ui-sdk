<template>
    <div
        class="et-sdk-timepicker"
        :tabindex="-1"
        @keyup.esc="(e) => onEscape()"
        @focus="(e) => onFocus()"
        @blur="(e) => onBlur()"
    >
        <div class="et-sdk-timepicker--header">
            <div class="et-sdk-timepicker--header-head">Hours</div>
            <div class="et-sdk-timepicker--header-head">Minutes</div>
        </div>
        <div class="et-sdk-timepicker--content">
            <EtDragScrollBox
                class="et-sdk-timepicker--content-list et-sdk-timepicker--content-list__hour"
                ref="hourOptions"
                @dragStart="setDragging(true)"
                @dragStop="setDragging(false)"
            >
                <div
                    v-for="hourOption in hourOptions"
                    @click="dragging ? '' : (hour = hourOption)"
                    class="et-sdk-timepicker--content-list--option"
                    :class="{
                        'et-sdk-timepicker--content-list--option__selected':
                            hour === hourOption
                    }"
                >
                    {{ hourOption }}
                </div>
            </EtDragScrollBox>
            <EtDragScrollBox
                class="et-sdk-timepicker--content-list"
                ref="minuteOptions"
                @dragStart="setDragging(true)"
                @dragStop="setDragging(false)"
            >
                <div
                    v-for="minuteOption in minuteOptions"
                    @click="dragging ? '' : (minute = minuteOption)"
                    class="et-sdk-timepicker--content-list--option"
                    :class="{
                        'et-sdk-timepicker--content-list--option__selected':
                            minute === minuteOption
                    }"
                >
                    {{ minuteOption }}
                </div>
            </EtDragScrollBox>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EtDragScrollBox from "../etUtilities/EtDragScrollBox.vue";
import { wait } from "../../helpers/async";

export default defineComponent({
    components: {
        EtDragScrollBox
    },
    props: {
        modelValue: {
            type: Array<number>,
            required: false,
            default: ""
        }
    },
    data() {
        return {
            hour: null as number | null,
            minute: null as number | null,

            innerValue: Array<number | null>(2),
            dragging: false
        };
    },
    computed: {
        hourOptions() {
            return [...Array(24).keys()];
        },
        minuteOptions() {
            return [...Array(60).keys()];
        }
    },
    watch: {
        hour() {
            this.innerValue[0] = this.hour;
            this.$emit("interaction");
        },
        minute() {
            this.innerValue[1] = this.minute;
            this.$emit("interaction");
        },
        innerValue: {
            deep: true,
            handler() {
                this.$emit("update:modelValue", this.innerValue);
            }
        },
        modelValue: {
            immediate: true,
            deep: true,
            handler() {
                this.hour = this.modelValue?.[0];
                this.minute = this.modelValue?.[1];
            }
        }
    },
    methods: {
        async setDragging(value: boolean) {
            await wait(50);
            this.dragging = value;
        },
        onEscape() {
            this.$emit("escape");
        },
        onFocus() {
            this.$emit("focus");
        },
        onBlur() {
            this.$emit("blur");
        }
    },
    created() {
        if (!this.modelValue) {
            const now = new Date();
            this.hour = now.getHours();
            this.minute = now.getMinutes();
        }
    },
    mounted() {
        // Magic number. Should be dynamic in the future.
        const optionHeight = 24;
        (this.$refs.hourOptions as any).scrollTo(
            (this.hour || 0) * optionHeight
        );
        (this.$refs.minuteOptions as any).scrollTo(
            (this.minute || 0) * optionHeight
        );
    },
    emits: ["update:modelValue", "interaction", "escape", "focus", "blur"]
});
</script>

<style>
.et-sdk-timepicker {
    display: inline-block;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid var(--et-sdk-dark-200);
    box-shadow: var(--et-sdk-shadow-normal);
    font-weight: var(--et-sdk-font-weight-normal);
    font-size: var(--et-sdk-font-size-normal);
    line-height: 20px;
    color: var(--et-sdk-dark-800);
    background-color: var(--et-sdk-light-0);
}

.et-sdk-timepicker--header {
    display: flex;
    flex-direction: row;
    gap: 16px;
}

.et-sdk-timepicker--header-head {
    width: 50%;
    font-weight: var(--et-sdk-font-weight-semibold);
}

.et-sdk-timepicker--content {
    display: flex;
    flex-direction: row;
    height: 240px;
}

.et-sdk-timepicker--content-list {
    width: 50%;
    overflow: auto;
    scrollbar-width: none;
    cursor: pointer;
}

.et-sdk-timepicker--content-list::-webkit-scrollbar {
    display: none;
}

.et-sdk-timepicker--content-list__hour {
    text-align: right;
}

.et-sdk-timepicker--content-list--option {
    border-radius: 8px;
    padding-left: 8px;
    padding-right: 8px;
}

.et-sdk-timepicker--content-list--option:hover {
    background-color: var(--et-sdk-dark-50);
}

.et-sdk-timepicker--content-list--option__selected {
    background-color: var(--et-sdk-blue-400);
    color: var(--et-sdk-light-0);
}

.et-sdk-timepicker--content-list--option__selected:hover {
    background-color: var(--et-sdk-blue-600);
}
</style>
