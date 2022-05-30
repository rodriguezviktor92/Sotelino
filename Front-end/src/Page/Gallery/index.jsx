import s from "./gallery.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories, resetTotalPages } from "../../redux/actions";
import Cards from "../../components/Cards/Cards";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

import { usePaints } from "../../hook/usePaints";

const Gallery = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [search, setSearch] = useState("");

  const { Paints, scrollToEnd, loading, setName, setCategory } = usePaints();

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
    setName(e.target.value);
  };

  const handleSelect = (e) => {
    const value = e.target.value;
    console.log(value);

    if (value === "All") {
      setCategory(0);
    } else {
      setCategory(value);
    }
  };

  return (
    <>
      <NavBar />
      <div className={`grid text-white pt-40 ${s.container}`}>
        <div className="lg:flex lg:justify-between grid lg:mr-24 p-3">
          <h3 className="text-3xl border-b-2 inline-block lg:ml-12 ">
            Galeria de obras:
          </h3>
          <p className="mr-8 text-2xl self-center">Categorias:</p>

          <select
            name="filtros"
            className={`${s.selectInput} lg:w-48 lg:mt-2 w-full text-left`}
            onChange={(e) => handleSelect(e)}
          >
            <option value="0">Todas</option>
            <optgroup label="Categorías">
              {categories?.map((category) => {
                return (
                  <option value={category?.id_category}>
                    {category?.name}
                  </option>
                );
              })}
            </optgroup>
          </select>
          <input
            className={`${s.selectInput2} lg:ml-3 mt-2 w-full lg:w-64`}
            type="text"
            placeholder=" Buscar..."
            onChange={handleChange}
          />
        </div>

        <Cards cards={Paints} />

        {loading && (
          <div className="flex justify-center items-center text-2xl">
            Loading...
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Gallery;
