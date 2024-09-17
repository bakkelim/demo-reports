import { StyledLabel } from "./styled";

interface LabelProps {
  children: any;
}

const Label: React.FC<LabelProps> = ({ children }) => {
  return <StyledLabel>{children}</StyledLabel>;
};

export default Label;
