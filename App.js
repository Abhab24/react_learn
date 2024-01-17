
//1. Writng hello world using react
// const heading = React.createElement(//creating a react element(js object)
//     "h1",
//     {id: "heading"},//attributes //these 2 are props of object
//     "Hello World from React !"
//     );// type of element,object for element properties,content of element
// console.log(heading);//object
// //now we have to put this heading inside our dom or browser
// //CREATING A ROOT FOR REACT
// // It takes the DOM element(i.e element with the id "root) where your React app will be rendered as an argument
//   const root = ReactDOM.createRoot(document.getElementById("root")) ;//so 1st we have created a root for our react library as this root is the place now where all the react code will run
//   root.render(heading);//render a React element within the root//takes obejct creates h1 tag and put it inside root element in DOM

// /*2. Create this using react
//   <div id="parent">
//     <div id="child">
//       <h1>I'm h1 tag</h1>
//     </div>
//   </div>

//   react element is object which becomes HTMl which the browser understands
// */
// const parent = React.createElement(//type of element,properties of element,immediate child of eleemnt
//   "div",
//    { id: "parent" },
//    React.createElement(
//     "div",
//     {id:"child"},
//     React.createElement("h1",{},"I'm h1 tag")
//    )
// );
// console.log(parent);//object(react element)
// const root = ReactDOM.createRoot(document.getElementById("root"));//this can be any tag id we want

// root.render(parent);//rendering object to dom so that its visible in html

// /*3. Create this using react
//   <div id="parent">
//     <div id="child">
//       <h1>I'm h1 tag</h1>
//       <h2>I'm h2 tag</h2>
//     </div>
//   </div>

//   react element is object which becomes HTMl which the browser understands
//   if u want to have siblings like h1,h2 u can give more than 1 child as an array
// */
// const parent = React.createElement(//type of element,properties of element,immediate child of eleemnt
//   "div",
//    { id: "parent" },
//    React.createElement("div", {id:"child"}, [ 
//     React.createElement("h1",{},"I'm h1 tag"),//array of children for same level of elements
//     React.createElement("h2",{},"I'm h2 tag")
//    ] 
//    )
// );
// console.log(parent);//object(react element)
// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(parent);//rendering object to dom so that its visible in html

/*4. Create this using react
  <div id="parent">
    <div id="child1">
      <h1>I'm h1 tag</h1>
      <h2>I'm h2 tag</h2>
    </div>
    <div id="child2">
      <h1>I'm h1 tag</h1>
      <h2>I'm h2 tag</h2>
    </div>
  </div>

*/
const parent = React.createElement("div",{ id: "parent" },[
   React.createElement("div", {id:"child1"}, [ 
    React.createElement("h1",{},"I'm h1 tag"),
    React.createElement("h2",{},"I'm h2 tag")
   ] ),
    React.createElement("div", {id:"child2"}, [ 
    React.createElement("h1",{},"I'm h1 tag"),
    React.createElement("h2",{},"I'm h2 tag")
   ] )
  ]
);
//console.log(parent);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(parent);
