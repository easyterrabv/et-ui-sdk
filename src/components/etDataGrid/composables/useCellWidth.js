import { reactive } from "vue";
export function useCellWidth() {
    return reactive({
        growCells: 0,
        maxGrowCellWidth: null,
        calculateGrowCells(columns) {
            this.growCells = columns.reduce((count, column) => {
                if ((column.width ?? "grow") === "grow") {
                    return count + 1;
                }
                return count;
            }, 0);
        },
        calculateMaxWidth(tableWidth, columns, isSelectable) {
            const usedWidth = columns.reduce((count, column) => {
                if ((column.width ?? "grow") !== "grow") {
                    return (count +
                        parseInt((column.width || "0px").split("px")[0], 10));
                }
                return count;
                // Starts with 40, due to row padding, and another 40 if checking is enabled
            }, 40 + (isSelectable ? 40 : 0));
            this.maxGrowCellWidth = (tableWidth - usedWidth) / this.growCells;
        },
        calculate(tableWidth, columns, isSelectable) {
            this.calculateGrowCells(columns);
            this.calculateMaxWidth(tableWidth, columns, isSelectable);
        }
    });
}
