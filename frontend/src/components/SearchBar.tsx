import { useState } from "react";
import styled from "styled-components";

const Search = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 90%;
  border-radius: 17px;
  padding: 10px;
  padding-left: 15px;
  padding-right: 40px;
  border: 0;
  color: #333333;
  box-shadow: 0px 3px 3px #cdcdcd;
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
`;

const SearchCategory = styled.select`
  border-radius: 17px;
  border: 0;
  box-shadow: 0px 3px 3px #cdcdcd;
  padding-left: 5px;
  margin-right: 3px;
`;

interface SearchBarProps {
  isMain: boolean;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setSearchCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ isMain, setSearchInput, setSearchCategory}: SearchBarProps) {
  const [timer, setTimer] = useState<number>(0);

  const handleOnChange = (value: string) => {
    clearTimeout(timer);
    const newTimer = window.setTimeout(() => {
      setSearchInput(value);
    }, 500);

    setTimer(newTimer);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      setSearchInput((e.target as HTMLInputElement).value);
    }
  };

  return (
    <Search>
      {isMain
        ?<SearchCategory
            onChange={(e)=> setSearchCategory(e.target.value)}>
          <option value="cluster">Cluster</option>
          <option value="host">Host</option>
        </SearchCategory>
        : null
      }
      <SearchInput
        placeholder={isMain ? "" : "thread id or name"}
        onChange={(e) => handleOnChange(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
        />
      <SearchIcon className="material-icons">search</SearchIcon>
    </Search>
  );
}
