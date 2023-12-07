export function getCellStyling(column, cellWidth) {
    const styles = {};
    const width = column.width ?? "grow";
    if (width === "grow") {
        styles["flex-grow"] = "1";
        if (cellWidth) {
            styles["max-width"] = cellWidth.maxGrowCellWidth + "px";
        }
    }
    else if (width) {
        styles.width = width;
    }
    return styles;
}
export function getContentFromKey(row, key) {
    const path = Array.isArray(key) ? key : key.split(".");
    return path.reduce((o, k) => (o || {})[k], row);
}
export async function getCellFormattedContent(rawContent, column, row) {
    const formatter = column.content.formatter;
    if (!formatter) {
        // TODO: Make things like auto format dates?
        return rawContent;
    }
    return await formatter(rawContent, row);
}
export function assignToPath(obj, path, value) {
    let schema = obj; // a moving reference to internal objects within obj
    const pList = path.split(".");
    const len = pList.length;
    for (let i = 0; i < len - 1; i++) {
        const elem = pList[i];
        if (!schema[elem]) {
            schema[elem] = {};
        }
        schema = schema[elem];
    }
    const currentValue = schema[pList[len - 1]];
    if (currentValue !== value) {
        schema[pList[len - 1]] = value;
        return [true, currentValue, value];
    }
    return [false, currentValue, value];
}
