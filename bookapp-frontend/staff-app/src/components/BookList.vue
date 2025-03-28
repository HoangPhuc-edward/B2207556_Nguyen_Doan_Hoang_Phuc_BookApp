<script>

export default {
    props: {
        books: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 5,
        };
    },
    computed: {
        paginatedBooks() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.books.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.books.length / this.itemsPerPage);
        },
    },
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        goToPage(page) {
            this.currentPage = page;
        },
    },
};
</script>

<template>
    <div>
        <ul class="list-group">
            <li class="list-group-item" v-for="(book, index) in paginatedBooks"
                :class="{ active: index + (currentPage - 1) * itemsPerPage === activeIndex }" :key="book._id"
                @click="updateActiveIndex(index + (currentPage - 1) * itemsPerPage)">
                <h5>{{ book.TenSach }}</h5>
                <p>Tác giả: {{ book.TacGia }}</p>
            </li>
        </ul>

        <nav class="mt-3">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
                        Trước
                    </button>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                    <button class="page-link" @click="goToPage(page)">{{ page }}</button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
                        Sau
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style>
.list-group-item {
    cursor: pointer;
}

.list-group-item:hover {
    background-color: #f8f9fa;
}

.pagination .page-item.active .page-link {
    background-color: #007bff;
    border-color: #007bff;
    color: white;
}

.pagination .page-link {
    cursor: pointer;
}
</style>