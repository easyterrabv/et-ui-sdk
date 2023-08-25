<template>
    <div class="flex flex-row gap-1">
        <div v-if="showDate">{{ formattedDate }}</div>
        <div v-if="showTime">{{ formattedTime }}</div>
        <div v-if="showAgo">({{ timeAgo }})</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { dateToFormattedString, timeSince } from "../../helpers/date";

export default defineComponent({
    props: {
        date: {
            required: true,
            type: [Date, String]
        },
        hideDate: {
            required: false,
            type: Boolean
        },
        hideTime: {
            required: false,
            type: Boolean
        },
        hideAgo: {
            required: false,
            type: Boolean
        },
        dateFormatter: {
            required: false,
            type: Function
        },
        timeFormatter: {
            required: false,
            type: Function
        }
    },
    computed: {
        innerDate() {
            if (typeof this.date === "string") {
                return new Date(this.date);
            }
            return this.date;
        },
        showDate(): boolean {
            return !this.hideDate;
        },
        showTime(): boolean {
            return !this.hideTime;
        },
        showAgo(): boolean {
            return !this.hideAgo;
        },
        formattedDate(): string | null {
            if (!this.innerDate) {
                return null;
            }

            if (this.dateFormatter) {
                return this.dateFormatter(this.innerDate);
            }

            return dateToFormattedString(this.innerDate);
        },
        formattedTime(): string | null {
            if (!this.innerDate) {
                return null;
            }

            if (this.timeFormatter) {
                return this.timeFormatter(this.innerDate);
            }

            let hours: string | number = this.innerDate.getHours();
            let minutes: string | number = this.innerDate.getMinutes();

            hours = hours < 10 ? `0${hours}` : String(hours);
            minutes = minutes < 10 ? `0${minutes}` : String(minutes);

            return `${hours}:${minutes}`;
        },
        timeAgo(): string | null {
            if (!this.innerDate) {
                return null;
            }

            const {
                years,
                months,
                weeks,
                days,
                hours,
                minutes,
                seconds,
                inFuture
            } = timeSince(this.innerDate);

            const timeUnits = [
                { unit: "year", value: years },
                { unit: "month", value: months },
                { unit: "week", value: weeks },
                { unit: "day", value: days },
                { unit: "hour", value: hours },
                { unit: "minute", value: minutes },
                { unit: "second", value: seconds }
            ];

            const relevantTimeUnits = timeUnits
                .filter((unit) => unit.value !== 0)
                .sort((a, b) => timeUnits.indexOf(a) - timeUnits.indexOf(b))
                .slice(0, 2);

            const parts = relevantTimeUnits.map(
                (unit) =>
                    `${unit.value} ${
                        unit.value === 1 ? unit.unit : unit.unit + "s"
                    }`
            );

            if (parts.length <= 0) {
                return null;
            }

            if (inFuture) {
                return "in " + parts.join(", ");
            }

            return parts.join(", ") + " ago";
        }
    }
});
</script>
