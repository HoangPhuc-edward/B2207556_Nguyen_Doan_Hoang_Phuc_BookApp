import useApi from "./api.service";
import axios from "axios";

class AuthService {
  constructor(baseUrl = "/api/auth") {
    this.api = useApi(baseUrl);
  }

  async login(data) {
    return (await this.api.post("/loginNV", data)).data;
  }

  async register(data) {
    return (await this.api.post("/registerNV", data)).data;
  }

  async logout() {
    localStorage.removeItem("token");
  }

  async getProfile() {
    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
      const res = await axios.get(`http://localhost:3000/api/auth/verifyNV`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new AuthService();
