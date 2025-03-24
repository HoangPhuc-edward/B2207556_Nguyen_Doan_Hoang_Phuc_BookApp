<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { reactive } from "vue";
import borrowService from "@/services/borrow.service";
import { formatDate, formatFormDate } from "@/utils/utils";
import authService from "@/services/auth.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:borrow", "delete:borrow"],
    data() {
        const borrowFormSchema = yup.object().shape({
            TenDocGia: yup.string(),

            TenSach: yup.string(),

            TenNVMuon: yup.string(),

            TenNVTra: yup.string(),

            NgayMuon: yup.date(),

            NgayTra: yup.date().nullable()
                .min(yup.ref('NgayMuon'), "Ngày trả phải sau ngày mượn."),

            NgayPhaiTra: yup.date(),

        });
        return {
            borrowLocal: reactive({}),
            borrowFormSchema,
            id: this.$route.params.id
        };
    },
    methods: {
        async getBorrow(id) {
            try {
                const newBorrow = await borrowService.get(id);
                console.log(newBorrow)
                const data = {
                    TenDocGia: newBorrow.MaDocGia.HoLot + " " + newBorrow.MaDocGia.Ten,

                    TenSach: newBorrow.MaSach.TenSach,

                    TenNVMuon: newBorrow.MaNVMuon.HoTenNV,

                    TenNVTra: newBorrow.MaNVTra?.HoTenNV,

                    NgayMuon: formatFormDate(newBorrow.NgayMuon),

                    NgayTra: newBorrow.NgayTra ? formatFormDate(newBorrow.NgayTra) : null,

                    NgayPhaiTra: formatFormDate(newBorrow.NgayPhaiTra),
                }
                Object.assign(this.borrowLocal, data);
            } catch (error) {
                console.log(error);
            }
        },

        async submitBorrow() {
            this.user = authService.getProfile();
            this.borrowLocal.MaNVTra = this.user._id;

            try {
                await borrowService.update(this.id, this.borrowLocal);
                alert("Sửa thông tin mượn thành công!");
                this.$router.push({ name: "borrow" });
            } catch (error) {
                console.log(error);
            }


        },

        cancel() {
            const reply = window.confirm('Bạn có chắc chắn muốn thoát không?');
            if (reply) {
                this.$router.push({ name: "borrow" });
            }
        },
    },
    created() {
        if (this.id !== "0") {
            this.getBorrow(this.id);
        }
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>

<template>
    <Form @submit="submitBorrow" :validation-schema="borrowFormSchema">
        <div class="form-group">
            <label for="TenDocGia">Tên độc giả</label>
            <Field name="TenDocGia" type="text" class="form-control" v-model="borrowLocal.TenDocGia" disabled />
            <ErrorMessage name="TenDocGia" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="TenSach">Mã sách</label>
            <Field name="TenSach" type="text" class="form-control" v-model="borrowLocal.TenSach" />
            <ErrorMessage name="TenSach" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="TenNVMuon">Mã nhân viên mượn</label>
            <Field name="TenNVMuon" type="text" class="form-control" v-model="borrowLocal.TenNVMuon" />
            <ErrorMessage name="TenNVMuon" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="NgayMuon">Ngày mượn</label>
            <Field name="NgayMuon" type="date" class="form-control" v-model="borrowLocal.NgayMuon" />
            <ErrorMessage name="NgayMuon" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="NgayPhaiTra">Ngày phải trả</label>
            <Field name="NgayPhaiTra" type="date" class="form-control" v-model="borrowLocal.NgayPhaiTra" />
            <ErrorMessage name="NgayPhaiTra" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="NgayTra">Ngày trả</label>
            <Field name="NgayTra" type="date" class="form-control" v-model="borrowLocal.NgayTra" />
            <ErrorMessage name="NgayTra" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Sửa</button>
            <button type="button" class="ml-2 btn btn-danger" @click="cancel">
                Thoát
            </button>
        </div>
    </Form>
</template>
