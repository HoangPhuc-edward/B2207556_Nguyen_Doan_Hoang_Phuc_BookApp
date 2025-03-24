<script>
import PublisherForm from '@/components/PublisherForm.vue';
import publisherService from '@/services/publisher.service';
import { reactive } from "vue";

export default {
    components: {
        PublisherForm
    },
    data() {
        return {
            publisher: reactive({}),
            message: "Thêm sách",
            buttonMsg: "Thêm",
            id: this.$route.params.id
        };
    },
    methods: {
        async addPublisher(data) {
            try {
                await publisherService.create(data);
                alert('Thêm NXB thành công');
                this.$router.push({ name: "publisher" });
            } catch (error) {
                console.log(error);
            }
        },

        async editPublisher(data) {
            try {
                await publisherService.update(this.id, data);
                alert('Sửa NXB thành công');
                this.$router.push({ name: "publisher" });
            } catch (error) {
                console.log(error);
            }
        },

        async submitPublisher(data) {
            if (this.id === "0") {
                this.addPublisher(data);
            } else {
                this.editPublisher(data);
            }
        },

        async getPublisher(id) {
            try {
                const newPublisher = await publisherService.get(id);
                Object.assign(this.publisher, newPublisher);
            } catch (error) {
                console.log(error);
            }
        }


    },

    created() {
        if (this.id !== "0") {
            this.getPublisher(this.id);
            this.message = "Sửa NXB";
            this.buttonMsg = "Sửa";
        }
    }
}
</script>

<template>
    <div v-if="publisher" class="page">
        <PublisherForm :publisher="publisher" @submit:publisher="submitPublisher" :button-message="buttonMsg" />
    </div>
</template>