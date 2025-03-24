import useApi from "./api.service";

class BorrowService {
  constructor(baseUrl = "/api/borrows") {
    this.api = useApi(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  async deleteAll() {
    return (await this.api.delete("/")).data;
  }

  async findByAttribute(attribute, value) {
    return (await this.api.get(`/find/${attribute}/${value}`)).data;
  }

  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new BorrowService();
