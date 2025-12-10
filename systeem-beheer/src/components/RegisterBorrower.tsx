import React from "react";
import CreateBorrower from "../models/CreateBorrower";
import Borrower from "../models/Borrower";

function RegisterBorrower(props:{borrower: Borrower, setBorrower: (borrower: Borrower) => void }) {
  function createBorrower(borrower: CreateBorrower): Borrower | undefined{
    return undefined;
  }

  function handleSubmit(formData: FormData) {
    const passNumber: string = formData.get("pasnummer") as string;
    const name: string = formData.get("name") as string;
    const surname: string = formData.get("surname") as string;
    const studentNumber: string = formData.get("studentNumber") as string;
    const studie: string = formData.get("studie") as string;
    const cohort: string = formData.get("cohort") as string;
    const borrowerFormData: CreateBorrower = {
      passNumber: passNumber,
      name: name,
      surname: surname,
      studentNumber: studentNumber,
      education: studie,
      cohort: cohort,
    };

    const borrower: Borrower | undefined = createBorrower(borrowerFormData);

    if(borrower == undefined){
      return;
    }

    props.setBorrower(borrower);
  }

  return (
    <form action={handleSubmit}>
      Register Borrower
      <input type="text" name="pasnummer" defaultValue={props.borrower.passNumber}/>
      <input type="text" name="studentNumber" defaultValue={props.borrower.studentNumber}/>
      <input type="text" name="name" defaultValue={props.borrower.name}/>
      <input type="text" name="surname" defaultValue={props.borrower.surname}/>
      <input type="text" name="education" defaultValue={props.borrower.education}/>
      <input type="text" name="cohort" defaultValue={props.borrower.cohort}/>
      <button type="submit">Volgende</button>
      <button type="button">Annuleren</button>
    </form>
  )
}

export default RegisterBorrower;