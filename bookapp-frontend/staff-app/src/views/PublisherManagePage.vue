<script>
import publisherService from '@/services/publisher.service';
import PublisherList from '@/components/PublisherList.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
    components: {
        PublisherList,
        AppHeader,
        AppFooter,
    },
    data() {
        return {
            publishers: [],
            activeIndex: -1,
        };
    },
    computed: {
        activePublisher() {
            if (this.activeIndex < 0) return null;
            return this.publishers[this.activeIndex];
        },
    },
    methods: {
        setActiveIndex(index) {
            this.activeIndex = index;
        },
        async retrievePublishers() {
            try {
                this.publishers = await publisherService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async deletePublisher(id) {
            const reply = window.confirm('Bạn có chắc chắn muốn xóa không?');
            if (!reply) return false;

            try {
                await publisherService.delete(id);
                alert('Xóa NXB thành công');
                this.refreshList();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrievePublishers();
        },
        goToAddPublisher() {
            this.$router.push({ name: 'publisher.form', params: { id: '0' } });
        },
        goToEditPublisher() {
            this.$router.push({ name: 'publisher.form', params: { id: this.activePublisher._id } });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>

<template>
    <AppHeader />
    <div class="page container mt-4">
        <div class="row mb-3">
            <div class="col-md-12 d-flex justify-content-between align-items-center">
                <button class="btn btn-primary" @click="goToAddPublisher">
                    <i class="fas fa-plus"></i> Thêm NXB
                </button>
                <router-link to="/home" class="btn btn-outline-secondary">
                    <i class="fas fa-arrow-left"></i> Trở về trang chủ
                </router-link>
            </div>
        </div>

        <div class="row">
            <!-- Publisher List -->
            <div class="col-md-6">
                <div class="card shadow-sm">
                    <div class="card-header bg-primary text-white">
                        <h4 class="mb-0">
                            <i class="fas fa-list"></i> Danh sách NXB
                        </h4>
                    </div>
                    <div class="card-body">
                        <PublisherList :publishers="publishers" :activeIndex="activeIndex"
                            @update:activeIndex="setActiveIndex" />
                    </div>
                </div>
            </div>

            <!-- Publisher Details -->
            <div class="col-md-6" v-if="activePublisher">
                <div class="card shadow-sm">
                    <div class="card-header bg-secondary text-white">
                        <h4 class="mb-0">
                            <i class="fas fa-info-circle"></i> Thông tin NXB
                        </h4>
                    </div>
                    <div class="card-body">
                        <p><strong>Tên:</strong> {{ activePublisher.TenNXB }}</p>
                        <p><strong>Địa chỉ:</strong> {{ activePublisher.DiaChi }}</p>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-primary" @click="goToEditPublisher">
                                <i class="fas fa-edit"></i> Sửa NXB
                            </button>
                            <button class="btn btn-danger" @click="deletePublisher(activePublisher._id)">
                                <i class="fas fa-trash"></i> Xóa NXB
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppFooter />
</template>

<style scoped>
.page {
    text-align: left;
    max-width: 1200px;
    width: 100%;
    margin: auto;
}
</style>