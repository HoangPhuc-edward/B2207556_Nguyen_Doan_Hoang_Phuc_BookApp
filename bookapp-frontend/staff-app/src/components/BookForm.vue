<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import publisherService from "@/services/publisher.service";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:book", "delete:book"],
    props: {
        book: { type: Object, required: true },
        buttonMessage: { type: String, default: "Thêm" },
    },
    data() {
        const bookFormSchema = yup.object().shape({
            TenSach: yup.string().required("Tên phải có giá trị.").min(2, "Tên phải ít nhất 2 ký tự."),
            TacGia: yup.string().required("Tên phải có giá trị.").min(2, "Tên phải ít nhất 2 ký tự."),
            MoTa: yup.string(),
            DonGia: yup.number().required("Đơn giá phải có giá trị."),
            SoQuyen: yup.number().required("Số quyển phải có giá trị."),
            NamXuatBan: yup.number().required("Năm xuất bản phải có giá trị."),
            SoNgayMuon: yup.number().required("Số ngày mượn phải có giá trị."),
            HinhAnh: yup.string().required("Hình ảnh phải có giá trị.").url("Hình ảnh không hợp lệ."),
        });
        return {
            bookLocal: this.book,
            publishers: [],
            bookFormSchema,
        };
    },
    methods: {
        submitContact() {
            console.log(this.bookLocal);
            this.$emit("submit:book", this.bookLocal);
        },
        deleteContact() {
            this.$emit("delete:book", this.bookLocal.id);
        },
        Cancel() {
            const reply = window.confirm("Bạn có chắc chắn muốn thoát không?");
            if (!reply) {
                return false;
            } else this.$router.push({ name: "book" });
        },
        async getPublishers() {
            try {
                this.publishers = await publisherService.getAll();
                console.log(this.publishers);
            } catch (error) {
                console.log(error);
            }
        },
        refresh() {
            this.getPublishers();
        },
    },
    created() {
        this.refresh();
    },
};
</script>

<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card shadow-sm">
                    <div class="card-header bg-primary text-white text-center">
                        <h4 class="mb-0">
                            <i class="fas fa-book"></i> Quản lý Sách
                        </h4>
                    </div>
                    <div class="card-body">
                        <Form @submit="submitContact" :validation-schema="bookFormSchema">
                            <div class="form-group mb-3">
                                <label for="TenSach" class="form-label">
                                    <i class="fas fa-tag"></i> Tên Sách
                                </label>
                                <Field name="TenSach" type="text" class="form-control" v-model="bookLocal.TenSach" />
                                <ErrorMessage name="TenSach" class="text-danger small" />
                            </div>
                            <div class="form-group mb-3">
                                <label for="TacGia" class="form-label">
                                    <i class="fas fa-user"></i> Tác Giả
                                </label>
                                <Field name="TacGia" type="text" class="form-control" v-model="bookLocal.TacGia" />
                                <ErrorMessage name="TacGia" class="text-danger small" />
                            </div>
                            <div class="form-group mb-3">
                                <label for="MoTa" class="form-label">
                                    <i class="fas fa-info-circle"></i> Mô Tả
                                </label>
                                <Field name="MoTa" type="text" class="form-control" v-model="bookLocal.MoTa" />
                                <ErrorMessage name="MoTa" class="text-danger small" />
                            </div>
                            <div class="form-group mb-3">
                                <label for="SoNgayMuon" class="form-label">
                                    <i class="fas fa-calendar-alt"></i> Số Ngày Mượn
                                </label>
                                <Field name="SoNgayMuon" type="number" class="form-control"
                                    v-model="bookLocal.SoNgayMuon" />
                                <ErrorMessage name="SoNgayMuon" class="text-danger small" />
                            </div>
                            <div class="form-group mb-3">
                                <label for="HinhAnh" class="form-label">
                                    <i class="fas fa-image"></i> Hình Ảnh
                                </label>
                                <Field name="HinhAnh" type="text" class="form-control" v-model="bookLocal.HinhAnh" />
                                <ErrorMessage name="HinhAnh" class="text-danger small" />
                            </div>
                            <div class="form-group mb-3">
                                <label for="SoQuyen" class="form-label">
                                    <i class="fas fa-book"></i> Số Quyển
                                </label>
                                <Field name="SoQuyen" type="number" class="form-control" v-model="bookLocal.SoQuyen" />
                                <ErrorMessage name="SoQuyen" class="text-danger small" />
                            </div>
                            <div class="form-group mb-3">
                                <label for="DonGia" class="form-label">
                                    <i class="fas fa-dollar-sign"></i> Đơn Giá
                                </label>
                                <Field name="DonGia" type="number" class="form-control" v-model="bookLocal.DonGia" />
                                <ErrorMessage name="DonGia" class="text-danger small" />
                            </div>
                            <div class="form-group mb-3">
                                <label for="NamXuatBan" class="form-label">
                                    <i class="fas fa-calendar"></i> Năm Xuất Bản
                                </label>
                                <Field name="NamXuatBan" type="number" class="form-control"
                                    v-model="bookLocal.NamXuatBan" />
                                <ErrorMessage name="NamXuatBan" class="text-danger small" />
                            </div>
                            <div class="form-group mb-3">
                                <label for="MaNXB" class="form-label">
                                    <i class="fas fa-building"></i> Nhà Xuất Bản
                                </label>
                                <select v-model="bookLocal.MaNXB" class="form-control">
                                    <option v-for="publisher in publishers" :value="publisher._id" :key="publisher._id">
                                        {{ publisher.TenNXB }}
                                    </option>
                                </select>
                            </div>
                            <div class="d-flex justify-content-between">
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-save"></i> {{ this.buttonMessage }}
                                </button>
                                <button type="button" class="btn btn-danger" @click="Cancel">
                                    <i class="fas fa-times"></i> Thoát
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    border-radius: 10px;
    overflow: hidden;
}

.card-header {
    border-bottom: 1px solid #ddd;
}

.form-group label {
    font-weight: bold;
}

.btn {
    transition: all 0.3s ease;
}

.btn:hover {
    transform: scale(1.05);
}
</style>
