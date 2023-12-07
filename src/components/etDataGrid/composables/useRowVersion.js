import { reactive } from "vue";
import { getContentFromKey } from "../services/DataGridCellHelpers";
export function useRowVersion(rowKeyIdentifier = "guid") {
    return reactive({
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
