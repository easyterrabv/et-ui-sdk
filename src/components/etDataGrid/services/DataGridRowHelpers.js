import { computed, ref } from "vue";
export function getRowClass(rowInfo, row) {
    const rowClass = rowInfo.class;
    if (!rowClass) {
        return ref([]);
    }
    if (typeof rowClass === "function") {
        return computed(() => {
            return rowClass(row);
        });
    }
    return ref(rowClass);
}
