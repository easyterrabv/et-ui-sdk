<template>
    <EtContent>
        <EtTable
            :dataGetter="dataGetter"
            rowKey="key"
            isClickable
            isSelectable
        >
            <template #header="{toggleSorting}">
                <th class="w-12 cursor-pointer" @click="toggleSorting('key')">
                    #
                </th>
                <th style="width: 250px;" class="cursor-pointer" @click="toggleSorting('name')">
                    Name
                </th>
                <th style="width: 200px;" class="cursor-pointer" @click="toggleSorting('email')">
                    Email
                </th>
            </template>
            <template #filters="{filter, filters}">
                <td class="w-12"></td>
                <td>
                    <EtInput size="s" :modelValue="filters['name']" @change="(val) => filter('name', val)"></EtInput>
                </td>
                <td></td>
            </template>
            <template #default="{row}">
                <td>
                    {{row.key}}
                </td>
                <td class="font-extrabold">
                    {{row.name}}
                </td>
                <td>
                    {{row.email}}
                </td>
            </template>
        </EtTable>
    </EtContent>
</template>

<script>
import {defineComponent} from "vue";
import EtContent from "src/layouts/Content.vue";
import EtTable from "src/components/etTable/EtTable.vue";
import EtInput from "src/components/etForm/EtInput.vue";
import {wait} from "src/helpers/async";

export default defineComponent({
    components: {
        EtContent,
        EtTable,
        EtInput
    },
    data() {
        return {
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
            ]
        }
    },
    methods: {
        async dataGetter({filters, sorting, page, perPage, offset}){
            await wait(1500);

            return [
                this.staticData,
                this.staticData.length
            ];
        }
    }
});
</script>