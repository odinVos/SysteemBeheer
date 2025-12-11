import React, { useEffect, useState } from "react";
import "./WizardCards.css";
import Lend from "../../models/Lend";
import Hardware from "../../models/Hardware";
import AutoComplete from "../autoComplete/AutoComplete";
import Borrower from "../../models/Borrower";

function SelectProduct(props:{borrower: Borrower}) {
  const [lends, setLends] = useState<Lend[]>([]);
  const [hardwares, setHardwares] = useState<Hardware[]>([]);
  const [valueSelectHardware, setValueSelectHardware] = useState<Hardware | undefined>();

  useEffect(() => {
    setHardwares([
      { id: "1", barcode: "ABC123", name: "Laptop Dell XPS 13", totalCount: 5, defectiveCount: 0, deleted: false },
      { id: "2", barcode: "DEF456", name: "Monitor Samsung 24 inch", totalCount: 5, defectiveCount: 0, deleted: false },
      { id: "3", barcode: "GHI789", name: "Keyboard Logitech MX Keys", totalCount: 5, defectiveCount: 0, deleted: false},
      { id: "4", barcode: "JKL012", name: "Mouse Logitech MX Master 3", totalCount: 5, defectiveCount: 0, deleted: false },
      { id: "5", barcode: "MNO345", name: "Headset Bose QuietComfort 35", totalCount: 5, defectiveCount: 0, deleted: false },
      { id: "6", barcode: "PQR678", name: "Printer HP LaserJet Pro", totalCount: 5, defectiveCount: 0, deleted: false },
      { id: "7", barcode: "STU901", name: "Tablet Apple iPad Pro", totalCount: 5, defectiveCount: 0, deleted: false },
      { id: "8", barcode: "VWX234", name: "Smartphone Samsung Galaxy S21", totalCount: 5, defectiveCount: 0, deleted: false },
      { id: "9", barcode: "YZA567", name: "External Hard Drive Seagate 2TB", totalCount: 5, defectiveCount: 0, deleted: false },
      { id: "10", barcode: "BCD890", name: "Webcam Logitech C920", totalCount: 5, defectiveCount: 0, deleted: false },
      { id: "11", barcode: "EFG123", name: "Microphone Blue Yeti", totalCount: 5, defectiveCount: 0, deleted: false },
      { id: "12", barcode: "HIJ456", name: "Router TP-Link Archer C7", totalCount: 5, defectiveCount: 0, deleted: false },
    ]);
  }, []);

  function GetLabelElement(hardware: Hardware): React.ReactElement {
    return (
      <span>
        {hardware.name} <span className="grey-text">&#40;{hardware.barcode}&#41;</span>
      </span>
    );
  }

  function SearchHardware(searchParam: string): Hardware[] {
    var filteredHardware: Set<Hardware> = new Set();
    
    // the items are filtered and are ordered by when this filter appears in the following code
    // the whole barcode matches with searchParam
    hardwares.filter((hardware) =>
      hardware.barcode == searchParam
    ).forEach((hardware) => filteredHardware.add(hardware));

    // start of barcode matches with searchParam
    hardwares.filter((hardware) =>
      hardware.barcode.startsWith(searchParam)
    ).forEach((hardware) => filteredHardware.add(hardware));

    // start of name matches with searchParam
    hardwares.filter((hardware) =>
      hardware.name.toLowerCase().startsWith(searchParam.toLowerCase())
    ).forEach((hardware) => filteredHardware.add(hardware));

    // name contains searchParam
    hardwares.filter((hardware) =>
      hardware.name.toLowerCase().includes(searchParam.toLowerCase())
    ).forEach((hardware) => filteredHardware.add(hardware));

    return Array.from(filteredHardware);
  }

  function HandelKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (valueSelectHardware) {
        const dateNow = new Date();
        const newLend: Lend = {
          id: "",
          borrower: props.borrower,
          hardware: valueSelectHardware,
          startDate: new Date(dateNow),
          plannedReturnDate: new Date(new Date(new Date(dateNow).setDate(dateNow.getDate() + 7*10)).setHours(0,0,0,0)),
          accessories: [],
          returnDate: null,
        }
        console.log(newLend)
      }
    }
  }

  function HandelValueChange(hardware: Hardware | undefined) {
    setValueSelectHardware(hardware)
  }

  return (
    <div className="card">
      <form action={""}>
        <p className="card-title">Select hardware</p>
        <div className="inputfields">
          <div className="labeled-inputfield">
          <label htmlFor="passNumber">Voer hier barcode of naam van de hardware in</label>
            <AutoComplete
              onKeyDown={HandelKeyDown}
              items={hardwares}
              onSearch={SearchHardware}
              labelKey="name"
              inputStyle={{ 
                fontSize: "1rem",
                width: "100%",
                height: "2rem"
              }}
              style={{
                width: "100%",
              }}
              getLabelElement={GetLabelElement}
              onValueChange={HandelValueChange}
            />
          </div>
        </div>
        <div className="card-button">
          <button type="button" className="secondary-button">
            Annuleren
          </button>
          <button type="submit" className="primary-button">
            Volgende
          </button>
        </div>
      </form>
    </div>
  );
}

export default SelectProduct; 