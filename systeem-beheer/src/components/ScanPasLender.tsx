import React from "react";
import Lender from "../models/Lender";

function ScanPasLender(props:{setLender: (lender: Partial<Lender>) => void}) {

  function getLenderByPassNumber(passNumber: string): Lender | undefined {
    if (passNumber === "12345") {
      return {
        id: "1",
        pasNumber: "12345",
        name: "John",
        surName: "Doe",
        studentNumber: "123",
        cohort: "2025",
        education: "SD",
        lastTimeLent: new Date,
      };
    }
    return undefined;
  }

  function handleSubmit(formData: FormData) {
    const passNumber: string = formData.get("pasnummer") as string;
    var lender: Partial<Lender> | undefined = getLenderByPassNumber(passNumber as string);
    if (lender == undefined) {
      lender = {
        pasNumber: passNumber
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