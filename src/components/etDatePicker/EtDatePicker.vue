<template>
    <div
        class="et-datepicker inline-block shadow bg-white p-4 rounded"
        v-if="selectedDate"
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
                <span v-if="viewMode === VIEW_MODES.YEAR">
                    {{ viewingYear }}
                </span>
                <span v-if="viewMode === VIEW_MODES.MONTH">
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
                            selectedDate.getFullYear() === viewingYear &&
                            selectedDate.getMonth() === viewingMonth &&
                            String(selectedDate.getDate()) === String(option),
                        'ring-1 ring-danger-extra-light':
                            viewMode === VIEW_MODES.MONTH &&
                            today.getFullYear() === viewingYear &&
                            today.getMonth() === viewingMonth &&
                            String(today.getDate()) === String(option),
                        'font-light text-text-light':
                            String(option).startsWith('-') ||
                            String(option).startsWith('+')
                    }"
                >
                    <span v-if="viewMode === VIEW_MODES.YEAR">
                        {{ monthToNameShort(option) }}
                    </span>
                    <span v-else>
                        {{ String(option).replace("-", "").replace("+", "") }}
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
import { monthToNameFull, monthToNameShort } from "../../helpers/date";

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
            type: Date,
            required: false,
            default: null
        }
    },
    components: {
        EtIconChevronRight,
        EtIconChevronLeft
    },
    data() {
        return {
            today: now,

            prevPageDebounce: new Debounce(this.prevPage, 50),
            nextPageDebounce: new Debounce(this.nextPage, 50),
            modeUpDebounce: new Debounce(this.modeUp, 50),
            pickOptionDebounce: new Debounce(this.pickOption, 50),

            selectedDate: null as Date | null,

            viewingDate: now as Date,
            viewMode: VIEW_MODES.MONTH as VIEW_MODES,
            VIEW_MODES
        };
    },
    computed: {
        viewingYear: (vm) => vm.viewingDate.getFullYear(),
        viewingMonth: (vm) => vm.viewingDate.getMonth(),
        viewingDayOfMonth: (vm) => vm.viewingDate.getDate(),
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
        viewingOptions(): String[] {
            if (!this.viewingPeriod || this.viewingPeriod.length < 2) {
                return [];
            }

            let options = [];

            const firstOption = this.viewingPeriod[0];
            const secondOption = this.viewingPeriod[1];

            let preFillerCount = 0;
            let startNumber;
            let endNumber;

            switch (this.viewMode) {
                case VIEW_MODES.DECADE:
                    startNumber = firstOption.getFullYear();
                    endNumber = secondOption.getFullYear();
                    break;
                case VIEW_MODES.YEAR:
                    startNumber = firstOption.getMonth();
                    endNumber = secondOption.getMonth();
                    break;
                case VIEW_MODES.MONTH:
                    startNumber = firstOption.getDate();
                    endNumber = secondOption.getDate();
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
                for (let p = 0; p < preFillerCount; p++) {
                    const lastDateOfPreviousMonth = new Date(
                        firstOption.getFullYear(),
                        firstOption.getMonth(),
                        firstOption.getDate() - 1
                    );
                    preFillers.push(
                        "-" + (lastDateOfPreviousMonth.getDate() - p)
                    );
                }

                options = [...preFillers.reverse(), ...options];
            }

            for (let i = startNumber; i < endNumber + 1; i++) {
                options.push(i);
            }

            if (this.viewMode === VIEW_MODES.MONTH) {
                const postFillers = [];
                for (let p = 0; p < 7 - (options.length % 7); p++) {
                    postFillers.push("+" + (p + 1));
                }

                options = [...options, ...postFillers];
            }

            return options;
        }
    },
    watch: {
        selectedDate: {
            handler() {
                this.$emit("update:modelValue", this.selectedDate);
            }
        },
        modelValue: {
            immediate: true,
            handler(modelValue) {
                this.selectedDate = modelValue;
                this.viewingDate = modelValue;
                this.viewMode = VIEW_MODES.MONTH;
            }
        }
    },
    methods: {
        monthToNameShort,
        monthToNameFull,
        pickOption(e, option) {
            let currentYear = this.selectedDate.getFullYear();
            let currentMonth = this.selectedDate.getMonth();
            let currentDate = this.selectedDate.getDate();

            switch (this.viewMode) {
                case VIEW_MODES.DECADE:
                    this.viewingDate = new Date(
                        option,
                        this.viewingMonth,
                        this.viewingDayOfMonth
                    );
                    break;
                case VIEW_MODES.YEAR:
                    this.viewingDate = new Date(
                        this.viewingYear,
                        option,
                        this.viewingDayOfMonth
                    );
                    break;
                case VIEW_MODES.MONTH:
                    const isPrev = String(option).startsWith("-");
                    const isNext = String(option).startsWith("+");
                    currentDate = parseInt(
                        String(option).replace("-", "").replace("+", "")
                    );
                    if (isPrev) {
                        currentMonth -= 1;
                        if (currentMonth < 0) {
                            currentYear -= 1;
                            currentMonth = 11;
                        }
                    } else if (isNext) {
                        currentMonth += 1;
                        if (currentMonth > 11) {
                            currentYear += 1;
                            currentMonth = 0;
                        }
                    } else {
                        currentYear = this.viewingYear;
                        currentMonth = this.viewingMonth;
                    }

                    this.selectedDate = new Date(
                        currentYear,
                        currentMonth,
                        currentDate
                    );
                    this.viewingDate = this.selectedDate;

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
        }
    },
    emits: {
        // will trigger and usually only update the v-model value
        "update:modelValue": (modelValue: Date): boolean =>
            typeof modelValue === typeof Date
    }
});
</script>
