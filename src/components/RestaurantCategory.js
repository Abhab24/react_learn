//ACCORDIAN HEADER
import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({data,showItems,setshowIndex}) => {

 // const [showItems, setshowItems] = useState(false);//this will control the show or not of itemList...initially show items is false

  const handleClick = () => {
   console.log("clicked");
   setshowIndex();
 };

  return (
    <div className="w-6/12 bg-gray-50 shadow-lg p-4 mx-auto my-4 ">
    
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleClick}
      >
        <span className="font-bold text-lg">
          {data.title} ({data.itemCards.length})
        </span>
        <span>🔽</span>
      </div>
      
      { showItems && <ItemList items={data.itemCards} /> }
    </div>
    
  );
};
export default RestaurantCategory;
