import React from "react";
import NavBar from "../NavBar";
import "./WizardCards.css";
import Borrower from "../../models/Borrower";

function ScanPassBorrower(props: {
  setBorrower: (borrower: Borrower) => void;
}) {
  function getBorrowerByPassNumber(passNumber: string): Borrower | undefined {
    if (passNumber === "12345") {
      return {
        id: "1",
        name: "John",
        surname: "Doe",
        passNumber: "12345",
        studentNumber: "12345",
        cohort: "ABC123",
        education: "SD",
        lastTimeLend: new Date(),
      };
    }
    return undefined;
  }

  function handleSubmit(formData: FormData) {
    const passNumber: string = formData.get("passNumber") as string;
    var borrower: Borrower | undefined = getBorrowerByPassNumber(
      passNumber as string
    );
    if (borrower == undefined) {
      borrower = {
        id: "",
        name: "",
        surname: "",
        passNumber: passNumber,
        studentNumber: "",
        cohort: "",
        education: "",
        lastTimeLend: new Date(),
      };
    }
    props.setBorrower(borrower);
  }

  return (
    <div className="card">
      <form action={handleSubmit}>
        <p className="card-title">Scan uw schoolpas</p>
        <div className="inputfields">
          <div className="labeled-inputfield">
            <label htmlFor="passNumber">Voer hier het pasID in</label>
            <input type="text" name="passNumber" id="passNumber" />
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

export default ScanPassBorrower;
