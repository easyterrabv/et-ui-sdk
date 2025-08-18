import type { DataGridColumn } from "../interfaces/DataGridColumn";
import type { CellWidthProvide } from "../interfaces/DataGridMethods";
import type { RowObject } from "../interfaces/DataRowObject";

export function getCellStyling<T extends RowObject = RowObject>(
    column: DataGridColumn<T>,
    cellWidth?: CellWidthProvide
): {
    [key: string]: string;
} {
    const styles: { [key: string]: string } = {};

    const width = column.width ?? "grow";

    if (width === "grow") {
        styles["flex-grow"] = "1";
        if (cellWidth) {
            styles["max-width"] = cellWidth.maxGrowCellWidth + "px";
        }
    } else if (width) {
        styles.width = width;
    }

    return styles;
}

export function getContentFromKey(row: any, key: string | string[]): string {
    const path: string[] = Array.isArray(key) ? key : key.split(".");
    return path.reduce((o, k) => (o || {})[k], row);
}

export async function getCellFormattedContent<T extends RowObject = RowObject>(
    rawContent: unknown,
    column: DataGridColumn<T>,
    row: T
): Promise<string> {
    const formatter = column.content.formatter;
    if (!formatter) {
        // TODO: Make things like auto format dates?
        return rawContent as string;
    }

    return await formatter(rawContent, row);
}

export function assignToPath<T extends RowObject = RowObject>(
    obj: T,
    path: string,
    value: any
) {
    let schema = obj; // a moving reference to internal objects within obj
    const pList = path.split(".");
    const len = pList.length;
    for (let i = 0; i < len - 1; i++) {
        const elem = pList[i];
        if (!elem) {
            continue;
        }

        if (!schema[elem]) {
            (schema as RowObject)[elem] = {};
        }
        schema = schema[elem];
    }

    const key = pList[len - 1];

    if (!key) {
        throw new Error(`Invalid path: ${path}. The last segment is empty.`);
    }

    const currentValue = schema[key];

    if (currentValue !== value) {
        (schema as RowObject)[key] = value;
        return [true, currentValue, value];
    }

    return [false, currentValue, value];
}
