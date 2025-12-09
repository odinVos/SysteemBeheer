import React from "react";
import Lender from "../../models/Borrower";
import NavBar from "../NavBar";
import "./WizardCards.css";
import Borrower from "../../models/Borrower";

function ScanPasLender(props: { setLender: (lender: Borrower) => void }) {
  function getLenderByPassNumber(passNumber: string): Borrower | undefined {
    if (passNumber === "12345") {
      return {
        id: "1",
        name: "John",
        surname: "Doe",
        passNumber: "12345",
        studentNumber: "12345",
        cohort: "ABC123",
        education: "SD",
        lastTimeLend: new Date()
      };
    }
    return undefined;
  }

  function handleSubmit(formData: FormData) {
    const passNumber: string = formData.get("passNumber") as string;
    var lender: Borrower | undefined = getLenderByPassNumber(
      passNumber as string
    );
    if (lender == undefined) {
      lender = {
        id: "",
        name: "",
        surname: "",
        passNumber: passNumber,
        studentNumber: "",
        cohort: "",
        education: "",
        lastTimeLend: new Date()
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
