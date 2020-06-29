import React, { useState, useRef, useEffect, useCallback } from "react";
import { FiSearch } from "react-icons/fi";

import { Container } from "./styles";

const Search: React.FC = ({ ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    setIsFilled(!!inputRef.current?.value);
  }, [inputRef]);

  return (
    <Container isFocused={isFocused} isFilled={isFilled}>
      <FiSearch size={20} />
      <input
        placeholder="Buscar sala..."
        onFocus={() => setIsFocused(true)}
        onBlur={handleInputBlur}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

export default Search;
