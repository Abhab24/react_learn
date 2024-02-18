import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

//WORKING: 
//1. we extract resId using useParams hook
//2. we pass this resId as an input to custom hook which fetches the data of menu of each res
//3. we access the menu data that we got above by destructuring it ,then applying filter fn,then rendering it on UI using jsx
// first we render each restuarnts info on top and then the categories and the items inside each category using map fn

//(path mein resId hogi jisko ham useParams se extract krlenge fir is value ko as input bhj denge custom hook ko jo data fetch krega each res menu ka)

//displays menu data of each restaurant on UI
const RestaurantMenu = () => {//(not inside body component)its a different component 
   //GETTING THE DATA
  //in react this hook is used to access the parameters (route parameters) that are defined in the URL
  //some of the routes might have dynamic segments, such as /:resId. These dynamic segments are placeholders for values that will be extracted from the URL
  const { resId } = useParams();//(resId naam ka dynamic parameter agr h kisi path mein to vo mil jaega aise)
  //extracts resId from useParam hook
  //this fn returns an object with resId of the current route of our browser
  //{} doing this destructures the object to get resId directly

  //CUSTOM HOOK (starts with use) - has its logic outside of current component(resmenu) ...this helps to give only 1 work to the current componenet
  //we are trying to abstract(put outside the current component) the fetch data logic and put inside this custom hook
  //this custom hook takes resId as input and returns restaurant menu data by fetching it from API endpoint
  //using this hook this component does not have to manage its own state
  const resInfo = useRestaurantMenu(resId);
  const[showIndex,setshowIndex]= useState(null);

  if (resInfo === null) return <Shimmer />; //conditional rendering 

  const { name, cuisines, costForTwoMessage, city, areaName } =
    resInfo?.cards[0]?.card?.card?.info; //(destructuring)to get info about each restaurant on top (its difficult to simplify this graphql is used)

  //to get the menu categories of each restaurant
  //filter fn use krke sirf vo cards chiye jinka type ... ye ho coz sirf inhi cards mein categories hain restaurant menu ki
  //this is an array of categories having cards which again have array of that category items
  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  console.log(categories);

  //RENDERING THE DATA ON UI
  return (
    <div className="menu text-center ">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ")} {costForTwoMessage}
      </p>
      <h3>
        {city}, {areaName}
      </h3>
      <hr></hr>
      {categories.map((category,index) =>  (//iterates on each category array
      //CONTROLLED COMPO
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showItems={index === showIndex? true:false}
          setshowIndex = {()=>setshowIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
