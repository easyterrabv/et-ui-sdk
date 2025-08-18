import { addLeadingZero } from "./misc";

const monthMap: { [key: string]: { full: string; short: string } } = {
    "0": {
        full: "January",
        short: "Jan"
    },
    "1": {
        full: "February",
        short: "Feb"
    },
    "2": {
        full: "March",
        short: "Mar"
    },
    "3": {
        full: "April",
        short: "Apr"
    },
    "4": {
        full: "May",
        short: "May"
    },
    "5": {
        full: "June",
        short: "Jun"
    },
    "6": {
        full: "July",
        short: "Jul"
    },
    "7": {
        full: "August",
        short: "Aug"
    },
    "8": {
        full: "September",
        short: "Sep"
    },
    "9": {
        full: "October",
        short: "Oct"
    },
    "10": {
        full: "November",
        short: "Nov"
    },
    "11": {
        full: "December",
        short: "Dec"
    }
};

const weekDayMap: { [key: string]: { full: string; short: string } } = {
    "0": {
        full: "Sunday",
        short: "Sun"
    },
    "1": {
        full: "Monday",
        short: "Mon"
    },
    "2": {
        full: "Tuesday",
        short: "Tue"
    },
    "3": {
        full: "Wednesday",
        short: "Wed"
    },
    "4": {
        full: "Thursday",
        short: "Thu"
    },
    "5": {
        full: "Friday",
        short: "Fri"
    },
    "6": {
        full: "Saturday",
        short: "Sat"
    }
};

export const monthToNameFull = (month: string | number | Date): string => {
    const _month = month instanceof Date ? month.getMonth() : String(month);
    return monthMap[_month]?.full ?? "Unknown";
};

export const monthToNameShort = (month: string | number | Date): string => {
    const _month = month instanceof Date ? month.getMonth() : String(month);
    return monthMap[_month]?.short ?? "Unknown";
};

export const weekDayToNameFull = (weekDay: number | Date): string => {
    if (weekDay instanceof Date) {
        weekDay = weekDay.getDay();
    }

    if (weekDay < 0) {
        weekDay = 0;
    }

    if (weekDay > 6) {
        weekDay %= 7;
    }

    const _weekday = String(weekDay);
    return weekDayMap[_weekday]?.full ?? "Unknown";
};

export const weekDayToNameShort = (weekDay: number | Date): string => {
    if (weekDay instanceof Date) {
        weekDay = weekDay.getDay();
    }

    if (weekDay < 0) {
        weekDay = 0;
    }

    if (weekDay > 6) {
        weekDay %= 7;
    }

    const _weekday = String(weekDay);
    return weekDayMap[_weekday]?.short ?? "Unknown";
};

export const isToday = (date: string | Date): boolean => {
    const today = new Date();
    const _date = new Date(date);
    const sameYear = _date.getFullYear() === today.getFullYear();
    const sameMonth = _date.getMonth() === today.getMonth();
    const sameDay = _date.getDate() === today.getDate();
    return sameYear && sameMonth && sameDay;
};

export const parseDate = (
    input: string | number | Date | null
): Date | null => {
    if (!input) {
        return null;
    }

    if (input instanceof Date) {
        return input;
    }

    const timestamp = Date.parse(input.toString());
    if (!isNaN(timestamp)) {
        return new Date(timestamp);
    } else {
        return null;
    }
};

export const isSameDates = (dateOne: Date, dateTwo: Date): boolean => {
    const epochTimeOne = dateToBase(dateOne).getTime();
    const epochTimeTwo = dateToBase(dateTwo).getTime();
    return epochTimeOne === epochTimeTwo;
};

export const getDatesBetween = (
    startDate: Date,
    endDate: Date,
    interval: "day" | "month" | "year",
    inclusive = false
): Date[] => {
    const dates: Date[] = [];
    const walkerDate = dateToBase(startDate);

    while (walkerDate < endDate) {
        dates.push(dateToBase(walkerDate));

        // Move to the next interval
        if (interval === "day") {
            walkerDate.setDate(walkerDate.getDate() + 1);
        } else if (interval === "month") {
            walkerDate.setMonth(walkerDate.getMonth() + 1);
        } else if (interval === "year") {
            walkerDate.setFullYear(walkerDate.getFullYear() + 1);
        }
    }

    if (inclusive) {
        dates.push(dateToBase(walkerDate));
    }

    return dates;
};

export const getYearsBetweenDates = (
    dateOne: Date,
    dateTwo: Date,
    inclusive = false
): Date[] => {
    return getDatesBetween(dateOne, dateTwo, "year", inclusive);
};

export const getMonthsBetweenDates = (
    dateOne: Date,
    dateTwo: Date,
    inclusive = false
): Date[] => {
    return getDatesBetween(dateOne, dateTwo, "month", inclusive);
};

export const getDaysBetweenDates = (
    dateOne: Date,
    dateTwo: Date,
    inclusive = false
): Date[] => {
    return getDatesBetween(dateOne, dateTwo, "day", inclusive);
};

export const dateInBetweenDates = (
    needle: Date,
    dateOne: Date,
    dateTwo: Date
): boolean => {
    const needleTime = dateToBase(needle).getTime();
    return (
        dateToBase(dateOne).getTime() <= needleTime &&
        needleTime <= dateToBase(dateTwo).getTime()
    );
};

export const dateToBase = (date: Date): Date => {
    // Returns new date with reset time values
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0,
        0
    );
};

export const dateToYMD = (
    date: Date | string | number,
    pad: boolean = false
): string => {
    let _date: Date;
    if (typeof date === "string" || typeof date === "number") {
        _date = new Date(date);
    } else {
        _date = date;
    }

    const year = _date.getFullYear();

    let month: string | number = _date.getMonth() + 1;
    if (pad && month < 10) {
        month = `0${month}`;
    }

    let day: string | number = _date.getDate();
    if (pad && day < 10) {
        day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
};

export const dateToFormattedString = (
    date: Date | string,
    monthType: "short" | "full" = "full"
): string => {
    const parsedDate = parseDate(date);

    if (!parsedDate) {
        return "Unknown Date";
    }

    const year = parsedDate.getFullYear();
    let month;
    if (monthType === "short") {
        month = monthToNameShort(parsedDate.getMonth());
    } else {
        month = monthToNameFull(parsedDate.getMonth());
    }

    const day = parsedDate.getDate();
    return `${day} ${month} ${year}`;
};

export const timeSince = (
    date: Date
): {
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    inFuture: boolean;
} => {
    const currentDate = new Date();
    let timeDifference = currentDate.getTime() - date.getTime();
    const inFuture = timeDifference < 0;
    timeDifference = Math.abs(timeDifference);

    const millisecondsInSecond = 1000;
    const millisecondsInMinute = millisecondsInSecond * 60;
    const millisecondsInHour = millisecondsInMinute * 60;
    const millisecondsInDay = millisecondsInHour * 24;
    const millisecondsInWeek = millisecondsInDay * 7;
    const millisecondsInMonth = millisecondsInDay * 30.44; // Average month length
    const millisecondsInYear = millisecondsInDay * 365.25; // Average year length

    const years = Math.floor(timeDifference / millisecondsInYear);
    const months = Math.floor(
        (timeDifference % millisecondsInYear) / millisecondsInMonth
    );
    const weeks = Math.floor(
        (timeDifference % millisecondsInMonth) / millisecondsInWeek
    );
    const days = Math.floor(
        (timeDifference % millisecondsInWeek) / millisecondsInDay
    );
    const hours = Math.floor(
        (timeDifference % millisecondsInDay) / millisecondsInHour
    );
    const minutes = Math.floor(
        (timeDifference % millisecondsInHour) / millisecondsInMinute
    );
    const seconds = Math.floor(
        (timeDifference % millisecondsInMinute) / millisecondsInSecond
    );

    return {
        years,
        months,
        weeks,
        days,
        hours,
        minutes,
        seconds,
        inFuture
    };
};

export const getNextDayOfWeek = (date: Date, dayOfWeek: number) => {
    if (dayOfWeek < 0) {
        dayOfWeek = 0;
    }

    if (dayOfWeek > 6) {
        dayOfWeek %= 7;
    }

    return new Date(
        new Date(date.getTime()).setDate(
            date.getDate() + ((7 + dayOfWeek - date.getDay()) % 7)
        )
    );
};

export const dateToCSEFormat = (date: Date): string => {
    const year = date.getFullYear();
    const month = addLeadingZero(date.getMonth() + 1);
    const day = addLeadingZero(date.getDate());
    const hours = addLeadingZero(date.getHours());
    const minutes = addLeadingZero(date.getMinutes());
    const seconds = addLeadingZero(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export function formatDateTime(date: number | string | Date) {
    return new Intl.DateTimeFormat([...navigator.languages, "en-US"], {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(new Date(date));
}

export function calculateAge(
    birthdate: Date | string | number,
    calculateAt: Date | string | number = new Date()
): number {
    let _birthdate: Date;
    if (typeof birthdate === "string" || typeof birthdate === "number") {
        _birthdate = new Date(birthdate);
    } else {
        _birthdate = birthdate;
    }

    let _calculateAt: Date;
    if (typeof calculateAt === "string" || typeof calculateAt === "number") {
        _calculateAt = new Date(calculateAt);
    } else {
        _calculateAt = calculateAt;
    }

    const birthYear = _birthdate.getFullYear();
    const birthMonth = _birthdate.getMonth();
    const birthDay = _birthdate.getDate();

    const calculateYear = _calculateAt.getFullYear();
    const calculateMonth = _calculateAt.getMonth();
    const calculateDay = _calculateAt.getDate();

    let age = calculateYear - birthYear;

    // If the current month is before the birth month or if it's the same month but the day is before the birth day,
    // then the person hasn't had their birthday yet this year.
    if (
        calculateMonth < birthMonth ||
        (calculateMonth === birthMonth && calculateDay < birthDay)
    ) {
        age--;
    }

    return age;
}
