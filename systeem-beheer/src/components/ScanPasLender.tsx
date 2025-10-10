import React from "react";
import Lender from "../models/Lender";

function ScanPasLender(props:{setLender: (lender: Lender) => void}) {

  function getLenderByPassNumber(passNumber: string): Lender | undefined {
    if (passNumber === "12345") {
      return {
        id: "1",
        name: "John Doe",
        passNumber: "12345"
      };
    }
    return undefined;
  }

  function handleSubmit(formData: FormData) {
    const passNumber: string = formData.get("pasnummer") as string;
    var lender: Lender | undefined = getLenderByPassNumber(passNumber as string);
    if (lender == undefined) {
      lender = {
        id: "",
        name: "",
        passNumber: passNumber
      };
    }
    props.setLender(lender);
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

export default ScanPasLender;