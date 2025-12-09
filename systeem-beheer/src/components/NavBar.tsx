import React from "react";
import { useNavigate } from "react-router-dom";
import rocLogo from "../assets/logo-roc-nijmegen.png";

function NavBar() {
  const navigate = useNavigate();

  function goToPage(page: string) {
    navigate(`/${page}`);
  }

  return (
    <nav>
      <div className="navtop">
        <p>-</p>
      </div>
      <div className="navbottom">
        <ul>
          <li>
            <img
              id="logo"
              onClick={() => goToPage("home")}
              src={rocLogo}
              alt="ROC logo"
            />
          </li>
          <li id="navlink" onClick={() => goToPage("home")}>
            Home
          </li>
          <li id="navlink" onClick={() => goToPage("")}>
            Uitlening afhandelen
          </li>
          <li id="navlink" onClick={() => goToPage("create-lend")}>
            Product uitlenen
          </li>
          <li id="navlink" onClick={() => goToPage("")}>
            Uitlening registreren
          </li>
          <li id="navlink" onClick={() => goToPage("")}>
            Product toevoegen
          </li>
          <li id="navlink" onClick={() => goToPage("")}>
            Product verwijderen
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
