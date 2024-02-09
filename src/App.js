import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"; //the code of reactprovider component is written by react router dom creators
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";

//1.NEED FOR LAZY LOADING :react app's code is buldled by parcel in 1 js file but if the app is huge this file will be v large and it will make our app slow
//so we need to make small bundles of all the files(logically breaking the code )...a bundle should have enough code for a feature
// 3 steps to do this- importing lazy fn ,lazy fn with components path,giving fallback
//called on demand loading/lazy loading/chunking etcc..

//2.NEED FOR FALLBACK :when react tries to load a big component sometimes the code is not
//not there so react suspends rendering and shows error on our  page so we use fallback to give something to show when code is not there(added for cases when internet goes slow and we get an error)
const Grocery = lazy(() => import("./components/Grocery")); //lazy function takes a callback fn and this callback fn uses import which takes path of component
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};
const appRouter = createBrowserRouter([
  //takes configurations/list of objects
  //each configuration defines a path and what should happen on that path
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
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
        //dynamic routing for restaurant pages
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
