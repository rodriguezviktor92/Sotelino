import React from "react";
import { Link } from "react-router-dom";
import s from "./Card.module.css";
import { useCart } from "../../hook/useCart";
import { useDispatch } from "react-redux";

export default function Card({ paint }) {
  const { name, serie, measures, categories, price, image, id_product } = paint;
  const dispatch = useDispatch();

  const { AddToCart } = useCart();

  return (
    <div
      id={id_product}
      className={s.card}
      style={{
        background: `url(${image}) no-repeat center center`,
        backgroundSize: "cover",
      }}
    >
      <div className={s.cardbody}>
        <Link key={id_product} to={`/details/${id_product}`}>
          <h1 className={s.cardtitle}>{name.toUpperCase()}</h1>
        </Link>
        <p className={s.cardsub}>Serie: {serie} </p>
        <p className={s.cardmed}>Medidas: {measures}</p>
        <p className={s.cardcat}>
          {console.log("categorias card filter", categories)}
          {categories &&
            categories.map((e, index) => {
              return (
                <p
                  key={index}
                  style={{ display: "inline-block", margin: "0 2px" }}
                >
                  {e.name || e}
                </p>
              );
            })}
        </p>
        <button
          className={s.cardbtn}
          onClick={() => {
            AddToCart(paint);
          }}
        >
          Agregar al carrito
        </button>
        <span className={s.cardprice}>$ {price}</span>
      </div>
    </div>
  );
}
