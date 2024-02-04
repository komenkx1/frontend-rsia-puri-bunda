<template>
    <div>
        <!-- table -->
        <DataTable :columns="columns" :items="items" :loading="isLoading" mode="ajax" :ajax-filter="tableFilter"
            :ajax-meta="tableMeta" @setFilter="setFilter" @fetchData="loadData">
            <template #table-action>
                <div class="flex">
                    <BtnWithIcon title="Tambah Jabatan" icon="HeroiconsPlusIcon" icon-size="md"
                        add-class="flex-1 sm:flex-none" @handleClick="toogleForm('add', true)">
                        Tambah Jabatan
                    </BtnWithIcon>
                    <BtnIcon type="button" title="Refresh" color="gray" icon="HeroiconsRefreshIcon" icon-size="md"
                        add-class="ml-2" @handleClick="loadData" />
                </div>
            </template>
            <template #aksi="{ row }">
                <BtnIcon @handleClick="toogleForm('edit', true, row)" color="blue" icon="HeroiconsPencilIcon" />
                <BtnIcon @handleClick="toogleAlert(true, row)" color="red" icon="HeroiconsTrashIcon" />
            </template>
        </DataTable>
        <Modal :showing="modalForm" :show-close="true" @close="modalForm = !modalForm">
            <div class="card bg-white shadow p-3">
                <p class="font-bold">Tambah Jabatan</p>
                <hr class="my-3">
                <form @submit.prevent="saveData">
                    <CInput type="text" :value.sync="form.name" label="Nama Jabatan" placeholder="Nama Jabatan"
                        :required="true" />
                    <small class="font-bold text-red-600 trasition-all" v-for="errorState in error?.name">
                        {{ errorState }}
                    </small>
                    <div class="flex gap-3 justify-end items-center my-3">
                        <BtnWithIcon color="blue" :loading="submitLoading" type="submit" title="Save Data"
                            icon="HeroiconsPlusIcon" icon-size="sm" add-class="flex sm:flex-none">
                            Simpan
                        </BtnWithIcon>
                        <BtnWithIcon color="gray" @handleClick="toogleForm('', false)" title="Cancel" icon="HeroiconsXIcon"
                            icon-size="sm" add-class="flex sm:flex-none">
                            Cancel
                        </BtnWithIcon>
                    </div>
                </form>
            </div>
        </Modal>
        <ModalAlert :isShow="modalAlert" title="Alert"
            :description="`Apakah anda yakin ingin menghapus data jabatan ${modalData.name} ?`" @closeModal="toogleAlert"
            @onYes="removeJabatan" :isLoading="submitLoading" />
    </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {

    data() {
        return {
            submitLoading: false,
            modalForm: false,
            modalAlert: false,
            modalData: {},
            columns: [
                { label: 'Name', field: 'name' },
                { label: 'Aksi', field: 'aksi' }
            ],

            items: [],
            error: [],
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
        ...mapGetters("jabatan", [
            "isLoading",
        ]),
        form() {
            if ('id' in this.modalData) {
                return this.modalData
            } else {
                this.formInput = {
                    name: ""
                }
                return this.formInput
            }
        }
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
            const filter = {
                page: this.tableFilter.curPage,
                per_page: this.tableFilter.perPage,
                sort_by: this.tableFilter.sortKey,
                sort_order: this.tableFilter.sortOrder,
                q: this.tableFilter.search
            }

            this.$store.dispatch('jabatan/fetch', filter).then(res => {
                this.items = res.data.data.data
                this.tableMeta = {
                    from: res.data.data.from,
                    to: res.data.data.to,
                    numPage: res.data.data.last_page,
                    total: res.data.data.total
                }
                this.submitLoading = false
            })
        },
        resetForm() {
            this.formInput = {
                name: ""
            }
        },
        toogleForm(mode = 'add', value, dataModal = {}) {
            this.error = []
            this.modalData = {}
            if (mode == 'edit') {
                this.modalData = { ...dataModal }
            }
            this.modalForm = value
        },
        toogleAlert(value, dataModal = {}) {
            this.modalData = {}
            this.modalData = { ...dataModal }
            this.modalAlert = value
        },
        saveData() {
            this.submitLoading = true
            const dataForm = new FormData()
            let payload = {}
            let dispatch = ''
            dataForm.append("name", this.form.name)
            if ("id" in this.modalData) {
                dispatch = 'jabatan/update'
                dataForm.append("_method", "PUT")
                payload = {
                    data: dataForm,
                    id: this.modalData.id
                }
            } else {
                dispatch = 'jabatan/add'
                payload = {
                    data: dataForm
                }
            }
            this.$store.dispatch(dispatch, payload).then(res => {
                this.toogleForm("add", false)
                this.loadData()
            }).catch(error => {
                console.log(error)
                this.error = error?.response?.data?.errors ?? []
                this.submitLoading = false
            })
        },
        removeJabatan() {
            this.submitLoading = true
            this.$store.dispatch('jabatan/delete', this.modalData.id).then(res => {
                this.loadData()
                this.toogleAlert(false, {})
                this.submitLoading = false
            })
        }
    }
}
</script>