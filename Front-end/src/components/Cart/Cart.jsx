import { useSelector } from "react-redux";
import cartImage from "../../assets/shopping-cart.png";
import style from "./Cart.module.css";

function Cart({ openModal }) {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="grid col-start-3">
      <div
        className={`z-10 grid cursor-pointer p-6 ${style.cart}`}
        style={{
          backgroundImage: `url(${cartImage})`,
        }}
        onClick={openModal}
      >
        <span className="static -mb-6 z-10 place-self-center text-white">
          {cart.length ? cart.length : null}
        </span>
        {/* <img src={cartImage} alt="You Cart" className="-mt-2" /> */}
      </div>
    </div>
  );
}

export default Cart;
