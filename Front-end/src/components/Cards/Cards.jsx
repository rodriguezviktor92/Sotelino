import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import Loading from "../Loading/Loading.jsx";

export default function Cards({ cards }) {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <div className="container mx-auto px-4 md:px-12">
      {console.log("cards filter", cards)}
      <div className="flex flex-wrap -mx-1 lg:-mx-4 justify-center">
        {isLoading ? (
          <Loading />
        ) : cards.length ? (
          cards?.map((paint) => {
            return (
              <div
                className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
                key={paint.id_product}
              >
                <Card paint={paint} />
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center p-40">
            No hay productos
          </div>
        )}
      </div>
    </div>
  );
}
