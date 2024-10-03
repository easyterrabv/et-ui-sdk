<template>
    <EtContent>
        <div style="margin: 15px;">
            Saved filters:
            <EtButtonGroup v-if="filterSetSaving?.savedFilterSets">
                <EtButtonDefault
                    :size="UI_SIZING.S"
                    v-for="savedFilter in filterSetSaving.savedFilterSets"
                    @click="setFilters(savedFilter.filters)"
                >
                    {{savedFilter.label}}
                </EtButtonDefault>
            </EtButtonGroup>
        </div>

        <EtDataGrid
            :name="tableName"
            ref="table"
            :rowInfo="rowInfo"
            :filters="tableFilters"
            :columns="columns"
            :bulk-methods="bulkMethods"
            :data-getter="dataGetter"
            :onFilterSave="filterSetSaving.saveFilterSet"
            @checked="onRowsChecked"
            :auto-refresh="60"
        ></EtDataGrid>
    </EtContent>
</template>

<script lang="ts">
import EtContent from "src/layouts/Content.vue";
import EtDataGrid from "src/components/etDataGrid/EtDataGrid.vue";
import { defineComponent, markRaw } from "vue";
import type { DataGridColumn } from "../../src/components/etDataGrid/interfaces/DataGridColumn";

import EtDataGridCustomComponentCellTest from "../parts/DataGridCustomComponentCellTest.vue";
import { wait } from "../../src/helpers/async";
import {
    type FilterDateValue,
    type FilterDefinition,
    FilterInputType,
    type FilterObject
} from "../../src/components/etDataGrid/interfaces/DataGridFilters";
import EtIconPaperclip from "../../src/components/etIcon/EtIconPaperclip.vue";
import { OptionModel } from "../../src/models/Option";
import EtButtonGroup from "../../src/components/etButton/EtButtonGroup.vue";
import EtButtonDefault from "../../src/components/etButton/EtButtonDefault.vue";
import { UI_SIZING } from "../../src/helpers/enums";
import type { BulkMethod, SortingObject } from "../../src/components/etDataGrid/interfaces/DataGridMethods";
import { useFilterSaving } from "../../src/components/etDataGrid/composables/useFilterSaving";

type ExampleRow = {
    key: number,
    name: string,
    email: string,
    text: string
}

export default defineComponent({
    computed: {
        UI_SIZING() {
            return UI_SIZING
        }
    },
    components: {
        EtContent,
        EtButtonDefault,
        EtButtonGroup,
        EtDataGrid
    },
    data() {
        return {
            tableName: "datagridtest",
            filterSetSaving: useFilterSaving("datagridtest"),
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
                    title: 'testing bulk methods, if more than 2 rows are selected',
                    isVisible(rows){
                        return rows.length > 2;
                    }
                },
                {
                    method(rows) {
                        console.log('bulk method rows 2', rows);
                    },
                    title(rows) {
                        return `testing bulk methods 2, ${rows.length} rows selected`;
                    },
                    component: markRaw(EtIconPaperclip)
                },
                {
                    method(rows) {
                        console.log('bulk method rows 3', rows);
                    },
                    title: 'testing bulk methods 3, this one should never show',
                    isVisible: false
                }
            ]  as BulkMethod[],

            tableFilters: [
                {
                    field: 'name',
                    label: 'Name',
                },
                {
                    field: 'email',
                    label: 'Email',
                    validator: (value) => {
                        if(typeof value === 'string') {
                            // Regex from CSE `GET /tickets` endpoint
                            return value?.match(/^[\w.+-@]+$/)
                        }
                        return false;
                    }
                },
                {
                    field: 'text',
                    label: 'Contains words',
                },
                {
                    field: 'Options',
                    label: 'Has options',
                    multiple: true,
                    type: FilterInputType.SELECT,
                    options: Array(20).fill(null).map((item, index) => new OptionModel({
                        label: `Option ${index + 1}`,
                        value: index + 1
                    }))
                },
                {
                    field: 'created',
                    label: 'Date Created',
                    type: FilterInputType.DATERANGE,
                    formatter(dates: FilterDateValue) {
                        return {
                            'from': dates[0],
                            'till': dates[1]
                        }
                    }
                },
                {
                    field: 'attachments',
                    label: 'Has Attachments',
                    type: FilterInputType.CHECKBOX
                },
                {
                    field: 'label',
                    label: 'Labels',
                    type: FilterInputType.DYNAMIC_SELECT,
                    multiple: true,
                    disabled: false,
                    placeholder: 'Select something bruv.',
                    dataGetter: this.optionsDataGetter
                }
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
            ] as ExampleRow[],
        }
    },
    methods: {
        handleRowClick(row: ExampleRow) {
            console.log('ROW HAS BEEN CLICKED ON!');
            console.log(row);
        },
        setFilters(filters: FilterObject) {
            const datagrid = this.$refs.table as typeof EtDataGrid;
            if(datagrid){
                datagrid?.filters?.setFilters(filters);
            }
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
        async optionsDataGetter(searchValue: string) {
            console.log("Handling search 2222!", searchValue);

            await wait(1500);

            return [
                new OptionModel({
                    value: 1,
                    label: "Item one"
                }),
                new OptionModel({
                    value: 2,
                    label: "Item two"
                }),
                new OptionModel({
                    value: 3,
                    label: "Item three"
                }),
                new OptionModel({
                    value: 4,
                    label: "Item four"
                }),
                new OptionModel({
                    value: 5,
                    label: "Item five"
                }),
                new OptionModel({
                    value: 6,
                    label: "Item six"
                }),
                new OptionModel({
                    value: 7,
                    label: "Item seven"
                }),
                new OptionModel({
                    value: 8,
                    label: "Item eight"
                }),
                new OptionModel({
                    value: 9,
                    label: "Item nine"
                }),
                new OptionModel({
                    value: 10,
                    label: "Item ten"
                }),
                new OptionModel({
                    value: 11,
                    label: "Item eleven"
                }),
                new OptionModel({
                    value: 12,
                    label: "Item twelve"
                }),
                new OptionModel({
                    value: 13,
                    label: "Item thirteen"
                })
            ];
        }
    },
    async mounted() {
        await wait(5000);
        (this.$refs.table as any).patchRow(1,
            {
                name: 'Patched content!'
            }
        );
    },
});

</script>

<style>
.et-sdk-sandbox-row{
    background-color: var(--et-sdk-warning-100);
}
</style>