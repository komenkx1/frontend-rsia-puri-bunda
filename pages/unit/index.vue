<template>
    <div>
        <!-- table -->
    <DataTable
      :columns="columns"
      :items="items"
      :loading="tableLoading"
      mode="ajax"
      :ajax-filter="tableFilter"
      :ajax-meta="tableMeta"
      @setFilter="setFilter"
      @fetchData="loadData"

    />
    </div>
</template>

<script>


export default {

    data() {
        return {
            tableLoading: false,
            columns: [
                { label: 'Name', field: 'name' },
                { label: 'Aksi', field: 'aksi' }
            ],
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
    methods: {
        setFilter(filter) {
            this.tableFilter = {
                sortKey: filter.sortKey,
                sortOrder: filter.sortOrder,
                curPage: filter.curPage,
                perPage: filter.perPage,
                search: filter.search
            }
            console.log(filter)
        },
        loadData() {
            const filter = {
                page: this.tableFilter.curPage,
                per_page: this.tableFilter.perPage,
                sort_by: this.tableFilter.sortKey,
                sort_order: this.tableFilter.sortOrder,
                q: this.tableFilter.search
            }

            this.$axios.get('http://localhost:8000/api/unit', { params: filter }).then(res => {
                this.items = res.data.data.data
                console.log(this.items)
                this.tableMeta = {
                    from: res.data.data.from,
                    to: res.data.data.to,
                    numPage: res.data.data.last_page,
                    total: res.data.data.total
                }
            })

        },
    }
}
</script>