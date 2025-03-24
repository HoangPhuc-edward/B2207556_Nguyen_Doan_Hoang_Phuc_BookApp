<script>
import authService from "@/services/auth.service";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
    components: {
        AppHeader,
        AppFooter,
    },
    data() {
        return {
            user: null,
        };
    },
    methods: {
        goToBook() {
            this.$router.push({ name: "book" });
        },
        goToPublisher() {
            this.$router.push({ name: "publisher" });
        },
        goToAddAccount() {
            this.$router.push({ name: "add.account" });
        },
        goToBorrowManage() {
            this.$router.push({ name: "borrow" });
        },
        logout() {
            localStorage.removeItem("token");
            this.$router.push("/login");
        },
    },
    async mounted() {
        this.user = await authService.getProfile();

        if (!this.user) {
            alert("Bạn cần đăng nhập");
            this.$router.push("/login");
        }
    },
};
</script>

<template>
    <div class="home-page">
        <AppHeader :userName="this.user?.HoTenNV" />
        <div class="container mt-4">
            <div class="row">
                <!-- Left Column: User Information -->
                <div class="col-md-6">
                    <div class="card shadow-sm">
                        <div class="card-header bg-primary text-white">
                            <h4 class="mb-0">
                                <i class="fas fa-user"></i> Thông tin cá nhân
                            </h4>
                        </div>
                        <div class="card-body">
                            <p><strong>Họ tên:</strong> {{ user?.HoTenNV }}</p>
                            <p><strong>Chức vụ:</strong> {{ user?.ChucVu }}</p>
                            <p><strong>Địa chỉ:</strong> {{ user?.DiaChi }}</p>
                            <p><strong>Số điện thoại:</strong> {{ user?.SoDienThoai }}</p>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Buttons -->
                <div class="col-md-6">
                    <div class="card shadow-sm">
                        <div class="card-header bg-secondary text-white">
                            <h4 class="mb-0">
                                <i class="fas fa-tasks"></i> Chức năng
                            </h4>
                        </div>
                        <div class="card-body">
                            <button class="btn btn-light btn-block mb-3 shadow-sm" @click="goToBook">
                                <i class="fas fa-book"></i> Quản lý sách
                            </button>
                            <button class="btn btn-light btn-block mb-3 shadow-sm" @click="goToPublisher">
                                <i class="fas fa-building"></i> Quản lý nhà xuất bản
                            </button>
                            <button class="btn btn-light btn-block mb-3 shadow-sm" @click="goToBorrowManage">
                                <i class="fas fa-book-reader"></i> Quản lý mượn sách
                            </button>
                            <button class="btn btn-light btn-block shadow-sm" @click="goToAddAccount">
                                <i class="fas fa-user-plus"></i> Thêm tài khoản
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AppFooter />
    </div>
</template>

<style>
.home-page {
    background-color: #f8f9fa;
    min-height: 100vh;
}

.btn-light {
    transition: all 0.3s ease;
    border: 1px solid #ddd;
}

.btn-light:hover {
    background-color: #f1f1f1;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>