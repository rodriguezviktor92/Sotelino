import s from "./gallery.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterByCategory,
  filterByPrice,
  getCategories,
  searchPaintThatContains,
  resetTotalPages,
} from "../../redux/actions";
import Cards from "../../components/Cards/Cards";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

import { usePaints } from "../../hook/usePaints";

const Gallery = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [search, setSearch] = useState("");

  const { Paints, scrollToEnd, loading } = usePaints();

  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      scrollToEnd();
    }
  };

  const [filter, setFilter] = useState(false);

  useEffect(() => {
    dispatch(getCategories());

    return () => {
      dispatch(resetTotalPages(0));
    };
  }, []);

  const handleChange = (e) => {
    dispatch(searchPaintThatContains(e.target.value));
    setSearch(e.target.value);
  };

  const handleSelect = (e) => {
    let value = e.target.value;
    if (value === "All") {
      setFilter(false);
      return dispatch(filterByCategory(value));
    }
    if (value === "MAX" || value === "MIN") {
      setFilter(true);
      return dispatch(filterByPrice(value));
    }
    dispatch(filterByCategory(value));
    setFilter(true);
  };

  return (
    <>
      <NavBar />
      <div className={`text-white pt-24 ${s.container}`}>
        <h3 className="text-3xl border-b-2 inline-block ml-12">
          Galeria de obras:
        </h3>
        <div className="flex justify-end mr-24">
          <p className="mr-8 text-2xl self-center">Filtros:</p>

          <select
            name="filtros"
            className={`${s.selectInput}`}
            onChange={(e) => handleSelect(e)}
          >
            <option value="All">All</option>
            <optgroup label="Categorias">
              {categories?.map((category) => {
                return <option value={category?.name}>{category?.name}</option>;
              })}
            </optgroup>
            <optgroup label="Precio">
              <option value="MAX">Max-Min</option>
              <option value="MIN">Min-Max</option>
            </optgroup>
          </select>
          <input
            className={`${s.selectInput2} ml-3`}
            type="text"
            placeholder=" Buscar..."
            onChange={handleChange}
          />
        </div>

        <Cards cards={Paints} />

        {loading && (
          <div class="flex justify-center items-center text-2xl">
            Loading...
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Gallery;
