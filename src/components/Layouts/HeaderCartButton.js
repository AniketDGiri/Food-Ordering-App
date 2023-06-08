import { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../store/Cart-Context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const totalCartItems = cartCtx.items.reduce((currentItems, item) => {
    return currentItems + item.totalCount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
