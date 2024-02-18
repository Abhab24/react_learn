import { useEffect, useState } from "react";

//WORKING: this hook returns a variable with status...either online or offline bollean value

//CUSTOM REACT HOOK
//this returns a variable with status either online or offline bollean value
//Adding event listeners is considered a side effect in React because it involves interacting with the browser's 
//environment (outside of React). Side effects like this are typically performed in useEffect hooks in functional components

const useOnlineStatus = () => {
  const [onlineStatus, setonlineStatus] = useState(true);
  //makin a local variable,evertime the status changes we will update this variable
  //if internet is wokring its true else false
  useEffect(() => {
    window.addEventListener("offline", () => {//window is an object which has value of status of our browser
      //if offline then make the state variable false
      setonlineStatus(false);
    });

    window.addEventListener("online", () => {
      //if online then make the state variable true
      setonlineStatus(true);
    });
  }, []);// empty dependency array ([]) passed as the second argument to useEffect ensures that 
  //the effect is only run once, after the initial render

  return onlineStatus; //bolean value (current online status of device)
};

export default useOnlineStatus;
