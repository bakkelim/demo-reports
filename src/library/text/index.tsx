import { StyledText } from "./styled";

interface ITextProps {
  children: any;
}

const Text: React.FC<ITextProps> = ({ children }) => {
  return <StyledText>{children}</StyledText>;
};

export default Text;
