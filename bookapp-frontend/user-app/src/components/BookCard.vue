<script>
export default {
    props: {
        book: { type: Object, default: {} },
    },
}
</script>

<template>
    <div class="card">
        <img :src="book.HinhAnh" alt="Bìa sách">
        <h5>{{ book.TenSach }}</h5>
        <p>Tác giả: {{ book.TacGia }}</p>
        <p>Đơn giá: {{ book.DonGia }}</p>
        <p>Số quyển: {{ book.SoQuyen }}</p>
        <p>Năm xuất bản: {{ book.MaNXB.TenNXB }}</p>
    </div>
</template>