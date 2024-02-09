import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
//importing link component for linking routes st we can navigate to the new page without reloading the whole page

const Header = () => {
  //logo,nav bar,login logout button with a dynamic label
  //let btnName = "Login"; //let is used as const variables cant be modified in js
  //The use of the useState hook allows the component to manage and update its local state
  const [btnNameReact, setbtnNameReact] = useState("Login"); //local state variable cant be changed directly and we use state fn for updating it
  //This state variable is used to control the text content of the login/logout button
  console.log("Header rendered");
  //logged 2 times 1. when site opens 2.when login button is clicked which means that entire header component gets rendered agin on clicking the login buttton

  const onlineStatus = useOnlineStatus();//boolean value of status from our custom hook...1 or 0

  return (
    <div className="flex justify-between bg-blue-100 shadow-lg">
      <div class="logo-container">
        <img className="w-56" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4 ">
          <li className="px-4">
            Online Status :{onlineStatus?"✅":"🔴"}
          </li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4">            
            <Link to="/Grocery">Grocery</Link>
          </li>
          <li className="px-4">
            Cart
            </li>
            <li>
          <button 
            className="px-4 bg-slate-300 rounded-lg "
            onClick={() => {
              //{ blue bracket for jsx ,The button label is toggled between "Login" and "Logout" based on user clicks
              btnNameReact === "Login"
                ? setbtnNameReact("Logout")
                : setbtnNameReact("Login");
              console.log(btnNameReact);
            }}
          >
            {btnNameReact}
          </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
