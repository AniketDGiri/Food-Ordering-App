import CartContext from "./Cart-Context";
import { useReducer } from "react";

const initialCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (prevState, action) => {
  // const updatedCartItems = prevState.items.concat(action.item);

  console.log("Getting from add button", action.item);
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = prevState.items.findIndex(
      (item) => item.id === action.item.id
    );
    let updatedItems;
    const existingCartItem = prevState.items[existingCartItemIndex];

    let updateItem;

    if (existingCartItem) {
      updateItem = {
        ...existingCartItem,
        totalCount: existingCartItem.totalCount + action.item.totalCount,
      };

      updatedItems = [...prevState.items];
      updatedItems[existingCartItemIndex] = updateItem;
    } else {
      updatedItems = prevState.items.concat(action.item);
    }

    const updatedTotalAmount =
      prevState.totalAmount + action.item.itemPrice * action.item.totalCount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = prevState.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = prevState.items[existingCartItemIndex];
    const updatedTotalAmount = prevState.totalAmount - existingItem.itemPrice;
    let updatedItems;
    if (existingItem.totalCount === 1) {
      updatedItems = prevState.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        totalCount: existingItem.totalCount - 1,
      };
      updatedItems = [...prevState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
};

const CartProvider = (props) => {
  const AddCartItem = (item) => {
    dispatchFn({ type: "ADD_ITEM", item: item });
  };

  const removeCartItem = (id) => {
    dispatchFn({ type: "REMOVE_ITEM", id: id });
  };

  const [cartState, dispatchFn] = useReducer(cartReducer, initialCartState);

  const cartItems = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItemToCart: AddCartItem,
    removeItemFromCart: removeCartItem,
  };

  return (
    <CartContext.Provider value={cartItems}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
