import React, { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Borrower from "../models/Borrower";
import ScanPasLender from "./wizardCards/ScanPasLender";
import RegisterLender from "./RegisterLender";

function CreateLendWizard() {
  const navigate = useNavigate();

  const [lender, setLender] = useState<Borrower | undefined>(undefined);
  const [activePage, setActivePage] = useState<string>("scan-pas");

  function setLenderAndGoToNextPage(lender: Borrower) {
    setLender(lender);

    if (lender.id == undefined) {
      setActivePage("register-lender");
      return;
    }

    setActivePage("select-product");
  }

  const pages: { [key: string]: React.ReactNode } = {
    "scan-pas": <ScanPasLender setLender={setLenderAndGoToNextPage}/>,
    "register-lender": <RegisterLender lender={lender!} setLender={setLenderAndGoToNextPage}/>,
    "select-product": <div>select-product</div>,
  };

  return (
    <div>
      lender: {lender?.name} - {lender?.passNumber}
      <div></div>
      {pages[activePage]}
    </div>
  );
}

export default CreateLendWizard;
