import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart, removeItem } from "../utils/cartSlice";

const Cart = () => {
    //subscribing to the store
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  const dispatch = useDispatch();//getting the dipatch fn

  const handleClearCart = ()=>{//dipatching clearcart action
  dispatch(clearCart());
  }
  const handleRemoveItem = ()=>{//dipatching removeitem action
    dispatch(removeItem());
    }

  return (
    <div className=" text-center m-4 p-4 ">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="w-6/12 m-auto p-4 ">
        <button className=" p-2 m-2 bg-black rounded-sm text-white" 
        onClick={handleClearCart}
        >
            Clear Cart
        </button>
        <button className=" p-2 m-2 bg-black rounded-sm text-white" 
        onClick={handleRemoveItem}
        >
            Remove item
        </button>
        {cartItems.length===0 &&(
           <h1>Cart is empty , add items to the cart !</h1>
        )}
        <ItemList items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
