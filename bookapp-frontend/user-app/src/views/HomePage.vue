<script>
import bookService from '@/services/book.service';
import BookList from '@/components/BookList.vue';
import authService from '@/services/auth.service';
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';
import { getBookNumber } from '@/utils/utils';
export default {
    components: {
        BookList,
        AppHeader,
        AppFooter
    },
    data() {
        return {
            books: [],
            filteredBooks: [],
            searchQuery: '',
            user: null,

        };
    },
    methods: {

        async retrieveBooks() {
            try {
                const newBooks = await bookService.getAll();
                for (let i = 0; i < newBooks.length; i++) {
                    newBooks[i].SoLuong = await getBookNumber(newBooks[i]);

                }

                this.books = newBooks;
                this.filteredBooks = newBooks;

            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBooks();

        },
        logout() {
            authService.logout();
            this.$router.push('/login');
        },
        searchBooks() {
            const query = this.searchQuery.toLowerCase();
            this.filteredBooks = this.books.filter((book) =>
                book.TenSach.toLowerCase().includes(query)
            );
        }


    },
    async mounted() {
        this.user = await authService.getProfile();
        if (!this.user) {
            alert("Bạn cần đăng nhập để truy cập trang này");
            this.$router.push('/login');
        }

        this.refreshList();
    },
}
</script>

<template>

    <div class="page row">
        <AppHeader :userName="user?.HoLot + ' ' + user?.Ten" @logout="logout" />

        <div class="row mt-3">
            <button class="btn btn-primary d-flex align-items-center col-lg-3 mx-2"
                @click="this.$router.push('/borrow')">

                <i class="fas fa-book mr-2"></i>
                <router-link to="/borrow" class="mx-2 text-white text-decoration-none">Xem sách đã mượn</router-link>
            </button>
            <button class="btn btn-secondary d-flex align-items-center col-lg-3 mx-2"
                @click="this.$router.push('/info')">
                <i class="fas fa-user mr-2"></i>
                <router-link to="/info" class="mx-2 text-white text-decoration-none">Xem thông tin người
                    dùng</router-link>
            </button>
        </div>

        <div class="row mt-3">
            <div class="col-md-8">
                <input type="text" class="form-control" placeholder="Tìm kiếm sách theo tên..." v-model="searchQuery"
                    @input="searchBooks" />
            </div>
        </div>
        <div class="mt-3">
            <BookList :books="filteredBooks" />
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