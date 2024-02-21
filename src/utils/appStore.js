import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

//BUILDING OUR STORE
const appStore= configureStore({
 reducer:{ //big reducer of app
    cart:cartReducer,//small reducers from each slice will be here  r1,r2...
 },
}
);
export default appStore;