<template>
    <div>
        <div class="flex items-center">
            <DatePicker valueType="YYYY-MM-DD" class="!w-full" v-model="filterLanjutan.rentang_tanggal" range placeholder="Rentang Tanggal">
            </DatePicker>
            <BtnIcon type="button" title="Refresh" color="blue" icon="HeroiconsCheckIcon" icon-size="sm" add-class="ml-2"
                @handleClick="loadData" />
        </div>
        <!-- table -->
        <DataTable :hidePagination="hidePagination" :columns="columns" :items="items" :loading="isloading" mode="ajax" :ajax-filter="tableFilter"
            :ajax-meta="tableMeta" @setFilter="setFilter" @fetchData="loadData">
            <template #table-action>
                <div class="flex">
                    <BtnIcon type="button" title="Refresh" color="gray" icon="HeroiconsRefreshIcon" icon-size="md"
                        add-class="ml-2" @handleClick="loadData" />
                </div>
            </template>
            <template #pegawai="{ row }">
                <p>{{ row.user.name }}</p>
            </template>
        </DataTable>

    </div>
</template>

<script>

import { mapGetters } from "vuex";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    components: { DatePicker },
    props: {
        typeLog: {
            default: "login",
            type: String
        },
        columns: [],
        hidePagination:false,
    },
    data() {
        return {
            filterLanjutan: {
                rentang_tanggal: null
            },
            isloading: false,
            items: [],
            tableFilter: {
                sortKey: 'created_at',
                sortOrder: 'desc',
                curPage: 1,
                perPage: 10,
                search: ''
            },
            tableMeta: {
                from: 1,
                to: 1,
                numPage: 1,
                total: 1
            },
        }
    },
    mounted() {
        this.loadData()
    },
    computed: {
        ...mapGetters("dashboard", [

        ]),
    },
    methods: {
        setFilter(filter) {
            this.tableFilter = {
                sortKey: filter.sortKey,
                sortOrder: filter.sortOrder,
                curPage: filter.curPage,
                perPage: filter.perPage,
                search: filter.search
            }
        },

        loadData() {
            this.isloading = true
            let dispatch = ''
            if (this.typeLog == 'login') dispatch = 'dashboard/fetchTopLoginAtivity'
            else dispatch = 'dashboard/fetchAtivity'

            const filter = {
                page: this.tableFilter.curPage,
                per_page: this.tableFilter.perPage,
                sort_by: this.tableFilter.sortKey,
                sort_order: this.tableFilter.sortOrder,
                q: this.tableFilter.search
            }

            if (this.filterLanjutan.rentang_tanggal && (this.filterLanjutan.rentang_tanggal[0] && this.filterLanjutan.rentang_tanggal[1])) {
                filter.rentang_tanggal = this.filterLanjutan.rentang_tanggal
            }

           

            this.$store.dispatch(dispatch, filter).then(res => {
                let no = 1;
                this.items = res.data?.data?.data ?? res.data.data
                this.items.forEach(element => {
                    element.no = no++
                });
                this.tableMeta = {
                    from: res.data?.data?.from ?? 1,
                    to: res.data?.data?.to ?? 10,
                    numPage: res?.data?.data?.last_page ?? 1,
                    total: res?.data?.data?.total ?? 10
                }
                this.isloading = false

            })
        },

    }
}
</script>