import { reactive } from "vue";
import type { RowVersionProvider } from "../interfaces/DataGridMethods";
import { getContentFromKey } from "../services/DataGridCellHelpers";
import type { RowObject } from "../interfaces/DataRowObject";

export function useRowVersion<T extends RowObject = RowObject>(
    rowKeyIdentifier: string = "guid"
) {
    return reactive<RowVersionProvider<T>>({
        versions: {},

        reset(rows) {
            this.versions = {};
            rows.forEach((row) => {
                const key = getContentFromKey(row, rowKeyIdentifier);
                if (!key) {
                    return;
                }
                this.versions[key] = 0;
            });
        },

        increment(row) {
            const key = getContentFromKey(row, rowKeyIdentifier);
            if (!key) {
                return;
            }
            let value = this.versions[key] || 0;
            this.versions[key] = value += 1;
        }
    });
}
