<template>
    <div class="">
        <p class="font-bold">Filter Statistic</p>
        <div class="flex my-2">
            <DatePicker valueType="YYYY-MM-DD" class="!w-full" v-model="rentang_tanggal" range
                placeholder="Rentang Tanggal">
            </DatePicker>
            <BtnIcon :loading="isLoading" type="button" title="Refresh" color="blue" icon="HeroiconsCheckIcon" icon-size="sm" add-class="ml-2"
                @handleClick="loadDataPerItem" />
        </div>
        <hr class="my-3">
        <div class="grid grid-cols-4 gap-4 mb-4">
            <div class=" h-24 rounded bg-blue-600 dark:bg-gray-800 p-5 rounded shadow text-white">
                <HeroiconsUserIcon />
                <hr class="my-2">
                <div class="flex items-center justify-between">
                    <p class="font-bold"> Total karyawan</p>
                    <p class="font-bold">{{ totalPerItem.total_pegawai }}</p>
                </div>
            </div>
            <div class=" h-24 rounded bg-green-600 dark:bg-gray-800 p-5 rounded shadow text-white">
                <HeroiconsArrowRight />
                <hr class="my-2">
                <div class="flex items-center justify-between">
                    <p class="font-bold"> Total Login</p>
                    <p class="font-bold">{{ totalPerItem.total_login }}</p>
                </div>
            </div>
            <div class=" h-24 rounded bg-indigo-600 dark:bg-gray-800 p-5 rounded shadow text-white">
                <HeroiconsFolderDownload />
                <hr class="my-2">
                <div class="flex items-center justify-between">
                    <p class="font-bold"> Total Unit</p>
                    <p class="font-bold">{{ totalPerItem.total_unit }}</p>
                </div>
            </div>

            <div class=" h-24 rounded bg-orange-600 dark:bg-gray-800 p-5 rounded shadow text-white">
                <HeroiconsInformationCircle />
                <hr class="my-2">
                <div class="flex items-center justify-between">
                    <p class="font-bold"> Total Jabatan</p>
                    <p class="font-bold">{{ totalPerItem.total_jabatan }}</p>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="shadow rounded bg-gray-90 dark:bg-gray-800">
                <div class="title">
                    <p class="font-bold px-4 pt-2">Aktifitas Login</p>
                    <hr class="my-3">
                    <AktifitasTable :hidePagination="true" :columns="columnsTopActivity" class="px-4" typeLog="login" />
                </div>
            </div>
            <div class="shadow rounded bg-gray-90  dark:bg-gray-800">
                <div class="title">
                    <p class="font-bold px-4 pt-2">Aktifitas Data</p>
                    <hr class="my-3">
                    <AktifitasTable :columns="columnsTActivity" class="px-4" typeLog="data" />

                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { mapGetters } from "vuex";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    components: { DatePicker },

    name: 'IndexPage',
    data() {
        return {
            rentang_tanggal: null,
            isLoading: false,
            columnsTopActivity: [
                { label: 'No', field: 'no' },
                { label: 'Pegawai', field: 'pegawai' },
                { label: 'Jumlah Login', field: 'login_count' }
            ],
            columnsTActivity: [
                { label: 'Pegawai', field: 'pegawai' },
                { label: 'Action', field: 'action' },
                { label: 'Description', field: 'description' },
            ],
        }
    },
    mounted() {
        this.loadDataPerItem()
    },
    computed: {
        ...mapGetters("dashboard", [
            "isLoading",
            "totalPerItem"
        ]),
    },
    methods: {
       async loadDataPerItem() {
            const filter = {

            }
            if (this.rentang_tanggal && (this.rentang_tanggal[0] && this.rentang_tanggal[1])) {
                filter.rentang_tanggal = this.rentang_tanggal
            }
            this.isLoading = true
            await this.$store.dispatch('dashboard/fetchTotalItem', filter)
            this.isLoading = false

        },

    }
}
</script>
