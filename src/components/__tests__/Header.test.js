import { render ,screen,fireEvent} from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore"
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

test("should render header component with a login button",()=>{
render(//render
    <BrowserRouter>
<Provider store={appStore}> 
 <Header/>
</Provider>
</BrowserRouter>
)
const loginButton = screen.getByRole("button");//query
//const loginButton = screen.getByText("Login");//query

expect(loginButton).toBeInTheDocument();//assert

});

//testing loading of header compo
test("should render header component with cart items 0",()=>{
render(//render
    <BrowserRouter>
<Provider store={appStore}> 
 <Header/>
</Provider>
</BrowserRouter>
)
const cartItems = screen.getByText("Cart - (0 items)");//query

expect(cartItems).toBeInTheDocument();//assert

});

//testing login lout feature
test("should change login button to logout on click",()=>{
    render(//render the header compo
        <BrowserRouter>
    <Provider store={appStore}> 
     <Header/>
    </Provider>
    </BrowserRouter>
    );

    const loginButton = screen.getByRole("button",{name:"Login"});//query

    //fireevent.event we want to fire(where we want to clcik)
    fireEvent.click(loginButton);//simulating click event (clciking a buttim from code)
    //this changes the login button to logout button in app so we will then try to find the logout button in our app

    const logoutButton = screen.getByRole("button",{name:"Logout"});//query

    expect(logoutButton).toBeInTheDocument();//assert
    
    });
