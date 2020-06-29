import React, {
  useState,
  useRef,
  useEffect,
  InputHTMLAttributes,
  useCallback,
} from "react";
import { IconBaseProps } from "react-icons";
import { Container } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => {
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
      {Icon && <Icon size={20} />}
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={handleInputBlur}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

export default Input;
