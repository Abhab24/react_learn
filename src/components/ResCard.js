import React from "react";
import { CDN_URL } from "../utils/constants";
// data cards card card gridElements infoWithStyle restaurants info
// id name cloudinaryImageId costForTwo cuisines avgRating

//Restaurant card
//In a React fnl compo, the props object contains all the properties passed to that compo
const ResCard = (props) => {
  //resData data is assigned to resCard component in body.js
  //ResCard is a fnl compo with props as its argument
  //receives resData as prop that has info about a restaurant obtained from a JSON response
  const { resData } = props;

  const { name, cuisines, cloudinaryImageId, avgRating, costForTwo } =
    resData?.info;

  return (
    <div className="resCard">
      <img
        className="res-logo"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h2>{name}</h2>
      <h4>{cuisines.join(", ")}</h4>
      <span>
        <h4>{avgRating} stars</h4>
        <h4> Cost is {costForTwo} </h4>
      </span>
    </div>
  );
};

export default ResCard;

// import {CDN_URL} from "../utils/constants"
// data cards card card gridElements infoWithStyle restaurants info
// id name cloudinaryImageId costForTwo cuisines avgRating

//Restaurant card
//In a React fnl compo, the props object contains all the properties passed to that compo
// const ResCard = (props) => {//ResCard is a fnl compo with props as its argument
//receives resData as prop that has info about a restaurant obtained from a JSON response
//       const { resData } = props;//destructures the resData prop passed to the compo,this prop is assumed to hav info abt a restaurant
//yhaan props ko value dedi //passing arguments(saari info json se aegi) from resList(json response)
//       const {//optional chaining to clean code and handling edge cases
//Once the destructuring is done,u can use resData
//as a variable within the compo to access the value of the resData prop
//     name,cloudinaryImageId ,costForTwo, cuisines ,avgRating
//       } = resData?.data?.cards?.card?.card?.gridElements?.infoWithStyle?.restaurants?.info ;
//       return (
//         <div className="resCard">
//           <img
//             className="res-logo"
//             alt="res-logo"
//             src={ CDN_URL
//               + cloudinaryImageId
//             }
//           />
//           <h3>{name}</h3>
//          <h3>{cuisines}.join(",")</h3>
//           <h3>Rs.{costForTwo} is cost for two</h3>
//           <h3>{avgRating} stars </h3>
//         </div>
//       );
//     };

//     export default ResCard;

// import {CDN_URL} from "../utils/constants"
// data cards card card gridElements infoWithStyle restaurants info
// id name cloudinaryImageId costForTwo cuisines avgRating

//Restaurant card
//In a React fnl compo, the props object contains all the properties passed to that compo
// const ResCard = (props) => {//ResCard is a fnl compo with props as its argument
//receives resData as prop that has info about a restaurant obtained from a JSON response
//       const { resData } = props;//destructures the resData prop passed to the compo,this prop is assumed to hav info abt a restaurant
//yhaan props ko value dedi //passing arguments(saari info json se aegi) from resList(json response)
//       const {//optional chaining to clean code and handling edge cases
//Once the destructuring is done,u can use resData
//as a variable within the compo to access the value of the resData prop
//     name,cloudinaryImageId ,costForTwo, cuisines ,avgRating
//       } = resData?.data?.cards?.card?.card?.gridElements?.infoWithStyle?.restaurants?.info ;
//       return (
//         <div className="resCard">
//           <img
//             className="res-logo"
//             alt="res-logo"
//             src={ CDN_URL
//               + cloudinaryImageId
//             }
//           />
//           <h3>{name}</h3>
//          <h3>{cuisines}.join(",")</h3>
//           <h3>Rs.{costForTwo} is cost for two</h3>
//           <h3>{avgRating} stars </h3>
//         </div>
//       );
//     };

//     export default ResCard;
