import React, { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Lender from "../models/Lender";
import ScanPasLender from "./wizardCards/ScanPasLender";

function CreateLendWizard() {
  const navigate = useNavigate();

  const [lender, setLender] = useState<Lender | undefined>(undefined);
  const [activePage, setActivePage] = useState<string>("scan-pas");

  function setLenderAndGoToNextPage(lender: Lender) {
    setLender(lender);

    if (lender.id == "") {
      setActivePage("register-lender");
      return;
    }

    setActivePage("select-product");
  }

  const pages: { [key: string]: React.ReactNode } = {
    "scan-pas": <ScanPasLender setLender={setLenderAndGoToNextPage} />,
    "register-lender": <div>register-lender</div>,
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
