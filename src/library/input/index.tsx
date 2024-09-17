import { StyledInput } from "./styled";

interface InputProps {
  value: string;
  onChange: any;
  name?: string;
}

const Input: React.FC<InputProps> = ({ value, name = "", onChange }) => {
  return <StyledInput value={value} name={name} onChange={onChange} />;
};

export default Input;
