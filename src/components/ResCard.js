import React from "react";
import { CDN_URL } from "../utils/constants";

//Restaurant card (we have 2 cards with label and without label and we are rendering them in body compo on our condition)
//In a React fnl compo, the props object contains all the properties passed to that compo
//1 . CARD
const ResCard = (props) => {
  //resData data is assigned to resCard component in body.js
  //ResCard is a fnl compo with props as its argument
  //receives resData as prop that has info about a restaurant obtained from a JSON response
  const { resData } = props;

  const { name, cuisines, cloudinaryImageId, avgRating, costForTwo } =
    resData?.info;

  return (
    <div className="m-4 p-4 w-[250px] bg-gray-100 rounded-lg hover:bg-gray-200">
      <img
        className="res-logo rounded-lg"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h2 className="font-bold py-4 text-lg">{name}</h2>
      <h4 className="font-bold"> {avgRating} stars</h4>
      <h4>{cuisines.join(", ")}</h4>
      <span>
        <h4> {costForTwo} </h4>
      </span>
    </div>
  );
};

//Higher order component (HOC)
//input - ResCard output- ResCardClosed
//2.CARD
export const withClosedLabel =(ResCard)=>{//(yha input bhj rhe h )taking rescard componenet as the input
  return (props)=>{//(yha props bhj rhe h )new component we are returning which is the rescard component with closed label on it
   return (
    <div>
      <label className="absolute bg-white text-green-800 m-2 p-2 rounded-lg">Open</label>
      <ResCard {...props} />
    </div>
   )
  }
}

export default ResCard;

//Restaurant card
//In a React fnl compo, the props object contains all the properties passed to that compo
// const ResCard = (props) => {//ResCard is a fnl compo with props as its argument
//receives resData as prop that has info about a restaurant obtained from a JSON response
//       const { resData } = props;//destructures the resData prop passed to the compo,this prop is assumed to hav info abt a restaurant
//yhaan props ko value dedi //passing arguments(saari info json se aegi) from resList(json response)
//       const {//optional chaining to clean code and handling edge cases
//Once the destructuring is done,u can use resData
//as a variable within the compo to access the value of the resData prop

