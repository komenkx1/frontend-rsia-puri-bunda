<template>
    <div>
        <DataTable :columns="columns" :items="items" :loading="isLoading" mode="ajax" :ajax-filter="tableFilter"
            :ajax-meta="tableMeta" @setFilter="setFilter" @fetchData="loadData">
            <template #table-action>
                <div class="flex">
                    <BtnWithIcon title="Tambah Pegawai" icon="HeroiconsPlusIcon" icon-size="md"
                        add-class="flex-1 sm:flex-none" @handleClick="toogleForm('add', true)">
                        Tambah Pegawai
                    </BtnWithIcon>
                    <BtnIcon type="button" title="Refresh" color="gray" icon="HeroiconsRefreshIcon" icon-size="md"
                        add-class="ml-2" @handleClick="loadData" />
                </div>
            </template>
            <template #jabatan="{ row }">
                <p v-for="userJabatan in row.user_jabatan">
                    - {{ userJabatan.jabatan.name }}
                </p>
            </template>
            <template #unit="{ row }">
                <p>
                    {{ row.unit.name }}
                </p>
            </template>
            <template #aksi="{ row }">
                <BtnIcon @handleClick="toogleForm('edit', true, row)" color="blue" icon="HeroiconsPencilIcon" />
                <BtnIcon @handleClick="toogleAlert(true, row)" color="red" icon="HeroiconsTrashIcon" />
            </template>
        </DataTable>

        <Modal :showing="modalForm" :show-close="true" @close="modalForm = !modalForm">
            <div class="card bg-white shadow p-3">
                <p class="font-bold">Tambah Pegawai</p>
                <hr class="my-3">
                <form @submit.prevent="saveData">
                    <CInput class="my-2" type="text" :value.sync="form.name" label="Nama Pegawai" placeholder="Nama Pegawai"
                        :required="true" />
                    <small class="font-bold text-red-600 trasition-all" v-for="errorState in error?.name">
                        {{ errorState }}
                    </small>
                    <CInput class="my-2" type="text" :value.sync="form.username" label="Username Pegawai"
                        placeholder="Username Pegawai" :required="true" />
                    <small class="font-bold text-red-600 trasition-all" v-for="errorState in error?.username">
                        {{ errorState }}
                    </small>
                    <CInput class="my-2" type="password" :value.sync="form.password" label="Password Pegawai"
                        placeholder="Password Pegawai" :required="'id' in this.modalData ? false : true" />
                    <small class="font-bold text-red-600 trasition-all" v-for="errorState in error?.password">
                        {{ errorState }}
                    </small>
                    <CInput class="my-2" type="date" :value.sync="form.join_date" label="Tanggal Join Pegawai"
                        placeholder="Password Pegawai" :required="true" />
                    <small class="font-bold text-red-600 trasition-all" v-for="errorState in error?.join_date">
                        {{ errorState }}
                    </small>
                    <div class="my-2">
                        <label for="unit" class="block mb-2 text-sm font-medium text-gray-900">Unit Pegawai</label>
                        <v-select placeholder="Unit Pegawai" v-model="form.unit" :options="optionsUnit" label="name"
                            taggable>
                            <template #search="{ attributes, events }">
                                <input class="vs__search" :required="!form.unit" v-bind="attributes" v-on="events" />
                            </template>
                        </v-select>
                        <small class="font-bold text-red-600 trasition-all" v-for="errorState in error?.unit">
                            {{ errorState }}
                        </small>
                    </div>
                    <div class="my-2">
                        <label for="jabatan" class="block mb-2 text-sm font-medium text-gray-900">Jabatan Pegawai</label>
                        <v-select required placeholder="Jabatan Pegawai" v-model="form.jabatan" :options="optionsJabatan"
                            label="name" multiple taggable :pushTags="true">
                            <template #search="{ attributes, events }">
                                <input class="vs__search" :required="form.jabatan?.length == 0" v-bind="attributes"
                                    v-on="events" />
                            </template>
                        </v-select>
                        <small class="font-bold text-red-600 trasition-all" v-for="errorState in error?.unit">
                            {{ errorState }}
                        </small>
                    </div>
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
            :description="`Apakah anda yakin ingin menghapus data pegawai ${modalData.name} ?`" @closeModal="toogleAlert"
            @onYes="removePegawai" :isLoading="submitLoading" />
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
            selectedtest: "",
            error: [],
            columns: [
                { label: 'Name', field: 'name' },
                { label: 'Username', field: 'username' },
                { label: 'Tanggal Join', field: 'join_date' },
                { label: 'Unit', field: 'unit' },
                { label: 'Jabatan', field: 'jabatan' },
                { label: 'Aksi', field: 'aksi' }
            ],
            optionsUnit: [],
            optionsJabatan: [],
            items: [],
            formInput: {
                name: "",
                username: "",
                password: "",
                join_date: "",
                unit: "",
                jabatan: []
            },
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
        this.loadUnit()
        this.loadJabatan()
    },
    computed: {
        ...mapGetters("pegawai", [
            "isLoading",
        ]),
        form() {
            if ('id' in this.modalData) {
                return this.modalData
            } else {
                this.formInput = {
                    name: "",
                    username: "",
                    password: "",
                    join_date: "",
                    unit: "",
                    jabatan: []
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
        loadUnit() {
            const filter = {
                page: 1,
                per_page: 999999,
                sort_by: 'created_at',
                sort_order: 'DESC',
                q: ''
            }

            this.$store.dispatch('unit/fetch', filter).then(res => {
                this.optionsUnit = res.data.data.data
                this.submitLoading = false
            })
        },
        loadJabatan() {
            const filter = {
                page: 1,
                per_page: 999999,
                sort_by: 'created_at',
                sort_order: 'DESC',
                q: ''
            }

            this.$store.dispatch('jabatan/fetch', filter).then(res => {
                this.optionsJabatan = res.data.data.data
                this.submitLoading = false
            })
        },
        loadData() {
            const filter = {
                page: this.tableFilter.curPage,
                per_page: this.tableFilter.perPage,
                sort_by: this.tableFilter.sortKey,
                sort_order: this.tableFilter.sortOrder,
                q: this.tableFilter.search
            }

            this.$store.dispatch('pegawai/fetch', filter).then(res => {
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
            this.modalData = {}
            this.error = []
            if (mode == 'edit') {
                this.modalData = { ...dataModal }
                this.$set(this.modalData, 'jabatan', [...this.modalData.user_jabatan.map(res => {
                    return res.jabatan
                })]);
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
            dataForm.append("username", this.form.username)
            dataForm.append("password", this.form.password)
            dataForm.append("unit", this.form.unit.name)
            dataForm.append("join_date", this.form.join_date)
            dataForm.append("jabatan", JSON.stringify(this.form.jabatan))
            if ("id" in this.modalData) {
                dispatch = 'pegawai/update'
                dataForm.append("_method", "PUT")
                payload = {
                    data: dataForm,
                    id: this.modalData.id
                }
            } else {
                dispatch = 'pegawai/add'
                payload = {
                    data: dataForm
                }
            }
            this.$store.dispatch(dispatch, payload).then(res => {
                this.toogleForm("add", false)
                this.loadData()
                this.loadUnit()
                this.loadJabatan()
            }).catch(error => {
                this.error = error?.response?.data?.errors ?? []
                this.submitLoading = false
            })
        },
        removePegawai() {
            this.submitLoading = true
            this.$store.dispatch('pegawai/delete', this.modalData.id).then(res => {
                this.loadData()
                this.toogleAlert(false, {})
                this.submitLoading = false
            })
        }
    }
}
</script>