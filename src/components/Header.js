import { LOGO_URL } from "../utils/constants";
import { useState } from "react";

const Header = () => {//logo,nav bar,login logout button with a dynamic label
  //let btnName = "Login"; //let is used as const variables cant be modified in js
//The use of the useState hook allows the component to manage and update its local state
  const [btnNameReact , setbtnNameReact] = useState("Login");//local state variable cant be changed directly and we use state fn for updating it
  //This state variable is used to control the text content of the login/logout button
  console.log("Header rendered");
  //logged 2 times 1. when site opens 2.when login button is clicked which means that entire header component gets rendered agin on clicking the login buttton

    return (
      <div className="header">
        <div>
          <img
            className="logo"
            src={LOGO_URL}
          />
        </div>
        <div className="nav-items">
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Cart</li>
            <button className="login" onClick={ ()=>{
          //{ blue bracket for jsx ,The button label is toggled between "Login" and "Logout" based on user clicks
            btnNameReact === "Login"?
             setbtnNameReact("Logout") 
             :setbtnNameReact("Login");
            console.log(btnNameReact);
             } }
             >
              {btnNameReact}
              </button>
          </ul>
        </div>
      </div>
    );
  };

  export default Header;