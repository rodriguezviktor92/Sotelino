import Api from "../../interceptors/base";

export const fetchPaints = (currentPage, category) => {
  return Api.get(`/products?page=${currentPage}&category=${category}`).then(
    (res) => res.data
  );
};
