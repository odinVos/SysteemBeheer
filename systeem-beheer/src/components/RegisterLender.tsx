import React from "react";
import Lender from "../models/Lender";
import CreateLender from "../models/CreateLender";

function RegisterLender(prop: {lender: Partial<Lender>, setLender: (lender: Lender) => void }) {
  function createLender(lender: CreateLender): Lender | undefined{
    return undefined;
  }

  function handleSubmit(formData: FormData) {
    const passNumber: string = formData.get("pasnummer") as string;
    const name: string = formData.get("name") as string;
    const surName: string = formData.get("surName") as string;
    const studentNumber: string = formData.get("studentNumber") as string;
    const studie: string = formData.get("studie") as string;
    const cohort: string = formData.get("cohort") as string;
    const lenderFormData: CreateLender = {
      pasNumber: passNumber,
      name: name,
      surName: surName,
      studentNumber: studentNumber,
      education: studie,
      cohort: cohort,
    };

    const lender: Lender | undefined = createLender(lenderFormData);

    if(lender == undefined){
      return;
    }

    createLender(lender);
  }

  return (
    <form action={handleSubmit}>
      Register Lender
      <input type="text" name="pasnummer" defaultValue={prop.lender.pasNumber}/>
      <input type="text" name="studentNumber"/>
      <input type="text" name="name"/>
      <input type="text" name="surName"/>
      <input type="text" name="studie"/>
      <input type="text" name="cohort"/>
      <button type="submit">Volgende</button>
      <button type="button">Annuleren</button>
    </form>
  )
}

export default RegisterLender;