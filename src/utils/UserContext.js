import { createContext } from "react";

const UserContext = createContext({//we can access context anywhere in our app
    loggedInUser:"Default User",//info we want 
});

export default UserContext;