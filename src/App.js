import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"; //(cbr creates routing configurations)the code of reactprovider component is written by react router dom creators
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";

//1.NEED FOR LAZY LOADING :react app's code is buldled by parcel in 1 js file but if the app is huge this file will be v large and it will make our app slow
//so we need to make small bundles of all the files(logically breaking the code )...a bundle should have enough code for a feature
// 3 steps to do this- importing lazy fn ,lazy fn with components path,giving fallback

//called on demand loading/lazy loading/chunking etcc..

//2.NEED FOR FALLBACK :when react tries to load a big component sometimes the code is not
//not there so react suspends rendering and shows error on our  page so we use fallback to give something to show when code is not there(added for cases when internet goes slow and we get an error)
const Grocery = lazy(() => import("./components/Grocery")); //lazy function takes a callback fn and this callback fn uses import which takes path of component

const About = lazy(()=>import("./components/About"));

const AppLayout = () => {
  //lets have authentication logic here and we keep that data in this state variable
  const [userName,setuserName] = useState();

  useEffect(()=>{
    //make an api call and send the user name ans pass
    //lets assume we got this dummy data as result of api call
    const data={
      name:"Abha Bhardwaj",
    }
    setuserName(data.name);
  },[]);

  return (//header daal diya h yha becoz header har baar dipslay hoga hi irrespective of path
  //Outlet compo is used to load all children routes in applayout component
  //<Outlet/> gets replaced by the component which our current path has

  //loggedinuser is the global variable and we are modifyig its value here to the userName variable's value which we have set above
  <UserContext.Provider value={{loggedInUser: userName, setuserName}}>
    {/* abha */}
    <div className="app">
        <Header/>
      <Outlet/> 
    </div>
  </UserContext.Provider>

  );
};

const appRouter = createBrowserRouter([
//takes configurations/list of objects
//each configuration defines a path and what should happen on that path
//we want to push our children in applayout compo according to route
//after creating all children routes we have to load them in applayout component which can be done using an outlet component
  {
    path: "/",
    element: <AppLayout />,
    children: [
      //children routes : so that <Header/ > stays as it is and only body changes
      //link compo : so that entire page doesnt refresh again and only body changes
      {
        path: "/",
        element: <Body />,//res cards
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
      {
        //fallback is what should react render when code is not there
        path: "/Grocery",
        element: (
          <Suspense fallback={<h1>Loading.....</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        //dynamic routing for restaurant menu pages
        //is path mein resId hogi jisko ham useParams se extract krlenge fir is value ko as input bhj denge custom hook ko jo data fetch krega each res menu ka
        path: "/restaurants/:resId", //giving dynamic url , resId is dynamic
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />); //converts everything to html then renders on browser
//renders the AppLayout component into the root, this is where the entire React app is mounted to the DOM
