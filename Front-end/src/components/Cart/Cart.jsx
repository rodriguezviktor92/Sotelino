import { useSelector } from "react-redux";
import cartImage from "../../assets/shopping-cart.png";
import style from "./Cart.module.css";

function Cart({ openModal }) {
  const cart = useSelector((state) => state.cart);

  return (
    <div
      className={`grid p-3 z-10 col-start-3 ${style.cart} bg-center`}
      onClick={openModal}
    >
      <div className={`grid self-end justify-center ${style.overlap}`}>
        <p className="static z-10 place-self-center text-white">
          {cart.length ? cart.length : null}
        </p>
      </div>
      <div className={`z-10 grid cursor-pointer ${style.overlap}`}>
        <img src={cartImage} alt="You Cart" className="" />
      </div>
    </div>
  );
}

export default Cart;
