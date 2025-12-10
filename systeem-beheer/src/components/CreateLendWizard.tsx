import React, { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Borrower from "../models/Borrower";
import ScanPassBorrower from "./wizardCards/ScanPassBorrower";
import RegisterBorrower from "./RegisterBorrower";
import SelectProductLender from "./wizardCards/SelectProduct";

function CreateLendWizard() {
  const navigate = useNavigate();

  const [borrower, setBorrower] = useState<Borrower>({
        id: "",
        name: "",
        surname: "",
        passNumber: "",
        studentNumber: "",
        cohort: "",
        education: "",
        lastTimeLend: new Date()
  });

  const [activePage, setActivePage] = useState<string>("scan-pas");

  function setborrowerAndGoToNextPage(borrower: Borrower) {
    setBorrower(borrower);

    if (borrower.id == "") {
      setActivePage("register-borrower");
      return;
    }

    setActivePage("select-product");
  }

  const pages: { [key: string]: React.ReactNode } = {
    "scan-pas": <ScanPassBorrower setBorrower={setborrowerAndGoToNextPage}/>,
    "register-borrower": <RegisterBorrower borrower={borrower} setBorrower={setborrowerAndGoToNextPage}/>,
    "select-product": <SelectProductLender/>,
  };

  return (
    <div>
      borrower: {borrower?.name} - {borrower?.passNumber}
      <div></div>
      {pages[activePage]}
    </div>
  );
}

export default CreateLendWizard;
