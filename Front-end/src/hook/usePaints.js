import { fetchPaints } from "../services/get/fetchPaints";
import { useEffect, useState } from "react";

export function usePaints() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalpages, setTotalpages] = useState(0);
  const [Paints, setPaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(0);

  useEffect(() => {
    if (currentPage || !Paints.length) {
      setLoading(true);

      fetchPaints(currentPage, category)
        .then((paints) => {
          setPaints(Paints.concat(paints.content));
          setTotalpages(paints.totalPages - 1);
        })
        .catch((error) => {
          new Error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [currentPage]);

  useEffect(() => {
    if (category !== 0) {
      setCurrentPage(0);
      setLoading(true);
      fetchPaints(0, category)
        .then((paints) => {
          setPaints(paints.content);
          setTotalpages(paints.totalPages - 1);
        })
        .catch((error) => {
          new Error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [category]);

  const scrollToEnd = () => {
    if (currentPage < totalpages) setCurrentPage(currentPage + 1);
  };

  return {
    Paints,
    scrollToEnd,
    loading,
    setName,
    setCategory,
  };
}
