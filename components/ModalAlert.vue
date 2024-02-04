<template>
    <div>
        <Modal :showing="modal" :show-close="true" @close="closeModal">
            <div class="card bg-white shadow p-3">
                <p class="font-bold">{{ title }}</p>
                <hr class="my-3">
                <p>{{ description }}</p>
                <div class="flex gap-3 justify-end my-3">
                    <BtnWithIcon color="blue" :loading="isLoading" @handleClick="onYes" title="Save Data"
                        icon="HeroiconsTrashIcon" icon-size="sm" add-class="flex sm:flex-none">
                        Lanjutkan
                    </BtnWithIcon>
                    <BtnWithIcon color="gray" @handleClick="closeModal" title="Cancel" icon="HeroiconsXIcon" icon-size="sm"
                        add-class="flex sm:flex-none">
                        Cancel
                    </BtnWithIcon>

                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    props: {
        title: "",
        description: "",
        isShow: {
            default: false,
            type: Boolean
        },
        isLoading: false,
    },
    watch: {
        isShow(value) {
            this.modal = value
        }
    },
    data() {
        return {
            modal: false,
        }
    },
    methods: {
        closeModal() {
            this.$emit("closeModal", false, {})
        },
        onYes() {
            this.$emit("onYes")
        }
    }
}
</script>