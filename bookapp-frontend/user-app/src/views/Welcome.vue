<script>
import authService from "@/services/auth.service";
export default {
    methods: {
        goToLogin() {
            this.$router.push("login");
        },
        goToRegister() {
            this.$router.push("register");
        },
    },
    async mounted() {
        if (await authService.getProfile()) {
            this.$router.push("home");
        }
    }
};
</script>

<template>
    <div class="welcome-page">
        <div class="content text-center text-white">
            <p class="lead">Chào mừng bạn đến với</p>
            <h1 class="display-3 fw-bold">Book App</h1>
            <p class="lead">“Đọc sách hôm nay, thành công mai sau.”</p>
            <p class="lead">- Margaret Fuller -</p>
            <div class="mt-4">
                <button class="btn btn-primary btn-lg me-3" @click="goToLogin">
                    <i class="fas fa-sign-in-alt"></i> Đăng nhập
                </button>
                <button class="btn btn-secondary btn-lg" @click="goToRegister">
                    <i class="fas fa-user-plus"></i> Đăng ký
                </button>
            </div>
        </div>
    </div>
</template>

<style>
.welcome-page {
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("/background.jpg");
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    color: white;
}

.content {
    background: rgba(0, 0, 0, 0.6);
    padding: 20px 30px;
    border-radius: 10px;
}
</style>