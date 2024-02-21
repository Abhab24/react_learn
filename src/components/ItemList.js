//ACCORDIAN BODY

import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {

  const dispatch = useDispatch();//useDispatch hook returns dispatch fn which is used to dipatch actions to redux store

  const handleAddItem=(item)=>{//this fn will be called when an event(like button click) triggers it
    //Dispatch an action
    dispatch(addItem(item));//creates an action object....action("data")
    //item = a category card
  }
  //console.log(items);
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2  border-gray-200 border-b-2 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span>{item.card.info.name}</span>
              <span>
                {" "}
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4 ">
            <div className="absolute end-[500px] ">
              <button className="p-2 bg-white shadow-lg mx-6 rounded-lg text-green-600 "
              onClick={()=>handleAddItem(item)}>
                ADD
              </button>
            </div>
            <img
              className="rounded-sm"
              src={CDN_URL + item.card.info.imageId}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
