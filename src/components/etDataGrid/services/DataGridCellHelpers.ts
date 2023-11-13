import type { DataGridColumn } from "../interfaces/DataGridColumn";

export function getCellStyling(column: DataGridColumn): {
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

export async function getCellFormattedContent<T = object>(
    rawContent: unknown,
    column: DataGridColumn<T>,
    row: T
): Promise<string> {
    const formatter = column.content.formatter;
    if (!formatter) {
        // TODO: Make things like auto format dates?
        return rawContent as string;
    }

    return await formatter<T>(rawContent, row);
}
