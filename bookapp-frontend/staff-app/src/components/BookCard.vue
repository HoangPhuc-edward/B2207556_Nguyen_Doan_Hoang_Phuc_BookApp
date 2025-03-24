<script>
export default {
    props: {
        book: { type: Object, required: true },
    },
};
</script>

<template>
    <div class="card shadow-sm h-100">

        <img :src="book.HinhAnh" alt="Bìa sách" class="card-img-top" style="object-fit: cover; height: 200px;" />
        <div class="card-body">
            <h5 class="card-title text-primary fw-bold">{{ book.TenSach }}</h5>
            <p class="card-text mb-1">
                <strong>Tác giả:</strong> {{ book.TacGia }}
            </p>
            <p class="card-text mb-1">
                <strong>Đơn giá:</strong> {{ book.DonGia }} VND
            </p>
            <p class="card-text mb-1">
                <strong>Số quyển:</strong> {{ book.SoQuyen }}
            </p>
            <p class="card-text mb-1">
                <strong>Nhà xuất bản:</strong> {{ book.MaNXB.TenNXB }}
            </p>
            <p class="card-text">
                <strong>Năm xuất bản:</strong> {{ book.NamXuatBan }}
            </p>
        </div>
    </div>
</template>

<style>
.card {
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}


.card-img-top {
    border-bottom: 1px solid #ddd;
}
</style>