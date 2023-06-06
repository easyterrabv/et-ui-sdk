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

export const monthToNameFull = (month: string): string => {
    return month in monthMap ? monthMap[month].full : "Unknown";
};

export const monthToNameShort = (month: string): string => {
    return month in monthMap ? monthMap[month].short : "Unknown";
};
