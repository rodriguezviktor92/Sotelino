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

      fetchPaints(currentPage, category, name)
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
      fetchPaints(0, category, name)
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

  useEffect(() => {
    console.log(name);
    if (name) {
      setCurrentPage(0);
      setLoading(true);
      fetchPaints(0, category, name)
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
    } else {
      setCurrentPage(0);
      setLoading(true);
      fetchPaints(0, category, name)
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
  }, [name]);

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
