import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  //is not inside body component, its a different component
  //const [resInfo, setresInfo] = useState(null);
  const { resId } = useParams();
  //extracts resId from useParam hook
  //this fn returns an object with resId of the current path/url of our browser in it
  //{} doing this destructures the object to get resId directly

  //we are trying to abstract the fetch data logic and put inside this hook
  const resInfo = useRestaurantMenu(resId); //lets make this custom hook which gives us resinfo
  //we pass resId to it and its work is to fetch this restaurants information
  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage, avgRating, city, areaName } =
    resInfo?.cards[0]?.card?.card?.info; //destructuring// to get info about each restaurant on top (to simplify this graphql is used)

  //last mein itemCards naam ki array hai so last mein . ki jgh isko likh diya
  const { itemCards } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card; //to get menu items

  console.log(itemCards);
  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>{cuisines.join(", ")}</p>
      <hr></hr>
      <h3>{costForTwoMessage}</h3>
      <h3>{avgRating} stars</h3>
      <h3>
        {city}, {areaName}
      </h3>
      <hr></hr>
      <h2>Menu</h2>
      <ul>
        {itemCards.map((item) => (
          <ul key={item.card.info.id}>
            <h3>
              {item.card.info.name} <br></br>Rs.
              {item.card.info.price / 100 ||
                item.card.info.defaultPrice / 100}{" "}
            </h3>
            {item.card.info.description}
            <hr></hr>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
