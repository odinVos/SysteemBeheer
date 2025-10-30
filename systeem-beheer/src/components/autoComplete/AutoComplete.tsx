import React, { useEffect } from "react";
import "./AutoComplete.css";

function AutoComplete<T>(props: {
  onSearch: (searchParam: string, items: T[]) => T[] | Promise<T[]>,
  items: T[],
  labelKey?: string,
  inputStyle?: React.CSSProperties,
  style?: React.CSSProperties,
}) {
  const [results, setResults] = React.useState<T[]>([]);
  const [value, setValue] = React.useState<T | undefined>();

  async function HandleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const searchParam: string = event.target.value;
    setResults(await props.onSearch(searchParam, props.items));
  }

  function SetValueWithInde(event: React.MouseEvent<HTMLButtonElement>) {
    if (event.currentTarget.getAttribute("data-index") == null) {
      console.warn("data-index is null");
      return;
    }
    const indexStr: string = event.currentTarget.getAttribute("data-index") ?? "";
    const index: number = parseInt(indexStr);
    const selectedItem = results[index];
    setValue(selectedItem);
  }

  function GetLabel(item: T): string {
    if (props.labelKey) {
      const keys = props.labelKey.split(".");
      var value: any = item;
      keys.forEach((key) => {
        value = value[key];
      });
      return value;
    }
    return String(item);
  }

  function DropdownItems() {
    return results.map((result: T, index: number) => (
      <button onClick={SetValueWithInde} key={index}>{GetLabel(result)}</button>
    ));
  }

  return (
    <div style={props.style}>
      <input type="text" onChange={HandleChange} style={props.inputStyle}/>
      {results.length > 0 ? <div className="dropdown">
        {DropdownItems()}
      </div> : null}
    </div>
  );
}

export default AutoComplete;