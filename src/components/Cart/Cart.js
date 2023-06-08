import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../store/Cart-Context";
import { useContext } from "react";
import CartItem from "./CartItem";

const Cart = (props) => {
  const totalCartItems = useContext(CartContext);

  const totalAmount = `$${totalCartItems.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    totalCartItems.removeItemFromCart(id);
  };

  const cartItemAddHandler = (item) => {
    totalCartItems.addItemToCart({ ...item, totalCount: 1 });
  };

  const hasItem = totalCartItems.length > 0;

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {totalCartItems.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.itemName}
          price={item.itemPrice}
          amount={item.totalCount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItem && <button className={classes.button}>Order </button>}
      </div>
    </Modal>
  );
};

export default Cart;
