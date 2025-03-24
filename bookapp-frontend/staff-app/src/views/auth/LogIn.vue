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
                SoDienThoai: "",
                Password: "",
            },
            formSchema: yup.object().shape({
                SoDienThoai: yup
                    .string()
                    .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Số điện thoại không hợp lệ")
                    .required("Vui lòng nhập số điện thoại"),
                Password: yup
                    .string()
                    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
                    .required("Vui lòng nhập mật khẩu"),
            }),
            errors: {},
        };
    },
    methods: {
        async submit() {
            authService.login(this.form).then(
                (res) => {
                    localStorage.setItem("token", res.token);
                    console.log(res);
                    this.$router.push("home");
                },
                (error) => {
                    if (error.status === 404) {
                        alert("Số điện thoại không tồn tại");
                    } else if (error.status === 401) {
                        alert("Mật khẩu không chính xác");
                    }
                }
            );
        },
    },
};
</script>

<template>
    <div class="login-page">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card shadow-sm">
                        <div class="card-header text-white text-center" style="background-color: #8B4513;">
                            <h4 class="mb-0">
                                <i class="fas fa-sign-in-alt"></i> Đăng nhập
                            </h4>
                        </div>
                        <div class="card-body">
                            <Form @submit="submit" :validation-schema="formSchema">
                                <div class="form-group mb-3 " style="color: black">
                                    <label for="SoDienThoai" class="form-label">
                                        <i class="fas fa-phone"></i> Số điện thoại:
                                    </label>
                                    <Field id="SoDienThoai" class="form-control" name="SoDienThoai" type="text"
                                        v-model="form.SoDienThoai" />
                                    <ErrorMessage name="SoDienThoai" class="text-danger small" />
                                </div>

                                <div class="form-group mb-3" style="color: black">
                                    <label for="Password" class="form-label">
                                        <i class="fas fa-lock"></i> Mật khẩu:
                                    </label>
                                    <Field id="Password" class="form-control" name="Password" type="password"
                                        v-model="form.Password" />
                                    <ErrorMessage name="Password" class="text-danger small" />
                                </div>

                                <div class="d-grid">
                                    <button type="submit" class="btn" style="background-color: #8B4513; color: white;">
                                        <i class="fas fa-sign-in-alt"></i> Đăng nhập
                                    </button>
                                </div>
                            </Form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.login-page {
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("/background.jpg");
    /* Replace with your image path */
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    color: white;
}
</style>
