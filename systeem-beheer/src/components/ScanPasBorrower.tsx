import React from "react";
import Borrower from "../models/Borrower";

function ScanPasBorrower(props:{setBorrower: (borrower: Borrower) => void}) {

  function getBorrowerByPassNumber(passNumber: string): Borrower | undefined {
    // TODO: make backend call
    if (passNumber === "12345") {
      return {
        id: "1",
        passNumber: "12345",
        name: "John",
        surname: "Doe",
        studentNumber: "123",
        cohort: "2025",
        education: "SD",
        lastTimeLend: new Date,
      };
    }
    return undefined;
  }

  function handleSubmit(formData: FormData) {
    const passNumber: string = formData.get("pasnummer") as string;
    var borrower: Borrower | undefined = getBorrowerByPassNumber(passNumber as string);
    if (borrower == undefined) {
      borrower = {
        id: "",
        studentNumber: "",
        name: "",
        surname: "",
        cohort: "",
        education: "",
        lastTimeLend: new Date,
        passNumber: passNumber,
      };
    }
    props.setBorrower(borrower);
  }

  return (
    <form action={handleSubmit}>
      ScanPasLender:
      <input type="text" name="pasnummer" />
      <button type="submit">Volgende</button>
      <button type="button">Annuleren</button>
    </form>
  );
}

export default ScanPasBorrower;