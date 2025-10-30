import React, { useEffect } from "react";
import "./AutoComplete.css";

function AutoComplete<T>(props: {
  onSearch: (searchParam: string, items: T[]) => T[] | Promise<T[]>,
  getLabel?: (item: T) => string,
  items: T[],
  labelKey?: string,
  inputStyle?: React.CSSProperties,
  style?: React.CSSProperties,
}) {
  const [results, setResults] = React.useState<T[]>([]);
  const [value, setValue] = React.useState<T | undefined>();
  const [inputText, setInputText] = React.useState<string>("");

  async function HandleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const searchParam: string = event.target.value;
    setInputText(searchParam);
    if (value && GetLabel(value) != searchParam) {
      setValue(undefined);
    }
    setResults(await props.onSearch(searchParam, props.items));
  }

  function HandleBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (!value || GetLabel(value) != inputText) {
      setValue(undefined);
      setInputText("");
    }
    setResults([]);
  }

  function SetValueWithIndex(event: React.MouseEvent<HTMLButtonElement>, index: number) {
    console.log("hit set value");
    event.preventDefault();
    const selectedItem = results[index];
    setValue(selectedItem);
    setInputText(GetLabel(selectedItem));
  }

  function GetLabel(item: T): string {
    if (props.getLabel) {
      return props.getLabel(item);
    }
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
      <button className="dropdown-item" onClick={(event) => SetValueWithIndex(event, index)} key={index}>{GetLabel(result)}</button>
    ));
  }

  return (
    <div style={props.style}>
      <input type="text" value={inputText} onChange={HandleChange} onBlur={HandleBlur} style={props.inputStyle}/>
      {results.length > 0 ? <div className="dropdown">
        {DropdownItems()}
      </div> : null}
    </div>
  );
}

export default AutoComplete;