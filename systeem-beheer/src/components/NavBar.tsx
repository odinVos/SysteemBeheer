import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState<string>("scan-pas");

  function goToPage() {
    navigate("scan-pas");
  }

  return (
    <div className="navbar">
      <div className="navtop">
        <p>-</p>
      </div>
      <div className="navbottom">
        <ul>
          <li>
            <img id="logo" src={require("./logo-roc-nijmegen.png")} />
          </li>
          <li onClick={goToPage}>Home</li>
          <li>Uitlening afhandelen</li>
          <li>Product uitlenen</li>
          <li>Uitlening registreren</li>
          <li>Product toevoegen</li>
          <li>Product verwijderen</li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
