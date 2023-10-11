<template>
    <div
        class="et-timepicker inline-block shadow bg-white p-4 rounded"
        :tabindex="-1"
        @keyup.esc="(e) => onEscape()"
        @focus="(e) => onFocus()"
        @blur="(e) => onBlur()"
    >
        <div class="flex flex-row gap-4">
            <div class="et-timepicker-hour-list w-1/2 font-semibold">Hours</div>
            <div class="et-timepicker-minute-list w-1/2 font-semibold">
                Minutes
            </div>
        </div>
        <div class="flex flex-row h-60">
            <EtDragScrollBox
                class="et-timepicker-hour-list text-right w-1/2 overflow-auto scrollbar-none cursor-pointer"
                ref="hourOptions"
                @dragStart="setDragging(true)"
                @dragStop="setDragging(false)"
            >
                <div
                    v-for="hourOption in hourOptions"
                    @click="dragging ? '' : (hour = hourOption)"
                    class="cursor-pointer hover:bg-default-extra-light rounded-md transition-all ease-in-out duration-150 px-2"
                    :class="{
                        'selected bg-primary-light !text-white hover:!bg-primary':
                            hour === hourOption
                    }"
                >
                    {{ hourOption }}
                </div>
            </EtDragScrollBox>
            <EtDragScrollBox
                class="et-timepicker-minute-list w-1/2 overflow-auto scrollbar-none"
                ref="minuteOptions"
                @dragStart="setDragging(true)"
                @dragStop="setDragging(false)"
            >
                <div
                    v-for="minuteOption in minuteOptions"
                    @click="dragging ? '' : (minute = minuteOption)"
                    class="cursor-pointer hover:bg-default-extra-light rounded-md transition-all ease-in-out duration-150 px-2"
                    :class="{
                        'selected bg-primary-light !text-white hover:!bg-primary':
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
