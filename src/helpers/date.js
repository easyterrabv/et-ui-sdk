"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateTime = exports.dateToCSEFormat = exports.getNextDayOfWeek = exports.timeSince = exports.dateToFormattedString = exports.dateToYMD = exports.dateToBase = exports.dateInBetweenDates = exports.getDaysBetweenDates = exports.getMonthsBetweenDates = exports.getYearsBetweenDates = exports.getDatesBetween = exports.isSameDates = exports.parseDate = exports.isToday = exports.weekDayToNameShort = exports.weekDayToNameFull = exports.monthToNameShort = exports.monthToNameFull = void 0;
var misc_1 = require("./misc");
var monthMap = {
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
var weekDayMap = {
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
var monthToNameFull = function (month) {
    var _month = month instanceof Date ? month.getMonth() : String(month);
    return _month in monthMap ? monthMap[_month].full : "Unknown";
};
exports.monthToNameFull = monthToNameFull;
var monthToNameShort = function (month) {
    var _month = month instanceof Date ? month.getMonth() : String(month);
    return _month in monthMap ? monthMap[_month].short : "Unknown";
};
exports.monthToNameShort = monthToNameShort;
var weekDayToNameFull = function (weekDay) {
    if (weekDay instanceof Date) {
        weekDay = weekDay.getDay();
    }
    if (weekDay < 0) {
        weekDay = 0;
    }
    if (weekDay > 6) {
        weekDay %= 7;
    }
    var _weekday = String(weekDay);
    return _weekday in weekDayMap ? weekDayMap[_weekday].full : "Unknown";
};
exports.weekDayToNameFull = weekDayToNameFull;
var weekDayToNameShort = function (weekDay) {
    if (weekDay instanceof Date) {
        weekDay = weekDay.getDay();
    }
    if (weekDay < 0) {
        weekDay = 0;
    }
    if (weekDay > 6) {
        weekDay %= 7;
    }
    var _weekday = String(weekDay);
    return _weekday in weekDayMap ? weekDayMap[_weekday].short : "Unknown";
};
exports.weekDayToNameShort = weekDayToNameShort;
var isToday = function (date) {
    var today = new Date();
    var _date = new Date(date);
    var sameYear = _date.getFullYear() === today.getFullYear();
    var sameMonth = _date.getMonth() === today.getMonth();
    var sameDay = _date.getDate() === today.getDate();
    return sameYear && sameMonth && sameDay;
};
exports.isToday = isToday;
var parseDate = function (input) {
    if (!input) {
        return null;
    }
    if (input instanceof Date) {
        return input;
    }
    var timestamp = Date.parse(input.toString());
    if (!isNaN(timestamp)) {
        return new Date(timestamp);
    }
    else {
        return null;
    }
};
exports.parseDate = parseDate;
var isSameDates = function (dateOne, dateTwo) {
    var epochTimeOne = (0, exports.dateToBase)(dateOne).getTime();
    var epochTimeTwo = (0, exports.dateToBase)(dateTwo).getTime();
    return epochTimeOne === epochTimeTwo;
};
exports.isSameDates = isSameDates;
var getDatesBetween = function (startDate, endDate, interval, inclusive) {
    if (inclusive === void 0) { inclusive = false; }
    var dates = [];
    var walkerDate = (0, exports.dateToBase)(startDate);
    while (walkerDate < endDate) {
        dates.push((0, exports.dateToBase)(walkerDate));
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
        dates.push((0, exports.dateToBase)(walkerDate));
    }
    return dates;
};
exports.getDatesBetween = getDatesBetween;
var getYearsBetweenDates = function (dateOne, dateTwo, inclusive) {
    if (inclusive === void 0) { inclusive = false; }
    return (0, exports.getDatesBetween)(dateOne, dateTwo, "year", inclusive);
};
exports.getYearsBetweenDates = getYearsBetweenDates;
var getMonthsBetweenDates = function (dateOne, dateTwo, inclusive) {
    if (inclusive === void 0) { inclusive = false; }
    return (0, exports.getDatesBetween)(dateOne, dateTwo, "month", inclusive);
};
exports.getMonthsBetweenDates = getMonthsBetweenDates;
var getDaysBetweenDates = function (dateOne, dateTwo, inclusive) {
    if (inclusive === void 0) { inclusive = false; }
    return (0, exports.getDatesBetween)(dateOne, dateTwo, "day", inclusive);
};
exports.getDaysBetweenDates = getDaysBetweenDates;
var dateInBetweenDates = function (needle, dateOne, dateTwo) {
    var needleTime = (0, exports.dateToBase)(needle).getTime();
    return ((0, exports.dateToBase)(dateOne).getTime() <= needleTime &&
        needleTime <= (0, exports.dateToBase)(dateTwo).getTime());
};
exports.dateInBetweenDates = dateInBetweenDates;
var dateToBase = function (date) {
    // Returns new date with reset time values
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
};
exports.dateToBase = dateToBase;
var dateToYMD = function (date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    return "".concat(year, "-").concat(month + 1, "-").concat(day);
};
exports.dateToYMD = dateToYMD;
var dateToFormattedString = function (date, monthType) {
    if (monthType === void 0) { monthType = "full"; }
    var parsedDate = (0, exports.parseDate)(date);
    if (!parsedDate) {
        return "Unknown Date";
    }
    var year = parsedDate.getFullYear();
    var month;
    if (monthType === "short") {
        month = (0, exports.monthToNameShort)(parsedDate.getMonth());
    }
    else {
        month = (0, exports.monthToNameFull)(parsedDate.getMonth());
    }
    var day = parsedDate.getDate();
    return "".concat(day, " ").concat(month, " ").concat(year);
};
exports.dateToFormattedString = dateToFormattedString;
var timeSince = function (date) {
    var currentDate = new Date();
    var timeDifference = currentDate.getTime() - date.getTime();
    var inFuture = timeDifference < 0;
    timeDifference = Math.abs(timeDifference);
    var millisecondsInSecond = 1000;
    var millisecondsInMinute = millisecondsInSecond * 60;
    var millisecondsInHour = millisecondsInMinute * 60;
    var millisecondsInDay = millisecondsInHour * 24;
    var millisecondsInWeek = millisecondsInDay * 7;
    var millisecondsInMonth = millisecondsInDay * 30.44; // Average month length
    var millisecondsInYear = millisecondsInDay * 365.25; // Average year length
    var years = Math.floor(timeDifference / millisecondsInYear);
    var months = Math.floor((timeDifference % millisecondsInYear) / millisecondsInMonth);
    var weeks = Math.floor((timeDifference % millisecondsInMonth) / millisecondsInWeek);
    var days = Math.floor((timeDifference % millisecondsInWeek) / millisecondsInDay);
    var hours = Math.floor((timeDifference % millisecondsInDay) / millisecondsInHour);
    var minutes = Math.floor((timeDifference % millisecondsInHour) / millisecondsInMinute);
    var seconds = Math.floor((timeDifference % millisecondsInMinute) / millisecondsInSecond);
    return {
        years: years,
        months: months,
        weeks: weeks,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        inFuture: inFuture
    };
};
exports.timeSince = timeSince;
var getNextDayOfWeek = function (date, dayOfWeek) {
    if (dayOfWeek < 0) {
        dayOfWeek = 0;
    }
    if (dayOfWeek > 6) {
        dayOfWeek %= 7;
    }
    return new Date(new Date(date.getTime()).setDate(date.getDate() + ((7 + dayOfWeek - date.getDay()) % 7)));
};
exports.getNextDayOfWeek = getNextDayOfWeek;
var dateToCSEFormat = function (date) {
    var year = date.getFullYear();
    var month = (0, misc_1.addLeadingZero)(date.getMonth() + 1);
    var day = (0, misc_1.addLeadingZero)(date.getDate());
    var hours = (0, misc_1.addLeadingZero)(date.getHours());
    var minutes = (0, misc_1.addLeadingZero)(date.getMinutes());
    var seconds = (0, misc_1.addLeadingZero)(date.getSeconds());
    return "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hours, ":").concat(minutes, ":").concat(seconds);
};
exports.dateToCSEFormat = dateToCSEFormat;
function formatDateTime(date) {
    return new Intl.DateTimeFormat(__spreadArray(__spreadArray([], navigator.languages, true), ["en-US"], false), {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(new Date(date));
}
exports.formatDateTime = formatDateTime;
