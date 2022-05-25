import Api from "../../interceptors/base";

export const fetchPaints = (currentPage, category, name) => {
  return Api.get(
    `/products?page=${currentPage}&category=${category}&name=${name}`
  ).then((res) => res.data);
};
