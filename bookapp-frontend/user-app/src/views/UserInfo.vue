<script>
import AppHeader from '@/components/AppHeader.vue';
import authService from '@/services/auth.service';
import { formatDate } from '@/utils/utils';
import AppFooter from '@/components/AppFooter.vue';

export default {
    components: {
        AppHeader,
        AppFooter
    },
    data() {
        return {
            user: null,
            bookCount: 0,
        }
    },
    methods: {
        async getUser() {
            const newUser = await authService.getProfile();
            if (!newUser) {
                alert("Bạn cần đăng nhập để truy cập trang này");
                this.$router.push('/login');
            }
            newUser.NgaySinh = formatDate(newUser.NgaySinh);
            this.user = newUser;
        }
    },
    async mounted() {
        this.getUser();
    }
}
</script>

<template>
    <div class="container mt-5">

        <AppHeader :userName="user?.HoLot + ' ' + user?.Ten" @logout="logout" />

        <div class="text-center mb-4">
            <router-link to="/home" class="btn btn-primary">
                <i class="fas fa-home"></i> Trở về trang chủ
            </router-link>
        </div>

        <div class="card shadow-sm">
            <div class="card-header text-white" style="background: gray;">
                <h4 class="mb-0">
                    <i class="fas fa-user"></i> Thông tin người dùng
                </h4>
            </div>
            <div class="card-body">
                <h5 class="card-title">Tên người dùng: {{ user?.HoLot }} {{ user?.Ten }}</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <i class="fas fa-calendar-alt"></i> Ngày sinh: {{ user?.NgaySinh }}
                    </li>
                    <li class="list-group-item">
                        <i class="fas fa-venus-mars"></i> Phái: {{ user?.Phai }}
                    </li>
                    <li class="list-group-item">
                        <i class="fas fa-map-marker-alt"></i> Địa chỉ: {{ user?.DiaChi }}
                    </li>
                    <li class="list-group-item">
                        <i class="fas fa-phone"></i> Điện thoại: {{ user?.DienThoai }}
                    </li>
                </ul>
            </div>
        </div>


        <AppFooter />
    </div>
</template>
