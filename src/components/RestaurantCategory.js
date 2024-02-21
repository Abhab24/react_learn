//ACCORDIAN HEADER
import { useState } from "react";
import ItemList from "./ItemList";

//LOGIC OF CLOSING OTHER CATEGORY WHEN 1 IS OPEN FEATURE :(LIFTING OF STATE IS USED HERE)
 //rescategory ke onclcik pe handleclick fn call hoga jo setshowindex ko call krega jisse
// showindex ki value index ke baraabar store hojaegi which will make index =showindex 
//(jo ham chahate hi the taaki showitems true hoajye ...jaise hi ham kissi category ko clcick krenge showitems T hojaega then ham usko show krdenge)

const RestaurantCategory = ({data,showItems,setshowIndex}) => {
// const [showItems, setshowItems] = useState(false);//this will control the show or not of itemList...initially show items is false

  const handleClick = () => {//jis category pe click krenge uske index ko showindex mein daal denge
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
