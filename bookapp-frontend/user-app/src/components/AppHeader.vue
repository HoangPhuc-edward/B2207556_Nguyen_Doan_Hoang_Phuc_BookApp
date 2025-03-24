<script>

export default {
    props: {
        userName: {
            type: String,
            required: true,
        },
    },
    emits: ["logout"],
    methods: {
        logout() {
            this.$emit("logout");
        },
    },
}
</script>

<template>
    <header class="text-white py-3 mb-4" style="background-color: #343a40;">
        <div class="container d-flex justify-content-between align-items-center">
            <div>
                <h1 class="mb-0"
                    style="font-family: 'Montserrat', cursive; font-size: 2rem; letter-spacing: 2px; font-weight: 700;">
                    <i class="bi bi-book"></i> Book App
                </h1>
                <p class="mb-0 fst-italic"> “Đọc sách hôm nay, thành công mai sau.” – Margaret Fuller</p>
            </div>
            <div class="text-end">
                <h5 class="mb-1">Xin chào, {{ this.userName }}</h5>
                <button class="btn btn-outline-light btn-sm" @click="logout">
                    <i class="bi bi-box-arrow-right"></i> Đăng xuất
                </button>
            </div>
        </div>
    </header>
</template>