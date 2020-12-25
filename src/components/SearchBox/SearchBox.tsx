import React, { useState } from "react";
import debounce from "lodash.debounce";

interface SearchBarProps {
  onChange?: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange, placeholder }) => {
  const [query, setQuery] = useState();

  return (
    <div>
      <input placeholder={placeholder} />
    </div>
  );
};

export default SearchBar;
