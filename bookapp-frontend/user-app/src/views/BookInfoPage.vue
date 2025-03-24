<script>
import BookCard from '@/components/BookCard.vue';
import authService from '@/services/auth.service';
import bookService from '@/services/book.service';
import borrowService from '@/services/borrow.service';
import { checkBeforeBorrow, getBookNumber } from '@/utils/utils';

import { reactive } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
    components: {
        BookCard,
        AppHeader,
        AppFooter
    },
    data() {
        return {
            user: null,
            book: reactive({}),
            id: this.$route.params.id
        };
    },
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN').format(value);
        },
        async getBook(id) {
            console.log(id)
            try {
                const newBook = await bookService.get(id);
                newBook.SoQuyen = await getBookNumber(newBook);

                this.book = newBook;
            } catch (error) {
                console.log(error);
            }
        },

        async borrow() {
            const condition = await checkBeforeBorrow(this.book);
            if (!condition) {
                alert('Sách đã hết');
                return;
            }
            const NgayPhaiTra = new Date();
            NgayPhaiTra.setDate(NgayPhaiTra.getDate() + this.book.SoNgayMuon);

            const payload = {
                MaDocGia: this.user._id,
                MaSach: this.book._id,
                MaNVMuon: '67dcd4f3a2cbd2bf94403bbb',
                NgayMuon: new Date().toISOString(),
                NgayPhaiTra: NgayPhaiTra.toISOString(),
            }
            console.log(payload);

            try {
                await borrowService.create(payload);
                alert('Mượn sách thành công');
                this.$router.push('/home');
            } catch (error) {
                console.log(error);
                alert('Mượn sách thất bại');
            }
        }
    },
    async created() {
        this.user = await authService.getProfile();
        if (!this.user) {
            alert('Bạn cần đăng nhập để xem thông tin sách');
            this.$router.push('/login');
        }
        this.getBook(this.id);
    }

}
</script>

<template>
    <div class="container mt-4">
        <AppHeader :userName="user?.HoLot + ' ' + user?.Ten" @logout="logout" />
        <div class="row">

            <div class="col-md-4 text-center" style="height: 20rem">
                <img :src="book.HinhAnh" alt="Bìa sách" class="img-fluid rounded shadow">
            </div>

            <div class="col-md-8">
                <div class="card p-3 shadow">
                    <h5 class="card-title text-primary"><i class="fas fa-book"></i> {{ book.TenSach }}</h5>
                    <p><i class="fas fa-user"></i> <strong>Tác giả:</strong> {{ book.TacGia }}</p>
                    <p><i class="fas fa-money-bill-wave"></i> <strong>Đơn giá:</strong> {{ formatCurrency(book.DonGia)
                    }} đ</p>
                    <p><i class="fas fa-box"></i> <strong>Số quyển:</strong> {{ book.SoQuyen }}</p>
                    <p><i class="fas fa-calendar-alt"></i> <strong>Năm xuất bản:</strong> {{ book.NamXuatBan }}</p>
                    <p><i class="fas fa-building"></i> <strong>Nhà xuất bản:</strong> {{ book.MaNXB.TenNXB }}</p>

                    <div class="mt-3">
                        <router-link to="/home" class="btn btn-outline-secondary">
                            <i class="fas fa-arrow-left"></i> Trở về trang chủ
                        </router-link>
                        <button @click="borrow" class="btn btn-primary ms-2">
                            <i class="fas fa-hand-holding"></i> Mượn sách
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppFooter />
</template>


<style scoped>
.img-fluid {
    max-height: 300px;
    object-fit: cover;
}

.card {
    border-radius: 10px;
}

.btn {
    min-width: 150px;
}
</style>