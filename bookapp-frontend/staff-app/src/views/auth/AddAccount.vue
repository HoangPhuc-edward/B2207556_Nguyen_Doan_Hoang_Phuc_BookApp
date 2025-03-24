<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import authService from "@/services/auth.service";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            form: {
                HoTenNV: "",
                ChucVu: "",
                DiaChi: "",
                SoDienThoai: "",
                Password: "",
                NhapLaiMatKhau: "",
            },
            formSchema: yup.object().shape({
                HoTenNV: yup
                    .string()
                    .min(6, "Họ tên phải có ít nhất 6 ký tự")
                    .required("Vui lòng nhập họ tên"),
                ChucVu: yup
                    .string()
                    .oneOf(["Nhân viên", "Quản lý"], "Chức vụ không hợp lệ")
                    .required("Vui lòng chọn chức vụ"),
                DiaChi: yup.string().required("Vui lòng nhập địa chỉ"),
                SoDienThoai: yup
                    .string()
                    .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Số điện thoại không hợp lệ")
                    .required("Vui lòng nhập số điện thoại"),
                Password: yup
                    .string()
                    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
                    .required("Vui lòng nhập mật khẩu"),
                NhapLaiMatKhau: yup
                    .string()
                    .oneOf([yup.ref("Password")], "Mật khẩu nhập lại không khớp")
                    .required("Vui lòng nhập lại mật khẩu"),
            }),
        };
    },
    methods: {
        async submit() {
            authService.register(this.form).then(
                (res) => {
                    alert("Tạo nhân viên thành công");
                    this.$router.push("home");
                },
                (error) => {
                    if (error.status === 409) {
                        alert("Số điện thoại đã tồn tại");
                    }
                }
            );
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
                            <i class="fas fa-user-plus"></i> Thêm Nhân Viên
                        </h4>
                    </div>
                    <div class="card-body">
                        <Form @submit="submit" :validation-schema="formSchema">
                            <div class="form-group mb-3">
                                <label for="HoTenNV" class="form-label">
                                    <i class="fas fa-user"></i> Họ tên nhân viên
                                </label>
                                <Field class="form-control" name="HoTenNV" type="text" v-model="form.HoTenNV" />
                                <ErrorMessage name="HoTenNV" class="text-danger small" />
                            </div>

                            <div class="form-group mb-3">
                                <label for="ChucVu" class="form-label">
                                    <i class="fas fa-briefcase"></i> Chức vụ
                                </label>
                                <Field as="select" class="form-control" name="ChucVu" v-model="form.ChucVu">
                                    <option value="">-- Chọn chức vụ --</option>
                                    <option value="Nhân viên">Nhân viên</option>
                                    <option value="Quản lý">Quản lý</option>
                                </Field>
                                <ErrorMessage name="ChucVu" class="text-danger small" />
                            </div>

                            <div class="form-group mb-3">
                                <label for="DiaChi" class="form-label">
                                    <i class="fas fa-map-marker-alt"></i> Địa chỉ
                                </label>
                                <Field class="form-control" name="DiaChi" type="text" v-model="form.DiaChi" />
                                <ErrorMessage name="DiaChi" class="text-danger small" />
                            </div>

                            <div class="form-group mb-3">
                                <label for="SoDienThoai" class="form-label">
                                    <i class="fas fa-phone"></i> Số điện thoại
                                </label>
                                <Field class="form-control" name="SoDienThoai" type="text" v-model="form.SoDienThoai" />
                                <ErrorMessage name="SoDienThoai" class="text-danger small" />
                            </div>

                            <div class="form-group mb-3">
                                <label for="Password" class="form-label">
                                    <i class="fas fa-lock"></i> Mật khẩu
                                </label>
                                <Field class="form-control" name="Password" type="password" v-model="form.Password" />
                                <ErrorMessage name="Password" class="text-danger small" />
                            </div>

                            <div class="form-group mb-3">
                                <label for="NhapLaiMatKhau" class="form-label">
                                    <i class="fas fa-lock"></i> Nhập lại mật khẩu
                                </label>
                                <Field class="form-control" name="NhapLaiMatKhau" type="password"
                                    v-model="form.NhapLaiMatKhau" />
                                <ErrorMessage name="NhapLaiMatKhau" class="text-danger small" />
                            </div>

                            <div class="d-flex justify-content-between">
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-save"></i> Tạo nhân viên
                                </button>
                                <button type="button" class="btn btn-danger" @click="$router.push('home')">
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
