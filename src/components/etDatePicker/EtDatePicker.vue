<template>
    <div
        class="et-datepicker inline-block shadow bg-white p-4 rounded"
        :tabindex="0"
        @keyup.esc="(e) => onEscape()"
        @focus="(e) => onFocus()"
        @blur="(e) => onBlur()"
    >
        <div class="flex flex-row">
            <div
                class="p-2 hover:bg-default-extra-light rounded-md cursor-pointer"
                @mouseup.left.stop="(e) => prevPageDebounce.debounce(e)"
            >
                <EtIconChevronLeft />
            </div>
            <div
                class="grow text-center p-2 hover:bg-default-extra-light rounded-md cursor-pointer"
                @mouseup.left.stop="(e) => modeUpDebounce.debounce(e)"
            >
                <span v-if="viewMode === VIEW_MODES.DECADE">
                    <span v-if="viewingPeriod[0]">
                        {{ viewingPeriod[0].getFullYear() }}
                    </span>
                    <span v-if="viewingPeriod[0] && viewingPeriod[1]"> - </span>
                    <span v-if="viewingPeriod[1]">
                        {{ viewingPeriod[1].getFullYear() }}
                    </span>
                </span>
                <span v-else-if="viewMode === VIEW_MODES.YEAR">
                    {{ viewingYear }}
                </span>
                <span v-else-if="viewMode === VIEW_MODES.MONTH">
                    {{ viewingYear }} - {{ monthToNameFull(viewingMonth) }}
                </span>
            </div>
            <div
                class="p-2 hover:bg-default-extra-light rounded-md cursor-pointer"
                @mouseup.left.stop="(e) => nextPageDebounce.debounce(e)"
            >
                <EtIconChevronRight />
            </div>
        </div>
        <div
            :class="{
                'mt-4': viewMode !== VIEW_MODES.MONTH
            }"
        >
            <div
                class="grid"
                :class="{
                    'grid-cols-5': viewMode === VIEW_MODES.DECADE,
                    'grid-cols-6': viewMode === VIEW_MODES.YEAR,
                    'grid-cols-7': viewMode === VIEW_MODES.MONTH
                }"
            >
                <template v-if="viewMode === VIEW_MODES.MONTH">
                    <div
                        v-for="weekDay in ['M', 'T', 'W', 'T', 'F', 'S', 'S']"
                        class="p-2 text-center font-light text-text-light text-sm"
                    >
                        {{ weekDay }}
                    </div>
                </template>
                <div
                    v-for="option in viewingOptions"
                    @mouseup.left.stop="
                        (e) => pickOptionDebounce.debounce(e, option)
                    "
                    class="p-2 text-center cursor-pointer hover:bg-default-extra-light rounded-md transition-all ease-in-out duration-150"
                    :class="{
                        'bg-primary-light !text-white hover:!bg-primary':
                            viewMode === VIEW_MODES.MONTH &&
                            isASelectedDate(option),
                        'rounded-l-md':
                            viewMode === VIEW_MODES.MONTH &&
                            multiple &&
                            firstDate &&
                            isSameDates(firstDate, option),
                        'rounded-r-md':
                            viewMode === VIEW_MODES.MONTH &&
                            multiple &&
                            secondDate &&
                            isSameDates(secondDate, option),
                        'bg-primary-extra-light rounded-none hover:!text-white hover:!bg-primary':
                            viewMode === VIEW_MODES.MONTH &&
                            multiple &&
                            firstDate &&
                            secondDate &&
                            dateInbetweenDates(option, firstDate, secondDate),
                        'ring-1 ring-danger-extra-light':
                            viewMode === VIEW_MODES.MONTH &&
                            isSameDates(today, option),
                        'font-light text-text-light':
                            viewMode === VIEW_MODES.MONTH &&
                            option.getMonth() !== viewingDate?.getMonth()
                    }"
                >
                    <span v-if="viewMode === VIEW_MODES.DECADE">
                        {{ option.getFullYear() }}
                    </span>
                    <span v-else-if="viewMode === VIEW_MODES.YEAR">
                        {{ monthToNameShort(option) }}
                    </span>
                    <span v-else-if="viewMode === VIEW_MODES.MONTH">
                        {{ option.getDate() }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import { Debounce } from "../../helpers/debounce";

import EtIconChevronRight from "src/components/etIcon/EtIconChevronRight.vue";
import EtIconChevronLeft from "src/components/etIcon/EtIconChevronLeft.vue";
import {
    monthToNameFull,
    monthToNameShort,
    isSameDates,
    getYearsBetweenDates,
    getMonthsBetweenDates,
    getDaysBetweenDates,
    dateInbetweenDates
} from "../../helpers/date";

const now = new Date();

export enum VIEW_MODES {
    DECADE,
    YEAR,
    MONTH
}

export default defineComponent({
    model: {
        // backwards compatibility with vue2.x
        prop: "modelValue",
        event: "update:modelValue"
    },
    props: {
        modelValue: {
            type: [Date, Array<Date>],
            required: false,
            default: null
        },
        multiple: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    components: {
        EtIconChevronRight,
        EtIconChevronLeft
    },
    data() {
        return {
            today: now,
            setting: "first" as "first" | "second",

            prevPageDebounce: new Debounce(this.prevPage, 50),
            nextPageDebounce: new Debounce(this.nextPage, 50),
            modeUpDebounce: new Debounce(this.modeUp, 50),
            pickOptionDebounce: new Debounce(this.pickOption, 50),

            selectedDates: null as [Date] | [Date | null, Date | null] | null,

            viewingDate: now as Date | null,
            viewMode: VIEW_MODES.MONTH as VIEW_MODES,
            VIEW_MODES
        };
    },
    computed: {
        viewingYear: (vm) => vm.viewingDate?.getFullYear(),
        viewingMonth: (vm) => vm.viewingDate?.getMonth(),
        viewingDayOfMonth: (vm) => vm.viewingDate?.getDate(),
        viewingPeriod(): [Date, Date] {
            const currentYear = this.viewingYear;
            const currentMonth = this.viewingMonth;

            switch (this.viewMode) {
                case VIEW_MODES.DECADE:
                    const currentDecadeStart =
                        Math.floor(currentYear / 10) * 10;
                    const currentDecadeEnd =
                        Math.floor((currentYear + 10) / 10) * 10 - 1;
                    return [
                        new Date(currentDecadeStart, 0, 1),
                        new Date(currentDecadeEnd, 11, 31)
                    ];
                case VIEW_MODES.YEAR:
                    return [
                        new Date(currentYear, 0, 1),
                        new Date(currentYear, 11, 31)
                    ];
                case VIEW_MODES.MONTH:
                    const nextMonth = currentMonth + 1;
                    const nextMonthFirstDay = new Date(
                        currentYear,
                        nextMonth,
                        1
                    );
                    const lastDay = new Date(nextMonthFirstDay.getTime() - 1);

                    return [
                        new Date(currentYear, currentMonth, 1),
                        new Date(currentYear, currentMonth, lastDay.getDate())
                    ];
            }

            return [];
        },
        viewingOptions(): Date[] {
            if (!this.viewingPeriod || this.viewingPeriod.length < 2) {
                return [];
            }

            let options = [];

            const firstOption = this.viewingPeriod[0];
            const secondOption = this.viewingPeriod[1];
            let preFillerCount = 0;

            switch (this.viewMode) {
                case VIEW_MODES.DECADE:
                    options = getYearsBetweenDates(firstOption, secondOption);
                    break;
                case VIEW_MODES.YEAR:
                    options = getMonthsBetweenDates(firstOption, secondOption);
                    break;
                case VIEW_MODES.MONTH:
                    options = getDaysBetweenDates(firstOption, secondOption);
                    const dayOfWeek = firstOption.getDay();
                    preFillerCount = dayOfWeek - 1;
                    if (preFillerCount === -1) {
                        // Edge case when month starts on sunday
                        preFillerCount = 6;
                    }
                    break;
            }

            if (this.viewMode === VIEW_MODES.MONTH) {
                const preFillers = [];
                for (let pr = 0; pr < preFillerCount; pr++) {
                    preFillers.push(
                        new Date(
                            firstOption.getFullYear(),
                            firstOption.getMonth(),
                            firstOption.getDate() - (1 + pr)
                        )
                    );
                }

                options = [...preFillers.reverse(), ...options];

                const lastDate = options[options.length - 1];
                const postFillers = [];
                for (let po = 0; po < 7 - (options.length % 7); po++) {
                    postFillers.push(
                        new Date(
                            lastDate.getFullYear(),
                            lastDate.getMonth(),
                            lastDate.getDate() + (1 + po)
                        )
                    );
                }

                options = [...options, ...postFillers];
            }

            // if (this.viewMode === VIEW_MODES.MONTH) {
            //     const postFillers = [];
            //     for (let p = 0; p < 7 - (options.length % 7); p++) {
            //         postFillers.push("+" + (p + 1));
            //     }
            //
            //     options = [...options, ...postFillers];
            // }

            return options;
        },
        emittingData() {
            if (this.multiple) {
                return this.selectedDates;
            }

            if (this.selectedDates && this.selectedDates.length > 0) {
                return this.selectedDates[0];
            }

            return null;
        },
        firstDate(): Date | null {
            return this.selectedDates && this.selectedDates.length > 0
                ? this.selectedDates[0]
                : null;
        },
        secondDate(): Date | null {
            return this.selectedDates && this.selectedDates.length > 1
                ? this.selectedDates[1]
                : null;
        }
    },
    watch: {
        selectedDates: {
            deep: true,
            handler() {
                this.$emit("update:modelValue", this.emittingData);
            }
        },
        modelValue: {
            immediate: true,
            handler(modelValue) {
                let arrayData = modelValue;
                if (modelValue && !Array.isArray(modelValue)) {
                    arrayData = [modelValue];
                }

                this.selectedDates = arrayData;
                this.viewingDate = this.firstDate || now;
                this.viewMode = VIEW_MODES.MONTH;
            }
        }
    },
    methods: {
        isSameDates,
        monthToNameShort,
        monthToNameFull,
        dateInbetweenDates,
        isASelectedDate(date: Date): boolean {
            return !!(
                (this.firstDate && isSameDates(date, this.firstDate)) ||
                (this.secondDate && isSameDates(date, this.secondDate))
            );
        },
        pickOption(e, option) {
            switch (this.viewMode) {
                case VIEW_MODES.DECADE:
                case VIEW_MODES.YEAR:
                    this.viewingDate = new Date(option);
                    break;
                case VIEW_MODES.MONTH:
                    const date = new Date(option);

                    if (this.multiple) {
                        if (this.setting === "first") {
                            this.selectedDates = [date, date];
                            this.setting = "second";
                        } else {
                            this.selectedDates = [this.firstDate, date];
                            this.setting = "first";
                        }
                    } else {
                        this.selectedDates = [date];
                    }

                    this.viewingDate = date;

                    this.$emit("dateSelect");

                    break;
            }

            this.modeDown();
        },
        modeUp() {
            switch (this.viewMode) {
                case VIEW_MODES.DECADE:
                    break;
                case VIEW_MODES.YEAR:
                    this.viewMode = VIEW_MODES.DECADE;
                    break;
                case VIEW_MODES.MONTH:
                    this.viewMode = VIEW_MODES.YEAR;
                    break;
            }

            this.$emit("interaction");
        },
        modeDown() {
            switch (this.viewMode) {
                case VIEW_MODES.DECADE:
                    this.viewMode = VIEW_MODES.YEAR;
                    break;
                case VIEW_MODES.YEAR:
                    this.viewMode = VIEW_MODES.MONTH;
                    break;
                case VIEW_MODES.MONTH:
                    break;
            }

            this.$emit("interaction");
        },
        prevPage() {
            this.switchPage(false);
        },
        nextPage() {
            this.switchPage(true);
        },
        switchPage(up = false) {
            const value = up ? 1 : -1;

            switch (this.viewMode) {
                case VIEW_MODES.DECADE:
                    this.viewingDate = new Date(
                        this.viewingYear + value * 10,
                        this.viewingMonth,
                        this.viewingDayOfMonth
                    );
                    break;
                case VIEW_MODES.YEAR:
                    this.viewingDate = new Date(
                        this.viewingYear + value,
                        this.viewingMonth,
                        this.viewingDayOfMonth
                    );
                    break;
                case VIEW_MODES.MONTH:
                    this.viewingDate = new Date(
                        this.viewingYear,
                        this.viewingMonth + value,
                        this.viewingDayOfMonth
                    );
                    break;
            }

            this.$emit("interaction");
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
    emits: {
        // will trigger and usually only update the v-model value
        "update:modelValue": (modelValue: Date): boolean =>
            typeof modelValue === typeof Date,
        interaction: (): boolean => true,
        dateSelect: (value): boolean => true,
        escape: (): boolean => true,
        focus: (): boolean => true,
        blur: (): boolean => true
    }
});
</script>
