import { useEffect, useState } from "react";

//this returns a variable with status either online or offline bollean value
const useOnlineStatus = () => {
  const [onlineStatus, setonlineStatus] = useState(true);
  //makin a local variable,evertime the status changes we will update this variable
  //if internet is wokring its true else false
  useEffect(() => {
    window.addEventListener("offline", () => {
      //if offline then make the state variable false
      setonlineStatus(false);
    });

    window.addEventListener("online", () => {
      //if online then make the state variable true
      setonlineStatus(true);
    });
  }, []);

  return onlineStatus; //bolean value
};

export default useOnlineStatus;
