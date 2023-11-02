<template>
    <div
        class="et-sdk-datepicker"
        :tabindex="-1"
        @keyup.esc="(e) => onEscape()"
        @focus="(e) => onFocus()"
        @blur="(e) => onBlur()"
    >
        <div class="et-sdk-datepicker--period">
            <div
                class="et-sdk-datepicker--section et-sdk-datepicker--section__clickable"
                @mouseup.left.stop="(e) => prevPageDebounce.debounce(e)"
            >
                <EtIconChevronLeft />
            </div>
            <div
                class="grow et-sdk-datepicker--section et-sdk-datepicker--section__clickable"
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
                    {{ viewingYear }} -
                    <span v-if="viewingMonth">{{
                        monthToNameFull(viewingMonth)
                    }}</span>
                </span>
            </div>
            <div
                class="et-sdk-datepicker--section et-sdk-datepicker--section__clickable"
                @mouseup.left.stop="(e) => nextPageDebounce.debounce(e)"
            >
                <EtIconChevronRight />
            </div>
        </div>
        <div
            class="et-sdk-datepicker--picker-grid"
            :class="{
                'et-sdk-datepicker--picker-grid__decade':
                    viewMode === VIEW_MODES.DECADE,
                'et-sdk-datepicker--picker-grid__year':
                    viewMode === VIEW_MODES.YEAR,
                'et-sdk-datepicker--picker-grid__month':
                    viewMode === VIEW_MODES.MONTH
            }"
        >
            <template v-if="viewMode === VIEW_MODES.MONTH">
                <div
                    v-for="weekDay in ['M', 'T', 'W', 'T', 'F', 'S', 'S']"
                    class="et-sdk-datepicker--section et-sdk-datepicker--section__grayed-out"
                >
                    {{ weekDay }}
                </div>
            </template>
            <div
                v-for="option in viewingOptions"
                @mouseup.left.stop="
                    (e) => pickOptionDebounce.debounce(e, option)
                "
                class="et-sdk-datepicker--section et-sdk-datepicker--section__clickable"
                :class="{
                    'et-sdk-datepicker--section__active':
                        viewMode === VIEW_MODES.MONTH &&
                        isASelectedDate(option),
                    'et-sdk-datepicker--section__range__first':
                        viewMode === VIEW_MODES.MONTH &&
                        multiple &&
                        firstDate &&
                        isSameDates(firstDate, option),
                    'et-sdk-datepicker--section__range__last':
                        viewMode === VIEW_MODES.MONTH &&
                        multiple &&
                        secondDate &&
                        isSameDates(secondDate, option),
                    'et-sdk-datepicker--section__range__in-range hover:!text-white hover:!bg-primary':
                        viewMode === VIEW_MODES.MONTH &&
                        multiple &&
                        firstDate &&
                        secondDate &&
                        dateInBetweenDates(option, firstDate, secondDate),
                    'et-sdk-datepicker--section__today':
                        viewMode === VIEW_MODES.MONTH &&
                        isSameDates(today, option),
                    'et-sdk-datepicker--section__not-same-month':
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Debounce } from "../../helpers/debounce";

import EtIconChevronRight from "../etIcon/EtIconChevronRight.vue";
import EtIconChevronLeft from "../etIcon/EtIconChevronLeft.vue";
import {
    monthToNameFull,
    monthToNameShort,
    isSameDates,
    getYearsBetweenDates,
    getMonthsBetweenDates,
    getDaysBetweenDates,
    dateInBetweenDates
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
            type: [Date, Array<Date | null>],
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

            prevPageDebounce: new Debounce(() => this.prevPage(), 50),
            nextPageDebounce: new Debounce(() => this.nextPage(), 50),
            modeUpDebounce: new Debounce(() => this.modeUp(), 50),
            pickOptionDebounce: new Debounce(
                (...args) => this.pickOption(...args),
                50
            ),

            selectedDates: undefined as Array<Date | undefined> | undefined,

            viewingDate: now as Date | undefined,
            viewMode: VIEW_MODES.MONTH as VIEW_MODES,
            VIEW_MODES
        };
    },
    computed: {
        viewingYear() {
            return this.viewingDate?.getFullYear();
        },
        viewingMonth() {
            return this.viewingDate?.getMonth();
        },
        viewingDayOfMonth() {
            return this.viewingDate?.getDate();
        },
        viewingPeriod(): Date[] {
            const currentYear = this.viewingYear || new Date().getFullYear();
            const currentMonth = this.viewingMonth || new Date().getMonth();

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

            return options;
        },
        emittingData(): Array<Date | undefined> | Date | undefined {
            if (this.multiple) {
                return this.selectedDates;
            }

            if (this.selectedDates && this.selectedDates.length > 0) {
                return this.selectedDates[0];
            }

            return undefined;
        },
        firstDate(): Date | undefined {
            return this.selectedDates && this.selectedDates.length > 0
                ? this.selectedDates[0]
                : undefined;
        },
        secondDate(): Date | undefined {
            return this.selectedDates && this.selectedDates.length > 1
                ? this.selectedDates[1]
                : undefined;
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
        dateInBetweenDates,
        isASelectedDate(date: Date): boolean {
            return !!(
                (this.firstDate && isSameDates(date, this.firstDate)) ||
                (this.secondDate && isSameDates(date, this.secondDate))
            );
        },
        pickOption(e: Event, option: Date) {
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
                            this.$emit("onFirstChange", date);
                            this.setting = "second";
                        } else {
                            if (this.firstDate && date < this.firstDate) {
                                this.selectedDates = [date, this.firstDate];
                            } else {
                                this.selectedDates = [this.firstDate, date];
                            }

                            this.$emit("onSecondChange", date);
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
            const viewingYear = this.viewingYear || new Date().getFullYear();
            const viewingMonth = this.viewingMonth || new Date().getMonth();

            const value = up ? 1 : -1;

            switch (this.viewMode) {
                case VIEW_MODES.DECADE:
                    this.viewingDate = new Date(
                        viewingYear + value * 10,
                        viewingMonth,
                        this.viewingDayOfMonth
                    );
                    break;
                case VIEW_MODES.YEAR:
                    this.viewingDate = new Date(
                        viewingYear + value,
                        viewingMonth,
                        this.viewingDayOfMonth
                    );
                    break;
                case VIEW_MODES.MONTH:
                    this.viewingDate = new Date(
                        viewingYear,
                        viewingMonth + value,
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
        "update:modelValue": (
            modelValue: Array<Date | undefined> | Date | undefined
        ): boolean => true,
        interaction: (): boolean => true,
        dateSelect: (): boolean => true,
        escape: (): boolean => true,
        focus: (): boolean => true,
        blur: (): boolean => true,
        onFirstChange: (value: Date | null): boolean => true,
        onSecondChange: (value: Date | null): boolean => true
    }
});
</script>

<style>
.et-sdk-datepicker {
    display: inline-block;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid var(--et-sdk-dark-200);
    box-shadow: var(--et-sdk-shadow-normal);
    font-weight: var(--et-sdk-font-weight-normal);
    font-size: var(--et-sdk-font-size-normal);
    color: var(--et-sdk-dark-800);
    background-color: var(--et-sdk-light-0);
}

.et-sdk-datepicker--period {
    display: flex;
    flex-direction: row;
}

.et-sdk-datepicker--section {
    padding: 8px;
    border-radius: 8px;
    text-align: center;
    background-color: var(--et-sdk-light-0);
}

.et-sdk-datepicker--section__clickable:hover {
    background-color: var(--et-sdk-dark-100);
}

.et-sdk-datepicker--section__grayed-out,
.et-sdk-datepicker--section__not-same-month {
    color: var(--et-sdk-dark-300);
}

.et-sdk-datepicker--section__active {
    background-color: var(--et-sdk-blue-400);
    color: white;
}

.et-sdk-datepicker--section__active:hover {
    background-color: var(--et-sdk-blue-700);
}

.et-sdk-datepicker--section__clickable {
    cursor: pointer;
}

.et-sdk-datepicker--section__range__in-range {
    border-radius: 0;
    background-color: var(--et-sdk-blue-300);
    color: var(--et-sdk-light-0);
}

.et-sdk-datepicker--section__range__first,
.et-sdk-datepicker--section__range__last {
    background-color: var(--et-sdk-blue-400);
}

.et-sdk-datepicker--section__range__first {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}

.et-sdk-datepicker--section__range__last {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
}

.et-sdk-datepicker--section__today {
    border: 1px solid var(--et-sdk-warning-300);
}

.et-sdk-datepicker--picker-grid {
    display: grid;
}

.et-sdk-datepicker--picker-grid__decade {
    grid-template-columns: repeat(5, minmax(0, 1fr));
}

.et-sdk-datepicker--picker-grid__year {
    grid-template-columns: repeat(6, minmax(0, 1fr));
}

.et-sdk-datepicker--picker-grid__month {
    grid-template-columns: repeat(7, minmax(0, 1fr));
}
</style>
