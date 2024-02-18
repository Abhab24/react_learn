import { useState, useEffect } from "react";
import { MENU_API } from "../utils/constants";

//fetching restaurant menu data from an API endpoint
const useRestaurantMenu = (resId) => {
  //RestaurantMenu compomnent passes resId to it
  const [resInfo, setresInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(MENU_API + resId); //url needs restaurant id at the end
    const json = await data.json();
    console.log(json);
    setresInfo(json.data);
    console.log(json.data);
  };

  return resInfo;
};

export default useRestaurantMenu;
