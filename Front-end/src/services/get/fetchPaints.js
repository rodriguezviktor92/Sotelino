import Api from "../../interceptors/base";

export const fetchPaints = (currentPage) => {
  return Api.get(`/products?page=${currentPage}`).then((res) => res.data);
};
