import React, { ChangeEventHandler, ReactElement, ReactNode, useEffect, useMemo, useRef } from "react";
import "./AutoComplete.css";

function AutoComplete<T>(props: {
  onSearch: (searchParam: string, items: T[]) => T[] | Promise<T[]>,
  getLabel?: (item: T) => string,
  getLabelElement?: (item: T) => ReactElement,
  items: T[],
  labelKey?: string,
  inputStyle?: React.CSSProperties,
  style?: React.CSSProperties,
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  onValueChange?: (value: T | undefined) => void,
}) {
  const [results, setResults] = React.useState<T[]>([]);
  const [value, setValue] = React.useState<T | undefined>();
  const [inputText, setInputText] = React.useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef, value]);

  useEffect(() => {
    for (const item of props.items) {
      if (GetLabel(item).toLocaleLowerCase() == inputText.toLocaleLowerCase()) {
        setValue(item);
        console.log("set value", item);
        return;
      }
    }
    console.log("clear value");
    setValue(undefined);
  }, [inputText]);

  useEffect(() => {
    if (props.onValueChange) {
      props.onValueChange(value);
    }
  }, [value]);


  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setResults([]);
      console.log(value);
      if (!value) {
        console.log("clear input text");
        setInputText("");
      }
      else {
        console.log("set input text to value");
        setInputText(GetLabel(value));
      }
    }
  }

  async function HandleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const searchParam: string = event.target.value;
    setInputText(searchParam);
    setResults(await props.onSearch(searchParam, props.items));
  }

  function SetInputWithIndex(event: React.MouseEvent<HTMLButtonElement>, index: number) {
    event.preventDefault();
    const selectedItem = results[index];
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

  function GetLabelElement(item: T): ReactNode {
    if (props.getLabelElement) {
      return props.getLabelElement(item);
    }
    return GetLabel(item);
  }

  function DropdownItems() {
    return results.map((result: T, index: number) => (
      <button className="dropdown-item" onClick={(event) => SetInputWithIndex(event, index)} key={index}>{GetLabelElement(result)}</button>
    ));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key =="Tab") {
      event.preventDefault();
      if(results.length > 0) {
        const firstItem = results[0];
        setInputText(GetLabel(firstItem));
      }
    }

    if (props.onKeyDown) {
      props.onKeyDown(event);
    }
  }

  return (
    <div style={props.style}>
      <input type="text" value={inputText} onChange={HandleChange} style={props.inputStyle} onKeyDown={handleKeyDown}/>
      <div ref={dropdownRef}>
        {results.length > 0 ? <div className="dropdown">
          {DropdownItems()}
        </div> : null}
      </div>
    </div>
  );
}

export default AutoComplete;