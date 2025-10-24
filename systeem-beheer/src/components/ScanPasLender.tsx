import React from "react";
import Lender from "../models/Lender";
import NavBar from "./NavBar";

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
    const passNumber: string = formData.get("pasnummer") as string;
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
    <>
      <NavBar />
      <div className="card">
        <p className="card-title">Scan uw schoolpas</p>
        <form action={handleSubmit}>
          <div className="test">
            Voer hier het pasID in
            <input type="text" name="pasnummer" />
          </div>
          <div className="card-button">
            <button type="button" className="vorige">
              Annuleren
            </button>
            <button type="submit" className="volgende">
              Volgende
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ScanPasLender;
