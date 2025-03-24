<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:publisher", "delete:publisher"],
    props: {
        publisher: { type: Object, required: true },
        buttonMessage: { type: String, default: "Thêm" },
    },
    data() {
        const publisherFormSchema = yup.object().shape({
            TenNXB: yup
                .string()
                .required("Tên NXB phải có giá trị.")
                .min(2, "Tên NXB phải ít nhất 2 ký tự."),
            DiaChi: yup
                .string()
                .required("Địa chỉ phải có giá trị.")
                .min(2, "Địa chỉ phải ít nhất 2 ký tự."),
        });
        return {
            publisherLocal: this.publisher,
            publishers: [],
            publisherFormSchema,
        };
    },
    methods: {
        submitContact() {
            console.log(this.publisherLocal);
            this.$emit("submit:publisher", this.publisherLocal);
        },
        deleteContact() {
            this.$emit("delete:publisher", this.publisherLocal.id);
        },
        Cancel() {
            const reply = window.confirm("Bạn có chắc chắn muốn thoát không?");
            if (!reply) {
                return false;
            } else this.$router.push({ name: "publisher" });
        },
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
                            <i class="fas fa-building"></i> Quản lý Nhà Xuất Bản
                        </h4>
                    </div>
                    <div class="card-body">
                        <Form @submit="submitContact" :validation-schema="publisherFormSchema">
                            <div class="form-group mb-3">
                                <label for="TenNXB" class="form-label">
                                    <i class="fas fa-tag"></i> Tên NXB
                                </label>
                                <Field name="TenNXB" type="text" class="form-control" v-model="publisherLocal.TenNXB" />
                                <ErrorMessage name="TenNXB" class="text-danger small" />
                            </div>
                            <div class="form-group mb-3">
                                <label for="DiaChi" class="form-label">
                                    <i class="fas fa-map-marker-alt"></i> Địa chỉ
                                </label>
                                <Field name="DiaChi" type="text" class="form-control" v-model="publisherLocal.DiaChi" />
                                <ErrorMessage name="DiaChi" class="text-danger small" />
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
