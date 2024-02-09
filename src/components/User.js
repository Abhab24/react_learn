import { useEffect } from "react";

const User = () => {
  useEffect(() => {
    //api calls
  }, []);

  return (
    <div className="userCard">
      <h2>Name: Abha </h2>
      <h3>Location: Delhi</h3>
      <h4>Contact: @abha.b__</h4>
    </div>
  );
};

export default User;
