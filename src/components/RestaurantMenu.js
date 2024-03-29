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

//CONTROLLED COMPONENT
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
  console.log(resInfo);
  const[showIndex,setshowIndex]= useState(null);//lifting state by declraring it here instaead of rescategroy
  //ye variable jis category pe clcikc krenge uske index ko store krega 
  //....rescategory mein set hoga ye becoz us compo ko hi ham clcik krenge resmenu ko nahi 

  if (resInfo === null) return <Shimmer />; //conditional rendering 

  const { name, cuisines, costForTwoMessage, city, areaName } = resInfo?.cards[0]?.card?.card?.info;
   //(destructuring)to get info about each restaurant on top (its difficult to simplify this graphql is used)

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
      {categories.map((category,index) =>  (//iterates on each category array and then rendering it on ui

      //LIFTING STATE KAR RHE HAIN SO showindex ki value rescategory(panel) directly set ni kr skta so ham event handler (setshowindex) ko
      //as a prop bhjenge taaki resmenu(accordian) indirectly allow kre rescategry to change it
      //showitems btaega ki current index show hoga ya nahi so it will send true or false to rescategory

      //logic: agar current index and jispe cick kra h vo index equal hain then show krdo us rescategory ko
      
      //LOGIC OF CLOSING OTHER CATEGORY WHEN 1 IS OPEN FEATURE :(LIFTING OF STATE IS USED HERE)
      //rescategory ke onclcik pe handleclick fn call hoga jo setshowindex ko call krega jisse
      // showindex ki value index ke baraabar store hojaegi which will make index =showindex 
      //(jo ham chahate hi the taaki showitems true hoajye ...jaise hi ham kissi category ko clcick krenge showitems T hojaega then ham usko show krdenge)
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
