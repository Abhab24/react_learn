import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
     userInfo:{//state variable
      name:"dummy",//giving initial state
      location:"dummy-loc",
      company:"dummy-comp",
      avatar_url:"dummy-img"
     }
     };
   // console.log(this.props.name+"child constructor");
  }

  async componentDidMount(){
    //console.log(this.props.name+"child component Did mount");
    const data= await fetch("https://api.github.com/users/akshaymarch7");
    const json = await data.json();
    console.log(json);

    this.setState({//updating state variable
      userInfo: json,
    })
  }
componentDidUpdate(){
console.log("didupdate component");
}

componentWillUnmount(){
  console.log("willunmount component");

}

  render() {
    //console.log(this.props.name+"child render");
   //const { name, location } = this.props;
const {name,location,company,avatar_url} = this.state.userInfo;
//debugger; //just like putting debugger in console
    return (
      <div className="userCard">
        {/* <h2>Count: {count}</h2>
        <button onClick={()=>{
            this.setState({ //never update state variable directly do suing setState fn
                count: this.state.count +1,
            }) }}
        >Count Increase</button> */}
        <img src={avatar_url}></img>
        <h2>Name: {name} </h2>
        {/* can be done this way also :this.state.userInfo.name */}
        <h3>Location: {location}</h3>
        <h3>Company: {company}</h3>
      </div>
    );
  }
}

export default UserClass;
