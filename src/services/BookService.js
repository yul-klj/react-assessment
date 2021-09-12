import http from "../http-common";

const getAll = () => {
  return http.get("/books?all=1");
};

const get = (id) => {
  return http.get(`/book/${id}`);
};

const create = (data) => {
  return http.post("/book", data);
};

const update = (id, data) => {
  return http.put(`/book/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/book/${id}`);
};

const search = (keyword) => {
  return http.get(`/books/search?all=1&keyword=${keyword}`);
};

const BookService = {
  getAll,
  get,
  create,
  update,
  remove,
  search
};

export default BookService;