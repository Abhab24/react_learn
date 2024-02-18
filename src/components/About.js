//class based component
import UserClass from "./UserClass";
import React from "react";
import UserContext from "../utils/UserContext";

class About extends React.Component {
  constructor(props) {
    super(props);

    //console.log("parent constructor");
  }

  componentDidMount() {
   // console.log("parent component Did Mount");
  }
  render() {
   // console.log("parent render");
    return (
      <div>
        <h1>About class component</h1>
        <div>
          <UserContext.Consumer>
            {({loggedInUser})=> <h1>{loggedInUser}</h1> }
          </UserContext.Consumer>
        </div>
        <h2>This is food site</h2>
        <UserClass name={"first"} location={"Hyderabad"} />
        {/* <UserClass name={"second "} location={"Delhi"} /> */}
      </div>
    );
  }
}
export default About;

/*order of output using react lifecycle diagram :

-react batched the render phases for optimizaztion as dom manipulation is the most 
expensive thing when we are updating a component.
- everything in render phase is happening inside virtual dom(as its fast) ... diff is being calculated etc
 so we try to batch the render phases as its v fast and when this phase
is completed then we move to the commit phase whcih takes time 

parent constructor ----render phase-----------------
parent render
  -child1 constructor
  -child1 render

  -child2 constructor
  -child2 render

  DOM is updated in a single batch(in a single batch both of these childrens dom is updated)
(diff is calculated ,reconciliation is triggered,then its batched ,then dom is updated)
  -child1 componentDidMount -----commit phase------------
  -child2 componentDidMount
parent componentDidMount  */
