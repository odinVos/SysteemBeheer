import React, { useEffect, useState } from "react";
import "./WizardCards.css";
import Lend from "../../models/Lend";
import Hardware from "../../models/Hardware";
import AutoComplete from "../autoComplete/AutoComplete";

function SelectProduct() {
  const [lends, setLends] = useState<Lend[]>([]);
  const [hardwares, setHardwares] = useState<Hardware[]>([]);
  const [valueSelectHardware, setValueSelectHardware] = useState<Hardware | undefined>();

  useEffect(() => {
    setHardwares([
      { id: "1", barCode: "ABC123", name: "Laptop Dell XPS 13" },
      { id: "2", barCode: "DEF456", name: "Monitor Samsung 24 inch" },
      { id: "3", barCode: "GHI789", name: "Keyboard Logitech MX Keys" },
      { id: "4", barCode: "JKL012", name: "Mouse Logitech MX Master 3" },
      { id: "5", barCode: "MNO345", name: "Headset Bose QuietComfort 35" },
      { id: "6", barCode: "PQR678", name: "Printer HP LaserJet Pro" },
      { id: "7", barCode: "STU901", name: "Tablet Apple iPad Pro" },
      { id: "8", barCode: "VWX234", name: "Smartphone Samsung Galaxy S21" },
      { id: "9", barCode: "YZA567", name: "External Hard Drive Seagate 2TB" },
      { id: "10", barCode: "BCD890", name: "Webcam Logitech C920" },
      { id: "11", barCode: "EFG123", name: "Microphone Blue Yeti" },
      { id: "12", barCode: "HIJ456", name: "Router TP-Link Archer C7" },
    ]);
  }, []);

  function GetLabelElement(hardware: Hardware): React.ReactElement {
    return (
      <span>
        {hardware.name} <span className="grey-text">&#40;{hardware.barCode}&#41;</span>
      </span>
    );
  }

  function SearchHardware(searchParam: string): Hardware[] {
    var filteredHardware: Set<Hardware> = new Set();
    
    // the items are filtered and are ordered by when this filter appears in the following code
    // the whole barcode matches with searchParam
    hardwares.filter((hardware) =>
      hardware.barCode == searchParam
    ).forEach((hardware) => filteredHardware.add(hardware));

    // start of barcode matches with searchParam
    hardwares.filter((hardware) =>
      hardware.barCode.startsWith(searchParam)
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
          borrowerId: "", // TODO: set borrowerId
          hardwareId: valueSelectHardware.id,
          hardware: valueSelectHardware,
          startDate: new Date(dateNow),
          plannedReturnDate: new Date(new Date(new Date(dateNow).setDate(dateNow.getDate() + 7*10)).setHours(0,0,0,0)),
          accessoryIds: [],
          accessories: [],
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
          <label htmlFor="passNumber">Voer hier het pasID in</label>
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