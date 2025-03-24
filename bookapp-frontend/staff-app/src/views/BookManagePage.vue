<script>
import bookService from '@/services/book.service';
import BookList from '@/components/BookList.vue';
import BookCard from '@/components/BookCard.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
export default {
    components: {
        BookList,
        BookCard,
        AppHeader,
        AppFooter,
    },
    data() {
        return {
            books: [],
            activeIndex: -1,
        };
    },
    computed: {
        activeBook() {
            if (this.activeIndex < 0) return null;
            return this.books[this.activeIndex];
        },
    },
    methods: {
        setActiveIndex(index) {
            this.activeIndex = index;
        },
        async retrieveBooks() {
            try {
                this.books = await bookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async deleteBook(id) {
            const reply = window.confirm('Bạn có chắc chắn muốn xóa không?');
            if (!reply) {
                return false;
            } else {
                try {
                    await bookService.delete(id);
                    alert('Xóa sách thành công');
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        refreshList() {
            this.retrieveBooks();
        },
        goToAddBook() {
            this.$router.push({ name: 'book.form', params: { id: '0' } });
        },
        goToEditBook() {
            this.$router.push({ name: 'book.form', params: { id: this.activeBook._id } });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>

<template>
    <AppHeader />
    <div class="page row mt-4">
        <div class="col-md-12 text-end mb-3">
            <router-link to="/home" class="btn btn-outline-secondary">
                <i class="fas fa-arrow-left"></i> Trở về trang chủ
            </router-link>
            <button class="btn btn-primary" @click="goToAddBook" style="margin-left: 8px">
                <i class="fas fa-plus"></i> Thêm sách
            </button>

        </div>

        <div class="col-md-6">
            <h5 class="text-primary"><i class="fas fa-list"></i> Danh sách</h5>
            <BookList :books="books" :activeIndex="activeIndex" @update:activeIndex="setActiveIndex" />
        </div>


        <div class="col-md-6">
            <h5 class="text-primary"><i class="fas fa-info-circle"></i> Thông tin sách</h5>
            <div v-if="activeBook" class="card shadow-sm p-3">
                <BookCard :book="activeBook" />
                <div class="mt-3 text-end">
                    <button class="btn btn-warning me-2" @click="goToEditBook">
                        <i class="fas fa-edit"></i> Sửa sách
                    </button>
                    <button class="btn btn-danger" style="margin-left: 10px" @click="deleteBook(activeBook._id)">
                        <i class="fas fa-trash"></i> Xóa sách
                    </button>
                </div>
            </div>
            <div v-else class="text-muted">
                <p>Chọn một sách từ danh sách để xem thông tin chi tiết.</p>
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

.btn {
    transition: all 0.3s ease;
}

.btn:hover {
    transform: scale(1.05);
}

.card {
    border: 1px solid #ddd;
    border-radius: 10px;
}
</style>