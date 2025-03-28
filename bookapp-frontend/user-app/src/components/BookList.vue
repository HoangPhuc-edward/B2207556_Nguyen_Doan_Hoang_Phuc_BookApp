<script>

export default {
    props: {
        books: { type: Array, default: [] },

    },
    data() {
        return {
            currentPage: 1,
            booksPerPage: 6
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.books.length / this.booksPerPage);
        },
        paginatedBooks() {
            const start = (this.currentPage - 1) * this.booksPerPage;
            return this.books.slice(start, start + this.booksPerPage);
        }
    },
    emits: ["navigate:book"],
    methods: {
        navigate(book) {
            this.$router.push({ name: 'bookInfo', params: { id: book._id } });
        },
        nextPage() {
            if (this.currentPage < this.totalPages) this.currentPage++;
        },
        prevPage() {
            if (this.currentPage > 1) this.currentPage--;
        }
    }
}
</script>

<template>
    <div class="book-container">
        <h5>Danh mục sách</h5>
        <div class="row">
            <div v-for="(book, index) in paginatedBooks" :key="book._id" class="book-card" @click="navigate(book)">
                <div class="book-image">
                    <img :src="book.HinhAnh" alt="Book Cover" />
                </div>
                <div class="book-info">
                    <h3>{{ book.TenSach }}</h3>
                    <p><strong>Tác giả:</strong> {{ book.TacGia }}</p>
                    <p><strong>Số quyển:</strong> {{ book.SoLuong }}</p>
                </div>
            </div>
        </div>




        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">«</button>
            <span>Trang {{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">»</button>
        </div>
    </div>
</template>

<style scoped>
.book-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.book-card {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 0.5rem;
    background: #fff;
    width: calc(50% - 10px);
    margin-right: 10px;
    margin-bottom: 12px;
}

.book-image img {
    width: 100px;
    height: 120px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 12px;
}

.book-info h3 {
    font-size: 18px;
    margin: 0;
}

.book-info p {
    margin: 5px 0;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
}

.pagination button {
    padding: 5px 10px;
    cursor: pointer;
}
</style>