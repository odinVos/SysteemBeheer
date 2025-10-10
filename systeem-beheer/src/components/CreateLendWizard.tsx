import React, { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Lender from "../models/Lender";
import ScanPasLender from "./ScanPasLender";
import RegisterLender from "./RegisterLender";

function CreateLendWizard() {
  const navigate = useNavigate();

  const [lender , setLender] = useState<Partial<Lender>| undefined>(undefined);
  const [activePage, setActivePage] = useState<string>("scan-pas");

  function setLenderAndGoToNextPage(lender: Partial<Lender>) {
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
  }

  return (
    <div>
      lender: {lender?.name} - {lender?.pasNumber}
      <div></div>
      {pages[activePage]}
    </div>
  );
}

export default CreateLendWizard;