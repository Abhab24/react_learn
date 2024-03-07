import Contact from "../Contact";
import { render , screen} from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Contact us pagwe test cases",()=>{

test("should load Contact us compo",()=>{
 
    render(<Contact/>);//for testing a UI compo in react 1st render the compo to the js dom

    //querying
   const heading = screen.getByRole("heading");//getting anything from compo to chcek its rendering

   //assertion
 //expect(heading).toBeIntheDocument();//checks whether the heading obtained is inside screen /not
});

test("should load button inside contact compo",()=>{
    render(<Contact/>);

    const button = screen.getByRole("button");
   
   // expect(button).toBeIntheDocument();
});

test("should load 2 button inside contact compo",()=>{
    render(<Contact/>);

    const inputboxes = screen.getAllByRole("textbox");
   
   // expect(inputboxes).toBeIntheDocument();
});

})
