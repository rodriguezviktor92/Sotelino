import { addToCart, removeToCart } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const AddToCart = (paint) => {
    const itsCart = cart.find(
      (product) => product.id_product === paint.id_product
    );
    if (itsCart) {
      toast.warn("Ya fue agregada al carrito!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(addToCart(paint));
    }
  };

  const DeleteToCart = (product) => {
    dispatch(removeToCart(product));
  };

  return {
    AddToCart,
    DeleteToCart,
  };
}
