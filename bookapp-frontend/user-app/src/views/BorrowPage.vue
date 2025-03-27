<script>
import authService from '@/services/auth.service';
import borrowService from '@/services/borrow.service';
import bookService from '@/services/book.service';
import { ref } from 'vue';
import { checkBorrow, formatDate } from '@/utils/utils';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
export default {
    components: {
        AppHeader,
        AppFooter
    },
    data() {
        return {
            user: null,
            borrows: [],
            id: this.$route.params.id,
            type: 0,
        }
    },
    computed: {
        activeBorrowList() {
            return this.borrows.filter(borrow => checkBorrow(borrow) === this.type);
        }
    },

    methods: {
        async getBorrow(userId) {
            try {
                const newBorrows = await borrowService.findByAttribute('MaDocGia', userId);
                newBorrows.forEach(borrow => {
                    borrow.NgayMuon = formatDate(borrow.NgayMuon);
                    borrow.NgayTra = formatDate(borrow.NgayTra);
                    borrow.NgayPhaiTra = formatDate(borrow.NgayPhaiTra);
                });

                this.borrows = newBorrows;
            } catch (error) {
                console.log(error);
            }
        },
        setType(type) {
            this.type = type;
        },
        async deleteBorrow(id) {
            const val = confirm('Bạn có chắc chắn muốn hủy mượn sách này?')
            if (!val) return;
            try {
                await borrowService.delete(id);
                this.borrows = this.borrows.filter(borrow => borrow._id !== id);
            } catch (error) {
                console.log(error);
            }
        },
    },
    async mounted() {
        this.user = await authService.getProfile();

        if (!this.user) {
            alert('Bạn cần đăng nhập');
            this.$router.push('/login');
        }
        this.getBorrow(this.user._id);
    }
}

</script>

<template>

    <div class="container mt-5">
        <AppHeader :userName="user?.HoLot + ' ' + user?.Ten" @logout="logout" />


        <div class="text-center mb-4 d-flex flex-row justify-content-between">
            <h3>SÁCH ĐÃ MƯỢN</h3>
            <router-link to="/home" class="btn btn-primary">
                <i class="fas fa-home"></i> Trở về trang chủ
            </router-link>
        </div>

        <div class="flex-row d-flex">
            <button @click="setType(0)">Sách đang mượn</button>
            <button @click="setType(1)" style="margin-left: 12px">Sách đã trả</button>
        </div>
        <ul class="list-group">
            <li v-for="borrow in activeBorrowList" :key="borrow._id"
                class="list-group-item d-flex justify-content-between align-items-start my-2">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">
                        <i class="fas fa-book"></i>
                        <span class="mx-3">{{ borrow.MaSach.TenSach }}</span>
                    </div>
                    <p><i class="fas fa-calendar-alt"></i> Ngày mượn: {{ borrow.NgayMuon }}</p>
                    <p><i class="fas fa-calendar-check"></i> Ngày trả: {{ borrow.NgayTra }}</p>
                    <p><i class="fas fa-calendar-times"></i> Ngày phải trả: {{ borrow.NgayPhaiTra }}</p>
                    <div>
                        <button @click="deleteBorrow(borrow._id)" class="btn btn-danger">Hủy mượn sách</button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <AppFooter />
</template>

<style></style>