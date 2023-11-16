import type { DataGridColumn } from "../interfaces/DataGridColumn";
import type { RowObject } from "../interfaces/DataGridMethods";

export function getCellStyling<T extends RowObject = RowObject>(
    column: DataGridColumn<T>
): {
    [key: string]: string;
} {
    const styles: { [key: string]: string } = {};

    const width = column.width ?? "grow";

    if (width === "grow") {
        styles["flex-grow"] = "1";
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
