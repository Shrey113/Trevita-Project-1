import React from "react";
import {localstorage_key_for_client} from "./../../redux/AllData"
function HomePage() {
  
  const handle_user_logout = () => {
    window.localStorage.removeItem(localstorage_key_for_client);
    window.location.reload();
  };
  return (
    <div className="mainHomePage">
      <h1>Hello new user</h1>
      <button onClick={handle_user_logout}>Logout</button>
    </div>
  );
}

export default HomePage;
