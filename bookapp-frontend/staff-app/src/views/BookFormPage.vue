<script>
import BookForm from '@/components/BookForm.vue';
import bookService from '@/services/book.service';
import { reactive } from "vue";

export default {
    components: {
        BookForm
    },
    data() {
        return {
            book: reactive({}),
            message: "Thêm sách",
            buttonMsg: "Thêm",
            id: this.$route.params.id
        };
    },
    methods: {
        async addBook(data) {
            try {
                await bookService.create(data);
                alert('Thêm sách thành công');
                this.$router.push({ name: "book" });
            } catch (error) {
                console.log(error);
            }
        },

        async editBook(data) {
            try {
                await bookService.update(this.id, data);
                alert('Sửa sách thành công');
                this.$router.push({ name: "book" });
            } catch (error) {
                console.log(error);
            }
        },

        async submitBook(data) {
            if (this.id === "0") {
                this.addBook(data);
            } else {
                this.editBook(data);
            }
        },

        async getBook(id) {
            try {
                const newBook = await bookService.get(id);
                newBook.MaNXB = newBook.MaNXB._id
                Object.assign(this.book, newBook);
            } catch (error) {
                console.log(error);
            }
        }


    },

    created() {
        if (this.id !== "0") {
            this.getBook(this.id);
            this.message = "Sửa sách";
            this.buttonMsg = "Sửa";
        }
    }
}
</script>

<template>
    <div v-if="book" class="page">
        <BookForm :book="book" @submit:book="submitBook" :button-message="buttonMsg" />
    </div>
</template>