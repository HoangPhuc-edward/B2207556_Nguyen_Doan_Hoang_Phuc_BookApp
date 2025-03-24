<script>
import borrowService from '@/services/borrow.service';
import { formatDate } from '@/utils/utils';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
    components: {
        AppHeader,
        AppFooter,
    },
    data() {
        return {
            borrows: [],
            filteredBorrows: [],
            activeIndex: 0,
            searchQuery: '',
            currentPage: 1,
            itemsPerPage: 5, // Number of items per page
        };
    },
    computed: {
        getActiveBorrow() {
            if (this.activeIndex === -1) {
                return null;
            }
            return this.filteredBorrows[this.activeIndex];
        },
        paginatedBorrows() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredBorrows.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredBorrows.length / this.itemsPerPage);
        },
    },
    methods: {
        setActiveIndex(index) {
            this.activeIndex = index;
        },
        async getBorrows() {
            try {
                const newBorrows = await borrowService.getAll();
                newBorrows.forEach((borrow) => {
                    borrow.NgayMuon = formatDate(borrow.NgayMuon);
                    borrow.NgayTra = formatDate(borrow.NgayTra);
                    borrow.NgayPhaiTra = formatDate(borrow.NgayPhaiTra);
                });
                this.borrows = newBorrows;
                this.filteredBorrows = newBorrows;
            } catch (error) {
                console.log(error);
            }
        },
        goToBorrowForm(borrowid) {
            this.$router.push({ name: 'borrow.form', params: { id: borrowid } });
        },
        searchBorrows() {
            const query = this.searchQuery.toLowerCase();
            this.filteredBorrows = this.borrows.filter((borrow) =>
                borrow.MaSach.TenSach.toLowerCase().includes(query) ||
                borrow.MaDocGia.HoLot.toLowerCase().includes(query) ||
                borrow.MaDocGia.Ten.toLowerCase().includes(query)
            );
            this.currentPage = 1;
        },
        goToPage(page) {
            this.currentPage = page;
        },
    },
    mounted() {
        this.getBorrows();
    },
};
</script>

<template>
    <div class="page container mt-4">
        <AppHeader />
        <div class="row">
            <div class="col-md-12 text-end mb-3">
                <router-link to="/home" class="btn btn-outline-secondary">
                    <i class="fas fa-arrow-left"></i> Trở về trang chủ
                </router-link>
            </div>
            <div class="col-md-6">
                <div class="card shadow-sm">
                    <div class="card-header bg-primary text-white">
                        <h4 class="mb-0">
                            <i class="fas fa-list"></i> Danh sách mượn
                        </h4>
                    </div>
                    <div class="card-body">
                        <!-- Search Bar -->
                        <div class="mb-3">
                            <input type="text" class="form-control"
                                placeholder="Tìm kiếm theo tên sách hoặc người mượn..." v-model="searchQuery"
                                @input="searchBorrows" />
                        </div>
                        <ul class="list-group">
                            <li class="list-group-item" v-for="(borrow, index) in paginatedBorrows" :key="borrow.id"
                                :class="{ active: index + (currentPage - 1) * itemsPerPage === activeIndex }"
                                @click="setActiveIndex(index + (currentPage - 1) * itemsPerPage)">
                                <h5 class="mb-1 text-primary">{{ borrow.MaSach.TenSach }}</h5>
                                <p class="mb-0">
                                    <strong>Người mượn:</strong> {{ borrow.MaDocGia.HoLot }} {{ borrow.MaDocGia.Ten
                                    }}
                                </p>
                                <small class="text-muted">
                                    <strong>Ngày mượn:</strong> {{ borrow.NgayMuon }}
                                </small>
                            </li>
                        </ul>
                        <!-- Pagination -->
                        <nav class="mt-3">
                            <ul class="pagination justify-content-center">
                                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                    <button class="page-link" @click="goToPage(currentPage - 1)"
                                        :disabled="currentPage === 1">
                                        Trước
                                    </button>
                                </li>
                                <li class="page-item" v-for="page in totalPages" :key="page"
                                    :class="{ active: currentPage === page }">
                                    <button class="page-link" @click="goToPage(page)">{{ page }}</button>
                                </li>
                                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                    <button class="page-link" @click="goToPage(currentPage + 1)"
                                        :disabled="currentPage === totalPages">
                                        Sau
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <!-- Borrow Details -->
            <div v-if="getActiveBorrow" class="col-md-6">
                <div class="card shadow-sm">
                    <div class="card-header bg-secondary text-white">
                        <h4 class="mb-0">
                            <i class="fas fa-info-circle"></i> Thông tin mượn
                        </h4>
                    </div>
                    <div class="card-body">
                        <p><strong>Tên Sách:</strong> {{ getActiveBorrow.MaSach.TenSach }}</p>
                        <p><strong>Người mượn:</strong> {{ getActiveBorrow.MaDocGia.HoLot }} {{
                            getActiveBorrow.MaDocGia.Ten }}</p>
                        <p><strong>Ngày mượn:</strong> {{ getActiveBorrow.NgayMuon }}</p>
                        <p><strong>Ngày trả:</strong> {{ getActiveBorrow.NgayTra }}</p>
                        <p><strong>Ngày phải trả:</strong> {{ getActiveBorrow.NgayPhaiTra }}</p>
                        <button class="btn btn-primary mt-3" @click="goToBorrowForm(getActiveBorrow._id)">
                            <i class="fas fa-edit"></i> Sửa
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <AppFooter />
    </div>
</template>

<style scoped>
.page {
    max-width: 1200px;
    margin: auto;
}

.list-group-item {
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.list-group-item:hover {
    background-color: #f8f9fa;
}

.list-group-item.active {
    background-color: #cbd5df;
}

.card {
    border-radius: 10px;
    overflow: hidden;
}

.card-header {
    border-bottom: 1px solid #ddd;
}
</style>