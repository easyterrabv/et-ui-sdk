const monthMap = {
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
export const monthToNameFull = (month) => {
    const _month = month instanceof Date ? month.getMonth() : String(month);
    return _month in monthMap ? monthMap[_month].full : "Unknown";
};
export const monthToNameShort = (month) => {
    const _month = month instanceof Date ? month.getMonth() : String(month);
    return _month in monthMap ? monthMap[_month].short : "Unknown";
};
export const isToday = (date) => {
    const today = new Date();
    const _date = new Date(date);
    const sameYear = _date.getFullYear() === today.getFullYear();
    const sameMonth = _date.getMonth() === today.getMonth();
    const sameDay = _date.getDate() === today.getDate();
    return sameYear && sameMonth && sameDay;
};
export const parseDate = (input) => {
    if (!input) {
        return null;
    }
    if (input instanceof Date) {
        return input;
    }
    const timestamp = Date.parse(input.toString());
    if (!isNaN(timestamp)) {
        return new Date(timestamp);
    }
    else {
        return null;
    }
};
export const isSameDates = (dateOne, dateTwo) => {
    const epochTimeOne = dateToBase(dateOne).getTime();
    const epochTimeTwo = dateToBase(dateTwo).getTime();
    return epochTimeOne === epochTimeTwo;
};
export const getDatesBetween = (startDate, endDate, interval, inclusive = false) => {
    const dates = [];
    const walkerDate = dateToBase(startDate);
    while (walkerDate < endDate) {
        dates.push(dateToBase(walkerDate));
        // Move to the next interval
        if (interval === "day") {
            walkerDate.setDate(walkerDate.getDate() + 1);
        }
        else if (interval === "month") {
            walkerDate.setMonth(walkerDate.getMonth() + 1);
        }
        else if (interval === "year") {
            walkerDate.setFullYear(walkerDate.getFullYear() + 1);
        }
    }
    if (inclusive) {
        dates.push(dateToBase(walkerDate));
    }
    return dates;
};
export const getYearsBetweenDates = (dateOne, dateTwo, inclusive = false) => {
    return getDatesBetween(dateOne, dateTwo, "year", inclusive);
};
export const getMonthsBetweenDates = (dateOne, dateTwo, inclusive = false) => {
    return getDatesBetween(dateOne, dateTwo, "month", inclusive);
};
export const getDaysBetweenDates = (dateOne, dateTwo, inclusive = false) => {
    return getDatesBetween(dateOne, dateTwo, "day", inclusive);
};
export const dateInBetweenDates = (needle, dateOne, dateTwo) => {
    const needleTime = dateToBase(needle).getTime();
    return (dateToBase(dateOne).getTime() <= needleTime &&
        needleTime <= dateToBase(dateTwo).getTime());
};
export const dateToBase = (date) => {
    // Returns new date with reset time values
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
};
export const dateToYMD = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${year}-${month + 1}-${day}`;
};
export const dateToFormattedString = (date, monthType = "full") => {
    const parsedDate = parseDate(date);
    if (!parsedDate) {
        return 'Unknown Date';
    }
    const year = parsedDate.getFullYear();
    let month;
    if (monthType === "short") {
        month = monthToNameShort(parsedDate.getMonth());
    }
    else {
        month = monthToNameFull(parsedDate.getMonth());
    }
    const day = parsedDate.getDate();
    return `${day} ${month} ${year}`;
};
export const timeSince = (date) => {
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
    const months = Math.floor((timeDifference % millisecondsInYear) / millisecondsInMonth);
    const weeks = Math.floor((timeDifference % millisecondsInMonth) / millisecondsInWeek);
    const days = Math.floor((timeDifference % millisecondsInWeek) / millisecondsInDay);
    const hours = Math.floor((timeDifference % millisecondsInDay) / millisecondsInHour);
    const minutes = Math.floor((timeDifference % millisecondsInHour) / millisecondsInMinute);
    const seconds = Math.floor((timeDifference % millisecondsInMinute) / millisecondsInSecond);
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
