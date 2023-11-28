<template>
    <EtDataGrid
        name="datagridtest"
        ref="table"
        :rowInfo="rowInfo"
        :filters="tableFilters"
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
import {type FilterDefinition} from "../../src/components/etDataGrid/interfaces/DataGridMethods";

type ExampleRow = {
    key: number,
    name: string,
    email: string,
    text: string
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
                    width: "150px",
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
                {
                    guid: "4",
                    width: "grow",
                    header: {
                        label: "Text",
                    },
                    content: {
                        key: "text",
                    }
                },
                {
                    guid: "5",
                    width: "150px",
                    content: {
                        key: "text",
                        formatter() {
                            return (new Date()).toDateString();
                        }
                    }
                }
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

            tableFilters: [
                {field: 'name', label: 'Name', default: ''},
                {field: 'email', label: 'Email', default: ''},
                {field: 'text', label: 'Contains words', default: ''},
            ] as FilterDefinition[],
            staticData: [
                {key: 1, name: 'John Doe', email: 'j.doe@example.com', text: 'Maecenas pretium posuere leo, interdum placerat ante placerat quis. Vivamus imperdiet ultricies sapien id posuere. Curabitur pharetra, risus nec interdum commodo, arcu ex dapibus nisl, eu pellentesque dolor ipsum quis dui. Praesent nec molestie ligula. Praesent feugiat dolor lobortis ante porttitor consequat. Nullam in varius tellus. Ut faucibus magna elit, a tincidunt lorem fermentum sed.'},
                {key: 2, name: 'Jane Doe', email: 'j.doe@example.com', text: ''},
                {key: 3, name: 'Jake Doe', email: 'j.doe@example.com', text: ''},
                {key: 4, name: 'Jenny Doe', email: 'j.doe@example.com', text: ''},
                {key: 5, name: 'Johan Doe', email: 'j.doe@example.com', text: ''},
                {key: 6, name: 'Jacob Doe', email: 'j.doe@example.com', text: ''},
                {key: 7, name: 'Jeremy Doe', email: 'j.doe@example.com', text: ''},
                {key: 8, name: 'Jerry Doe', email: 'j.doe@example.com', text: ''},
                {key: 9, name: 'Joe Doe', email: 'j.doe@example.com', text: ''},
                {key: 10, name: 'Jesse Doe', email: 'j.doe@example.com', text: ''},
                {key: 11, name: 'John Doe', email: 'j.doe@example.com', text: ''},
                {key: 12, name: 'Jane Doe', email: 'j.doe@example.com', text: ''},
                {key: 13, name: 'Jake Doe', email: 'j.doe@example.com', text: ''},
                {key: 14, name: 'Jenny Doe', email: 'j.doe@example.com', text: ''},
                {key: 15, name: 'Johan Doe', email: 'j.doe@example.com', text: ''},
                {key: 16, name: 'Jacob Doe', email: 'j.doe@example.com', text: ''},
                {key: 17, name: 'Jeremy Doe', email: 'j.doe@example.com', text: ''},
                {key: 18, name: 'Jerry Doe', email: 'j.doe@example.com', text: ''},
                {key: 19, name: 'Joe Doe', email: 'j.doe@example.com', text: ''},
                {key: 20, name: 'Jesse Doe', email: 'j.doe@example.com', text: ''},
                {key: 21, name: 'John Doe', email: 'j.doe@example.com', text: ''},
                {key: 22, name: 'Jane Doe', email: 'j.doe@example.com', text: ''},
                {key: 23, name: 'Jake Doe', email: 'j.doe@example.com', text: ''},
                {key: 24, name: 'Jenny Doe', email: 'j.doe@example.com', text: ''},
                {key: 25, name: 'Johan Doe', email: 'j.doe@example.com', text: ''},
                {key: 26, name: 'Jacob Doe', email: 'j.doe@example.com', text: ''},
                {key: 27, name: 'Jeremy Doe', email: 'j.doe@example.com', text: ''},
                {key: 28, name: 'Jerry Doe', email: 'j.doe@example.com', text: ''},
                {key: 29, name: 'Joe Doe', email: 'j.doe@example.com', text: ''},
                {key: 30, name: 'Jesse Doe', email: 'j.doe@example.com', text: ''},
                {key: 31, name: 'John Doe', email: 'j.doe@example.com', text: ''},
                {key: 32, name: 'Jane Doe', email: 'j.doe@example.com', text: ''},
                {key: 33, name: 'Jake Doe', email: 'j.doe@example.com', text: ''},
                {key: 34, name: 'Jenny Doe', email: 'j.doe@example.com', text: ''},
                {key: 35, name: 'Johan Doe', email: 'j.doe@example.com', text: ''},
                {key: 36, name: 'Jacob Doe', email: 'j.doe@example.com', text: ''},
                {key: 37, name: 'Jeremy Doe', email: 'j.doe@example.com', text: ''},
                {key: 38, name: 'Jerry Doe', email: 'j.doe@example.com', text: ''},
                {key: 39, name: 'Joe Doe', email: 'j.doe@example.com', text: ''},
                {key: 40, name: 'Jesse Doe', email: 'j.doe@example.com', text: ''},
                {key: 41, name: 'John Doe', email: 'j.doe@example.com', text: ''},
                {key: 42, name: 'Jane Doe', email: 'j.doe@example.com', text: ''},
                {key: 43, name: 'Jake Doe', email: 'j.doe@example.com', text: ''},
                {key: 44, name: 'Jenny Doe', email: 'j.doe@example.com', text: ''},
                {key: 45, name: 'Johan Doe', email: 'j.doe@example.com', text: ''},
                {key: 46, name: 'Jacob Doe', email: 'j.doe@example.com', text: ''},
                {key: 47, name: 'Jeremy Doe', email: 'j.doe@example.com', text: ''},
                {key: 48, name: 'Jerry Doe', email: 'j.doe@example.com', text: ''},
                {key: 49, name: 'Joe Doe', email: 'j.doe@example.com', text: ''},
                {key: 50, name: 'Jesse Doe', email: 'j.doe@example.com', text: ''},
                {key: 51, name: 'John Doe', email: 'j.doe@example.com', text: ''},
                {key: 52, name: 'Jane Doe', email: 'j.doe@example.com', text: ''},
                {key: 53, name: 'Jake Doe', email: 'j.doe@example.com', text: ''},
                {key: 54, name: 'Jenny Doe', email: 'j.doe@example.com', text: ''},
                {key: 55, name: 'Johan Doe', email: 'j.doe@example.com', text: ''},
                {key: 56, name: 'Jacob Doe', email: 'j.doe@example.com', text: ''},
                {key: 57, name: 'Jeremy Doe', email: 'j.doe@example.com', text: ''},
                {key: 58, name: 'Jerry Doe', email: 'j.doe@example.com', text: ''},
                {key: 59, name: 'Joe Doe', email: 'j.doe@example.com', text: ''},
                {key: 60, name: 'Jesse Doe', email: 'j.doe@example.com', text: ''},
                {key: 61, name: 'John Doe', email: 'j.doe@example.com', text: ''},
                {key: 62, name: 'Jane Doe', email: 'j.doe@example.com', text: ''},
                {key: 63, name: 'Jake Doe', email: 'j.doe@example.com', text: ''},
                {key: 64, name: 'Jenny Doe', email: 'j.doe@example.com', text: ''},
                {key: 65, name: 'Johan Doe', email: 'j.doe@example.com', text: ''},
                {key: 66, name: 'Jacob Doe', email: 'j.doe@example.com', text: ''},
                {key: 67, name: 'Jeremy Doe', email: 'j.doe@example.com', text: ''},
                {key: 68, name: 'Jerry Doe', email: 'j.doe@example.com', text: ''},
                {key: 69, name: 'Joe Doe', email: 'j.doe@example.com', text: ''},
                {key: 70, name: 'Jesse Doe', email: 'j.doe@example.com', text: ''},
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
        (this.$refs.table as any).patchRow(1,
            {
                name: 'Patched content!'
            }
        );
    }
});

</script>

<style>
.et-sdk-sandbox-row{
    background-color: var(--et-sdk-warning-100);
}
</style>