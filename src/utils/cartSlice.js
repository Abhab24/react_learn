//CREATING A SLICE
import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

//SLICE
const cartSlice = createSlice({//creating slices in store
  name: "cart", //config
  initialState: {//object
    items: [], //state
  },
  reducers: {//object
    //mutating our state(directly modifying)
    addItem: (state, action) => {//action:reducer fn (this action is done in ItemList.js)
      //reducer fn modifies cart/slice as it gets access to state and action
      //reducer fn modifies our state acc to our action
      state.items.push(action.payload); //on clicking add button(on dispatching) we will add an item
    },
    removeItem: (state) => {//this reducer fn doesnt need an action (this action is done in Cart.js)
      state.items.pop(); //removing last item from array..can do for a particular element also by doing action.payload.something
    },
    clearCart: (state) => {//this reducer fn doesnt need an action (this action is done in Cart.js)
      console.log(current(state));
      state.items.length = 0; //make items array as empty again
    },
  },
});

export const {addItem,removeItem,clearCart} = cartSlice.actions ;//exporting actions by 1st taking the actions out
export default cartSlice.reducer;//exporting reducer(combo of all reducers of this slice)