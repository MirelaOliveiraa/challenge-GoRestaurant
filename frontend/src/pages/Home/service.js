import api from "../../services/api";

class HomeServices {
  static list() {
    return api.get("/pratos");
  }

  static delete(id) {
    return api.delete(`/pratos/${id}`);
  }

  static create(data) {
    return api.post("/pratos", data);
  }
}
export default HomeServices;
