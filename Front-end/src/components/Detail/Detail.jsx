import { useSelector } from "react-redux";
import arrowimg from "../../assets/arroww.png";
import Cards from "../Cards/Cards";
import s from "./detail.module.css";
import { useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { fetchPaints, getDetail, addToCart } from "../../redux/actions";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Card from "../Cart/Cart";
import Cart from "../Cart/Cart";
import CartModal from "../CartModal/CartModal";
import { useMove } from "../../utils/customerHooks/useMove";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useCart } from "../../hook/useCart";

const Detail = () => {
  const { x, y, handleMouseMove } = useMove();
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [modalState, setmodalState] = useState(false);

  const [descriptionText, setDescriptionText] = useState(false);

  function openModal() {
    setmodalState(!modalState);
  }

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);

  const product = useSelector((state) => state.detail);

  const { AddToCart } = useCart();

  const viewImgX = (value) => {
    let valueReturn = value * 3;
    return valueReturn;
  };
  const viewImgY = (value) => {
    let valueReturn = value * 2.8;
    return valueReturn;
  };

  React.useEffect(() => {
    document
      .getElementById("zoom1")
      .scroll(viewImgX(x - 200), viewImgY(y - 280));
  }, [x, y]);
  return (
    <div className={s.containerG}>
      <NavBar></NavBar>
      <div className={s.containerRoute}>
        <div className={s.containerRoute__title}>
          <div className="text-xs ">
            <NavLink
              to={"/home"}
              className={`${s.route}`}
              style={{ fontSize: "14px" }}
            >
              Home {">"}{" "}
            </NavLink>
            <NavLink
              to={"/gallery"}
              className={`${s.route}`}
              style={{ fontSize: "14px" }}
            >
              Galería {">"}{" "}
            </NavLink>
            <NavLink
              to={"#"}
              className={`${s.route}`}
              style={{ fontSize: "14px" }}
            >
              {product?.name} {""}{" "}
            </NavLink>
          </div>
        </div>
        <div className={s.separator}></div>
      </div>

      <div className={`${s.principalContainer} mt-10`}>
        <section className="h-170 overflow-hidden" style={{ height: "600px" }}>
          <div
            className={`pt-32 flex justify-around pb-10  ${s.secondContainer} h-full`}
          >
            {console.log(`x: ${x} y: ${y}`)}
            <div className={`${s.containerIMG} `}>
              <div className="imageProduct">
                <img
                  onMouseMove={handleMouseMove}
                  src={`${product?.image}`}
                  alt="picture"
                  className={`${s.mainImage}`}
                />
                <div className={s.zoonImage} id="zoom1">
                  <div className={s.zoonImage2}>
                    <img src={`${product?.image}`} />
                  </div>
                </div>
              </div>
              <div
                className={`flex ${s.secondImagesContainer} justify-center`}
              ></div>
            </div>
            <div className={`flex items-center h-full `}>
              <FontAwesomeIcon
                icon={faCircleChevronRight}
                className={`${s.arrowimg}`}
              />
            </div>
            <div className={`${s.detailsContainer} flex flex-col h-full`}>
              <h3 className="text-2xl font-bold text-white w-full text-center mt-10  pt-3 h-16">
                {product?.name}
              </h3>

              <div className={`p-10 px-14 text-1xl  text-white ${s.pSection}`}>
                <p>
                  <span>Técnica: </span>
                  {product?.technique}
                </p>
                <p>
                  <span>Medida : </span> {product?.measures}
                </p>
                <p>
                  <span>Código : </span>
                  {product?.sku}
                </p>
                <p>
                  <span>Año : </span>
                  {product?.released}
                </p>

                <p>
                  <span>Categoria: </span>{" "}
                  {product?.categories?.map((e) => e.name) + " "}
                </p>
                {}
                <p className="mt-2">
                  {/* {product?.description} */}

                  {product?.description?.length > 56 ? (
                    <>
                      {product?.description?.substring(0, 56)}
                      <p className={descriptionText ? s.show : s.hide}>
                        {product?.description?.substring(
                          56,
                          product?.description?.length
                        )}
                      </p>
                      <span
                        onClick={() => {
                          setDescriptionText(!descriptionText);
                        }}
                        className={s.leerSpans}
                      >
                        <span className={descriptionText ? s.hide : s.show}>
                          ...Leer más
                        </span>
                        <br />
                        <span
                          className={descriptionText ? `${s.show}` : s.hide}
                        >
                          ...Ver menos
                        </span>
                      </span>
                    </>
                  ) : (
                    <>{product?.description}</>
                  )}
                </p>
              </div>

              <div
                className={`flex items-center justify-between px-8 my-6 mt-0 mb-1 ${s.priceSection} p-4 text-center `}
              >
                <p className="self-center text-white text-3xl">
                  $ {product?.price}.00
                </p>
                {product && product.state === "Available" ? (
                  <button
                    className={`${s.button}`}
                    onClick={() => AddToCart(product)}
                  >
                    Agregar al carrito
                  </button>
                ) : (
                  <p
                    style={{
                      display: "inline-block",
                      color: "#c9ada7ff",
                      fontSize: "1.5rem",
                      marginRight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Pintura Vendida
                  </p>
                )}
              </div>

              <p className="text-xs text-white mx-5 my-1">
                * El pago del envio sera cubierto por cada comprador de las
                cuales se referenciara el costo con la direccion de envio y se
                coordinara con el venderdor via whatsApp
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className={`${s.particulas}`}></div>
      <div className={`${s.particulas}`}></div>
      <Footer></Footer>
    </div>
  );
};

export default Detail;
