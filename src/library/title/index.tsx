import { StyledTitle } from "./styled";

interface TitleProps {
  children: any;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default Title;
