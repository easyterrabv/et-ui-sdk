export const needleFixer = (
    val: bigint | number | boolean | string | Date | null
): string => {
    let innerVal = val;

    if (typeof val === "bigint" || typeof val === "number") {
        innerVal = (val || 0).toString();
    } else if (typeof val === "boolean") {
        innerVal = innerVal ? "true" : "false";
    } else if (typeof val === "string") {
        innerVal = val;
    } else if (val instanceof Date) {
        const year = val.getFullYear();
        const month = val.getMonth();
        const date = val.getDate();
        innerVal = `${year}-${month + 1}-${date}`;
    } else {
        innerVal = "";
    }

    return (innerVal || "").toLowerCase().trim();
};
