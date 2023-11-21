<template>
    <EtDataGrid
        name="datagridtest"
        ref="table"
        :rowInfo="rowInfo"
        :columns="columns"
        :bulk-methods="bulkMethods"
        :data-getter="dataGetter"
        @checked="onRowsChecked"
    ></EtDataGrid>
</template>

<script lang="ts">
import EtDataGrid from "src/components/etDataGrid/EtDataGrid.vue";
import {defineComponent, markRaw} from "vue";
import type {DataGridColumn} from "../../src/components/etDataGrid/interfaces/DataGridColumn";

import EtDataGridCustomComponentCellTest from "../parts/DataGridCustomComponentCellTest.vue";
import {wait} from "../../src/helpers/async";
import type {BulkMethod, SortingObject} from "../../src/components/etDataGrid/interfaces/DataGridMethods";
import EtIconPaperclip from "../../src/components/etIcon/EtIconPaperclip.vue";

type ExampleRow = {
    key: number,
    name: string,
    email: string,
}

export default defineComponent({
    components: {
        EtDataGrid
    },
    data() {
        return {
            rowInfo: {
                idKey: 'key',
                isSelectable: true,
                onRowClick: this.handleRowClick,
                class: () => {
                    const random = Math.round(Math.random() * 2);
                    if(random === 1){
                        return ["et-sdk-sandbox-row"];
                    }
                    return [];
                }
            },
            columns: [
                {
                    guid: "1",
                    width: "100px",
                    header: {
                        label: "ID"
                    },
                    content: {
                        key: "key"
                    }
                },
                {
                    guid: "2",
                    width: "300px",
                    header: {
                        label: "Name",
                        sorting: {
                            field: 'name'
                        }
                    },
                    content: {
                        key: "name",
                        formatter: (data: unknown, row: ExampleRow) => {
                            return `${data}_${row.key}`;
                        }
                    }
                },
                {
                    guid: "3",
                    width: "grow",
                    header: {
                        label: "Email",
                        sorting: {
                            field: 'email',
                            default: 'ASC'
                        }
                    },
                    content: {
                        key: "email",
                        component: markRaw(EtDataGridCustomComponentCellTest)
                    }
                },
            ] as DataGridColumn[],

            bulkMethods: [
                {
                    method(rows) {
                        console.log('bulk method rows', rows);
                    },
                    title: 'testing bulk methods'
                },
                {
                    method(rows) {
                        console.log('bulk method rows 2', rows);
                    },
                    title: 'testing bulk methods 2',
                    component: markRaw(EtIconPaperclip)
                }
            ]  as BulkMethod[],

            staticData: [
                {key: 1, name: 'John Doe', email: 'j.doe@example.com'},
                {key: 2, name: 'Jane Doe', email: 'j.doe@example.com'},
                {key: 3, name: 'Jake Doe', email: 'j.doe@example.com'},
                {key: 4, name: 'Jenny Doe', email: 'j.doe@example.com'},
                {key: 5, name: 'Johan Doe', email: 'j.doe@example.com'},
                {key: 6, name: 'Jacob Doe', email: 'j.doe@example.com'},
                {key: 7, name: 'Jeremy Doe', email: 'j.doe@example.com'},
                {key: 8, name: 'Jerry Doe', email: 'j.doe@example.com'},
                {key: 9, name: 'Joe Doe', email: 'j.doe@example.com'},
                {key: 10, name: 'Jesse Doe', email: 'j.doe@example.com'},
                {key: 11, name: 'John Doe', email: 'j.doe@example.com'},
                {key: 12, name: 'Jane Doe', email: 'j.doe@example.com'},
                {key: 13, name: 'Jake Doe', email: 'j.doe@example.com'},
                {key: 14, name: 'Jenny Doe', email: 'j.doe@example.com'},
                {key: 15, name: 'Johan Doe', email: 'j.doe@example.com'},
                {key: 16, name: 'Jacob Doe', email: 'j.doe@example.com'},
                {key: 17, name: 'Jeremy Doe', email: 'j.doe@example.com'},
                {key: 18, name: 'Jerry Doe', email: 'j.doe@example.com'},
                {key: 19, name: 'Joe Doe', email: 'j.doe@example.com'},
                {key: 20, name: 'Jesse Doe', email: 'j.doe@example.com'},
                {key: 21, name: 'John Doe', email: 'j.doe@example.com'},
                {key: 22, name: 'Jane Doe', email: 'j.doe@example.com'},
                {key: 23, name: 'Jake Doe', email: 'j.doe@example.com'},
                {key: 24, name: 'Jenny Doe', email: 'j.doe@example.com'},
                {key: 25, name: 'Johan Doe', email: 'j.doe@example.com'},
                {key: 26, name: 'Jacob Doe', email: 'j.doe@example.com'},
                {key: 27, name: 'Jeremy Doe', email: 'j.doe@example.com'},
                {key: 28, name: 'Jerry Doe', email: 'j.doe@example.com'},
                {key: 29, name: 'Joe Doe', email: 'j.doe@example.com'},
                {key: 30, name: 'Jesse Doe', email: 'j.doe@example.com'},
                {key: 31, name: 'John Doe', email: 'j.doe@example.com'},
                {key: 32, name: 'Jane Doe', email: 'j.doe@example.com'},
                {key: 33, name: 'Jake Doe', email: 'j.doe@example.com'},
                {key: 34, name: 'Jenny Doe', email: 'j.doe@example.com'},
                {key: 35, name: 'Johan Doe', email: 'j.doe@example.com'},
                {key: 36, name: 'Jacob Doe', email: 'j.doe@example.com'},
                {key: 37, name: 'Jeremy Doe', email: 'j.doe@example.com'},
                {key: 38, name: 'Jerry Doe', email: 'j.doe@example.com'},
                {key: 39, name: 'Joe Doe', email: 'j.doe@example.com'},
                {key: 40, name: 'Jesse Doe', email: 'j.doe@example.com'},
                {key: 41, name: 'John Doe', email: 'j.doe@example.com'},
                {key: 42, name: 'Jane Doe', email: 'j.doe@example.com'},
                {key: 43, name: 'Jake Doe', email: 'j.doe@example.com'},
                {key: 44, name: 'Jenny Doe', email: 'j.doe@example.com'},
                {key: 45, name: 'Johan Doe', email: 'j.doe@example.com'},
                {key: 46, name: 'Jacob Doe', email: 'j.doe@example.com'},
                {key: 47, name: 'Jeremy Doe', email: 'j.doe@example.com'},
                {key: 48, name: 'Jerry Doe', email: 'j.doe@example.com'},
                {key: 49, name: 'Joe Doe', email: 'j.doe@example.com'},
                {key: 50, name: 'Jesse Doe', email: 'j.doe@example.com'},
                {key: 51, name: 'John Doe', email: 'j.doe@example.com'},
                {key: 52, name: 'Jane Doe', email: 'j.doe@example.com'},
                {key: 53, name: 'Jake Doe', email: 'j.doe@example.com'},
                {key: 54, name: 'Jenny Doe', email: 'j.doe@example.com'},
                {key: 55, name: 'Johan Doe', email: 'j.doe@example.com'},
                {key: 56, name: 'Jacob Doe', email: 'j.doe@example.com'},
                {key: 57, name: 'Jeremy Doe', email: 'j.doe@example.com'},
                {key: 58, name: 'Jerry Doe', email: 'j.doe@example.com'},
                {key: 59, name: 'Joe Doe', email: 'j.doe@example.com'},
                {key: 60, name: 'Jesse Doe', email: 'j.doe@example.com'},
                {key: 61, name: 'John Doe', email: 'j.doe@example.com'},
                {key: 62, name: 'Jane Doe', email: 'j.doe@example.com'},
                {key: 63, name: 'Jake Doe', email: 'j.doe@example.com'},
                {key: 64, name: 'Jenny Doe', email: 'j.doe@example.com'},
                {key: 65, name: 'Johan Doe', email: 'j.doe@example.com'},
                {key: 66, name: 'Jacob Doe', email: 'j.doe@example.com'},
                {key: 67, name: 'Jeremy Doe', email: 'j.doe@example.com'},
                {key: 68, name: 'Jerry Doe', email: 'j.doe@example.com'},
                {key: 69, name: 'Joe Doe', email: 'j.doe@example.com'},
                {key: 70, name: 'Jesse Doe', email: 'j.doe@example.com'},
            ] as ExampleRow[]
        }
    },
    methods: {
        handleRowClick(row: ExampleRow) {
            console.log('ROW HAS BEEN CLICKED ON!');
            console.log(row);
        },
        async dataGetter(
            filters: { [key: string]: string | number | boolean | Array<unknown> },
            sorting: SortingObject,
            page: number,
            perPage: number
        ) {

            console.log({
                filters,
                sorting
            });

            const start = (page - 1) * perPage;
            const end = start + perPage;

            await wait(1500);
            return [
                this.staticData.slice(start, end),
                this.staticData.length
            ]
        },
        onRowsChecked(rows: ExampleRow) {
            console.log(rows);
        },
    },
    async mounted() {
        await wait(5000);
        (this.$refs.table as any).setFilters({
            email: 'j.doe@example.com'
        });
    }
});

</script>

<style>
.et-sdk-sandbox-row{
    background-color: var(--et-sdk-warning-100);
}
</style>