import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./CartModal.scss";
import background from "../../assets/background-cart-modal.png";
import backgroundTitle from "../../assets/background-cart-modal-title.png";
import buttonRemoveCart from "../../assets/button_cart_remove.png";
import Button from "../Button";
import React from "react";
import { useCart } from "../../hook/useCart";

function CartModal({ openModal, modalState }) {
  const cart = useSelector((state) => state.cart);
  const cartTotal = useSelector((state) => state.cartTotal);

  const { DeleteToCart } = useCart();

  return (
    <div
      className={`flex fixed w-full h-screen z-10 backdrop-blur top-0 left-0 bg-black bg-opacity-50 justify-center items-center ${
        modalState ? `visible` : `invisible`
      }`}
    >
      <div
        className="cartContainer lg:h-4/5 lg:w-2/4 w-full h-full grid grid-cols-1 grid-rows-5 p-6 bg-white relative rounded-3xl justify-end text-white bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="flex col-span-7 justify-between">
          <h3 className="text-2xl font-bold">Carrito De Compras</h3>
          <span
            className="closeBtn flex items-center justify-center rounded-2xl cursor-pointer"
            onClick={openModal}
          >
            X
          </span>
        </div>
        <div
          className="grid grid-cols-7 col-span-7 justify-between bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${backgroundTitle})` }}
        >
          <span className="col-span-5 font-semibold text-base">Producto</span>
          <span className="col-span-2 pr-3 font-semibold text-base">
            Precio
          </span>
        </div>
        <div className="grid grid-cols-7 col-span-7 gap-2 row-span-2 items-center overflow-scroll">
          {cart?.map((product, index) => (
            <React.Fragment key={index}>
              <div className="col-span-4 flex items-center justify-between pr-16">
                <span className="text-sm">{product.name}</span>
                <img
                  src={product.image}
                  alt=""
                  className="img_product w-14 h-16"
                />
              </div>
              <div className="col-start-6 col-span-1">
                <span className="font-semibold">${product.price}.00</span>
              </div>
              <div className="flex col-span-1 justify-end cursor-pointer">
                <span
                  onClick={() =>
                    DeleteToCart({
                      id_product: product.id_product,
                      price: product.price,
                    })
                  }
                >
                  <img
                    className="img_remove"
                    src={buttonRemoveCart}
                    alt="Remove to cart"
                  />
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="grid gap-y-4 grid-cols-7">
          <div className="grid lg:col-start-6 col-span-2">
            <div className="flex justify-between font-semibold">
              <span>Total: </span>
              <span>${cartTotal}.00</span>
            </div>
          </div>
          <div className="lg:col-start-6 col-start-4 col-span-2">
            <Link to="/payment">
              {" "}
              <Button
                version="v1"
                width="200px"
                height="38px"
                type="button"
                name="Pagar"
              />{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartModal;
