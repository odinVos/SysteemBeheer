import React from "react";
import Lender from "../../models/Lender";
import NavBar from "../NavBar";
import "./WizardCards.css";

function ScanPasLender(props: { setLender: (lender: Lender) => void }) {
  function getLenderByPassNumber(passNumber: string): Lender | undefined {
    if (passNumber === "12345") {
      return {
        id: "1",
        name: "John Doe",
        passNumber: "12345",
      };
    }
    return undefined;
  }

  function handleSubmit(formData: FormData) {
    const passNumber: string = formData.get("passNumber") as string;
    var lender: Lender | undefined = getLenderByPassNumber(
      passNumber as string
    );
    if (lender == undefined) {
      lender = {
        id: "",
        name: "",
        passNumber: passNumber,
      };
    }
    props.setLender(lender);
  }

  return (
    <div className="card">
      <form action={handleSubmit}>
        <p className="card-title">Scan uw schoolpas</p>
        <div className="inputfields">
          <div className="labeled-inputfield">
            <label htmlFor="passNumber">Voer hier het pasID in</label>
            <input type="text" name="passNumber" id="passNumber"/>
          </div>
        </div>
        <div className="card-button">
          <button type="button" className="secondary-button">
            Annuleren
          </button>
          <button type="submit" className="primary-button">
            Volgende
          </button>
        </div>
      </form>
    </div>
  );
}

export default ScanPasLender;
