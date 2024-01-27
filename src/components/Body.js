import ResCard from "./ResCard";
import { useEffect, useState } from "react";
//resList : is an array of all restaurants (json response), har 1 rest ki info h isme

const Body = () => {
  //filter,container having all rest cards
  //Local State variable - super powerful
  //Utilizes the useState hook to declare a state variable listofRestaurants along with a function setlistofRestaurants 
  //to update the state. It initializes listofRestaurants with an array of restaurant objects
  const [listofRestaurants,setlistofRestaurants] = useState([]);

  useEffect(()=>{
    console.log("useEffect called");
    fetchData();
  },[]);

  const fetchData = async () =>{
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.71142140051808&lng=77.1383923664689&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    console.log(json);
    console.log(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setlistofRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants );

  };

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            console.log("Button Clicked");
    const filteredList = listofRestaurants.filter(//reassigns a new filtered array
              (res) => res.data.avgRating > 4
            );
            setlistofRestaurants(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="resContainer">
        { listofRestaurants.map((restaurant,index) => (
          <ResCard key={index } resData={restaurant?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants.info} />
        ))}
      </div>
    </div>
  );
};

export default Body;



//filtering
//The arrow function is the filtering condition.
//For each element (res) in the listofRestaurants array,
//the condition checks if the avgRating property of the data
//object within the restaurant (res.data.avgRating) is greater than 4


//   when you use this RessCard component inn another component, you might pass
// it like this:RestauCard ressData = some data
// resscard compo is receiving a prop named ressdata
// For each restaurant inn the array, it renders a ResssCard component,
// passing the restaurant data ass a prop ,resData .
// resdata is the key off rescard component
