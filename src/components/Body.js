import ResCard, { withClosedLabel } from "./ResCard";
import Shimmer from "./Shimmer";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";//for accessing logged in user and setusername
//resList : is an array of all restaurants (json response ki jo sari restaurant arrays thi jo hamne file bnake yha daala hua tha directly), har 1 rest ki info h isme

const Body = () => {
  //filter,container having all rest cards
  //Local State variable - super powerful
  //Utilizes the useState hook to declare a state variable listofRestaurants along with a function setlistofRestaurants
  //to update the state. It initializes listofRestaurants with an array of restaurant objects

  //these are 3 state variables used to manage state of the component
  //1.listofRestaurants: Holds the list of all restaurants fetched from the API.
  //2.filteredRestaurants: Holds the list of restaurants based on applied filters.
  //3.searchText: Holds the text entered in the search input.

  const [listofRestaurants, setlistofRestaurants] = useState(null); //modifying this 1 time only wen im getting data from API ,this will be used to filter out restaurants
  const [filteredRestaurants, setfilteredRestaurants] = useState(null);
  //we render our ui using this
  //if top rated filter or search buttons are clciked then their filtering logics will be implemented and filterrestaurants state variabel gets updated and then rendering on ui occurs using this state varaieble only
  //else if no filter is clicked then also filteredrestaurants state variable has data of all the restautants from API so that will be rendered on our ui so we use this to render ui as it works for both the cases - normal,filter butttons clciked
  //we keep a copy of listofrestaurats an update it instaead of original one else we can filter only once and we have to reload site again....to display filtered ratustnts on ui we use this variable

  const [searchText, setsearchText] = useState("");

  const RestCardClosed = withClosedLabel(ResCard); //HOC

  //console.log("Body rendered", listofRestaurants); //this is helpful for understanding the component lifecycle

  useEffect(() => {
    //anything inside this fn will be called after rendering the function
    try {
      fetchData(); //fetchdata fn is called
    } catch (err) {
      console.log("error:", err);
    }
  }, []);

  const fetchData = async () => {
    //fetch data fn
    const data = await fetch(
      //fetch fn returns a promise and we resolve this fn using async await
      //so we make the fn async and wait for the data ro come so this will resolve the promise
      //API call made to external world
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json(); //once we have the data we have to convert this data to json for this we again do await
    console.log(json);

    setlistofRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setfilteredRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    //console.log(listofRestaurants);
  };

  const onlineStatus = useOnlineStatus(); //getting current status value from custom hook

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you are offline ;/ Please check your internet connection!!{" "}
      </h1>
    );

  const { loggedInUser,setuserName } = useContext(UserContext);//extracting state from context

  //conditional rendering
  if (listofRestaurants === null) {
    //for better user experience while waiting for data to get loaded placeholders are visible on ui
    //before the data gets fetched the empty screen will have this instead
    return <Shimmer />; //syntax for rendering a component inside something
  }
  console.log(listofRestaurants);

  //to get data from input box, we need to take its value and we have to bind this input box to a local state variable
  return (
    //this filter div has search bar,top rated filter
    <div className="body">
      <div className="filter flex ">
        <div className="search m-4 p-4">
          <input //search input ,input is controlled by searchtext state variable
            type="text"
            className="border border-solid border-black"
            value={searchText} //this is for updating the actual value of input tag to the one typed which is provided by the searchtext state variable
            onChange={(e) => {
              //(this loop is for changing value of input on ui for display)When the input value changes (onChange), the setsearchText function is called to update the searchtext variable and state of component
              setsearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg "
            onClick={() => {
              //if search button gets clicked then filtering fn is called
              console.log("Search Button Clicked");
              console.log(searchText);

              const filteredRestaurants = listofRestaurants.filter(
                //filters all the restaurant names which include searched and then updating listofrestaurants with that res data
                (res) =>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setfilteredRestaurants(filteredRestaurants); //react rerenders body component with filteerrd data as soon as listofRestatt state variable gets updated
            }}
          >
            Search
          </button>
        </div>
        <div className="search m-5 p-5 flex items-center">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg"
            onClick={() => {
              console.log("Filter Button Clicked");
              const filteredList = listofRestaurants.filter(
                //reassigns a new filtered array
                (res) => res.info.avgRating > 4
              );
              setfilteredRestaurants(filteredList); //we have to update filteredrestaurants variable as we are rendering ui using it on filtering and searching both
            }}
          >
            Top Rated Restaurant
          </button>
        </div>
        <div className="search m-5 p-5 flex items-center">
          <label>UserName : </label>
         <input className="border border-black p-2 " 
         value={loggedInUser}
         onChange={(e)=> setuserName(e.target.value)} 
         />
        </div>
      </div>
      <div className="resContainer flex flex-wrap">
        {filteredRestaurants &&
          filteredRestaurants.map(
            (
              restaurant //now well also render using filtered restaurants
            ) => (
              //filteredrestaurants has all the restaurant cards to be displayed
              // doing restuarnts on it world give us access to each restaurant card
              //but doing restaurant.info gives us access to data of each card (1 step andr) so we use it as a prop for rescard component
              //our restaurants are rendered here 1 by 1 using ResCard component and we are passing the data as well using restaurant
              <Link
                key={restaurant.info.id}
                to={"/restaurants/" + restaurant.info.id}
              >
                {/* if the restayrant is closed addd a closed label to it*/}
                {restaurant.info.isOpen ? (
                  <RestCardClosed resData={restaurant} />
                ) : (
                  <ResCard resData={restaurant} />
                )}
              </Link> //resData is prop we are passing to rescard component
              //restaurants are all the array of cards and by doing .info we can access all the details liek name cuisine of cards
            )
          )}
      </div>
    </div>
  );
};
export default Body;

// import ResCard from "./ResCard";
// import { useEffect, useState } from "react";
//resList : is an array of all restaurants (json response), har 1 rest ki info h isme

// const Body = () => {
//filter,container having all rest cards
//Local State variable - super powerful
//Utilizes the useState hook to declare a state variable listofRestaurants along with a function setlistofRestaurants
//to update the state. It initializes listofRestaurants with an array of restaurant objects
//   const [listofRestaurants,setlistofRestaurants] = useState([]);

//   useEffect(()=>{
//     console.log("useEffect called");
//     fetchData();
//   },[]);

//   const fetchData = async () =>{
//     const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.71142140051808&lng=77.1383923664689&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
//     );

//     const json = await data.json();
//     console.log(json);
//     console.log(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
//     setlistofRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants );

//   };

//   return (
//     <div className="body">
//       <div className="filter">
//         <button
//           className="filter-btn"
//           onClick={() => {
//             console.log("Button Clicked");
//     const filteredList = listofRestaurants.filter(//reassigns a new filtered array
//               (res) => res.data.avgRating > 4
//             );
//             setlistofRestaurants(filteredList);
//           }}
//         >
//           Top Rated Restaurant
//         </button>
//       </div>
//       <div className="resContainer">
//         { listofRestaurants.map((restaurant,index) => (
//           <ResCard key={index } resData={restaurant?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants.info} />
//         ))}
//       </div>
//     </div>
//   );
// };

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
