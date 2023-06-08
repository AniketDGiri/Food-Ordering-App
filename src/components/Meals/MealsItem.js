import { useContext } from "react";
import MealItemForm from "./MealItemForm";
import classes from "./MealsItem.module.css";
import CartContext from "../store/Cart-Context";

const MealsItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const cartCtx = useContext(CartContext);

  const addItemToCartHandler = (enteredAmountNumber) => {
    cartCtx.addItemToCart({
      id: props.id,
      itemName: props.name,
      itemPrice: props.price,
      totalCount: enteredAmountNumber,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} addItemToCart={addItemToCartHandler} />
      </div>
    </li>
  );
};

export default MealsItem;
