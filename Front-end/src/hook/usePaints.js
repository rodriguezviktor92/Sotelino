import { fetchPaints } from "../services/get/fetchPaints";
import { useEffect, useState } from "react";

export function usePaints() {
  const [currentPage, setCurrentPage] = useState(0);
  const [Paints, setPaints] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentPage || !Paints.length) {
      setLoading(true);
      //dispatch(fetchPaints(currentPage));
      fetchPaints(currentPage)
        .then((paints) => {
          console.log(paints.content);
          setPaints(Paints.concat(paints.content));
        })
        .catch((error) => {
          new Error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [currentPage]);

  const scrollToEnd = () => {
    setCurrentPage(currentPage + 1);
  };

  return {
    Paints,
    scrollToEnd,
    loading,
  };
}
