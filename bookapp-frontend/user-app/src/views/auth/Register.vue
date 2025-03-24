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
                HoLot: "",
                Ten: "",
                NgaySinh: "",
                Phai: "",
                DiaChi: "",
                DienThoai: "",
                Password: "",
                NhapLaiMatKhau: "",
            },
            formSchema: yup.object().shape({
                HoLot: yup
                    .string()
                    .min(2, "Họ lót phải có ít nhất 2 ký tự")
                    .required("Vui lòng nhập họ lót"),
                Ten: yup
                    .string()
                    .min(2, "Tên phải có ít nhất 2 ký tự")
                    .required("Vui lòng nhập tên"),
                NgaySinh: yup.date().required("Vui lòng nhập ngày sinh"),
                Phai: yup
                    .string()
                    .oneOf(["Nam", "Nữ"], "Giới tính không hợp lệ")
                    .required("Vui lòng chọn giới tính"),
                DiaChi: yup
                    .string()
                    .min(6, "Địa chỉ phải có ít nhất 6 ký tự")
                    .required("Vui lòng nhập địa chỉ"),
                DienThoai: yup
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
            console.log(this.form);
            authService.register(this.form).then(
                (res) => {
                    alert("Tạo tài khoản thành công");
                    localStorage.setItem("token", res.token);

                    this.$router.push("home");
                },
                (error) => {
                    alert(error.message);
                }
            );
        },
    },
};
</script>

<template>
    <div class="register-page">
        <div class="container">
            <div class="row justify-content-center my-4">
                <div class="col-md-8">
                    <div class="card shadow-sm">
                        <div class="card-header text-white text-center" style="background-color: #8B4513;">
                            <h4 class="mb-0">
                                <i class="fas fa-user-plus"></i> Đăng ký tài khoản
                            </h4>
                        </div>
                        <div class="card-body">
                            <Form @submit="submit" :validation-schema="formSchema">
                                <div class="form-group mb-3">
                                    <label for="HoLot" class="form-label">
                                        <i class="fas fa-user"></i> Họ lót:
                                    </label>
                                    <Field id="HoLot" class="form-control" name="HoLot" type="text"
                                        v-model="form.HoLot" />
                                    <ErrorMessage name="HoLot" class="text-danger small" />
                                </div>

                                <div class="form-group mb-3">
                                    <label for="Ten" class="form-label">
                                        <i class="fas fa-user"></i> Tên:
                                    </label>
                                    <Field id="Ten" class="form-control" name="Ten" type="text" v-model="form.Ten" />
                                    <ErrorMessage name="Ten" class="text-danger small" />
                                </div>

                                <div class="form-group mb-3">
                                    <label for="NgaySinh" class="form-label">
                                        <i class="fas fa-calendar-alt"></i> Ngày sinh:
                                    </label>
                                    <Field id="NgaySinh" class="form-control" name="NgaySinh" type="date"
                                        v-model="form.NgaySinh" />
                                    <ErrorMessage name="NgaySinh" class="text-danger small" />
                                </div>

                                <div class="form-group mb-3">
                                    <label for="Phai" class="form-label">
                                        <i class="fas fa-venus-mars"></i> Giới tính:
                                    </label>
                                    <Field as="select" id="Phai" class="form-control" name="Phai" v-model="form.Phai">
                                        <option value="">-- Chọn giới tính --</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </Field>
                                    <ErrorMessage name="Phai" class="text-danger small" />
                                </div>

                                <div class="form-group mb-3">
                                    <label for="DiaChi" class="form-label">
                                        <i class="fas fa-map-marker-alt"></i> Địa chỉ:
                                    </label>
                                    <Field id="DiaChi" class="form-control" name="DiaChi" type="text"
                                        v-model="form.DiaChi" />
                                    <ErrorMessage name="DiaChi" class="text-danger small" />
                                </div>

                                <div class="form-group mb-3">
                                    <label for="DienThoai" class="form-label">
                                        <i class="fas fa-phone"></i> Số điện thoại:
                                    </label>
                                    <Field id="DienThoai" class="form-control" name="DienThoai" type="text"
                                        v-model="form.DienThoai" />
                                    <ErrorMessage name="DienThoai" class="text-danger small" />
                                </div>

                                <div class="form-group mb-3">
                                    <label for="Password" class="form-label">
                                        <i class="fas fa-lock"></i> Mật khẩu:
                                    </label>
                                    <Field id="Password" class="form-control" name="Password" type="password"
                                        v-model="form.Password" />
                                    <ErrorMessage name="Password" class="text-danger small" />
                                </div>

                                <div class="form-group mb-3">
                                    <label for="NhapLaiMatKhau" class="form-label">
                                        <i class="fas fa-lock"></i> Nhập lại mật khẩu:
                                    </label>
                                    <Field id="NhapLaiMatKhau" class="form-control" name="NhapLaiMatKhau"
                                        type="password" v-model="form.NhapLaiMatKhau" />
                                    <ErrorMessage name="NhapLaiMatKhau" class="text-danger small" />
                                </div>

                                <div class="d-grid">
                                    <button type="submit" class="btn" style="background-color: #8B4513; color: white;">
                                        <i class="fas fa-user-plus"></i> Đăng ký
                                    </button>
                                </div>
                            </Form>
                        </div>
                        <div class="card-footer text-center">
                            <p class="mb-0">
                                Đã có tài khoản?
                                <router-link to="/login" style="color: #8B4513;">
                                    <i class="fas fa-sign-in-alt"></i> Đăng nhập
                                </router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.register-page {
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("/background.jpg");
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    width: 100%;
}
</style>
