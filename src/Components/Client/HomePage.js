import React from "react";
import { localstorage_key_for_client } from "./../../redux/AllData";

function HomePage() {
  // for logging out
  const handle_user_logout = () => {
    window.localStorage.removeItem(localstorage_key_for_client);
    window.location.reload();
  };
  return (
    <div className="Client_home_page">
      <nav></nav>

      <button onClick={handle_user_logout}>Logout</button>
    </div>
  );
}

export default HomePage;
