import { StyledButton, StyledRoundedButton } from "./styled";

interface ButtonProps {
  onClick: any;
  variant: "default" | "delete" | "copy" | "cancel";
  type: "button" | "submit";
  icon?: any;
  children?: any;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  variant,
  children,
}) => {
  return (
    <StyledButton onClick={onClick} className={`variant-${variant}`}>
      {children}
    </StyledButton>
  );
};

export const RoundedButton: React.FC<ButtonProps> = ({
  onClick,
  variant,
  icon,
}) => {
  return (
    <StyledRoundedButton onClick={onClick} className={`variant-${variant}`}>
      {icon}
    </StyledRoundedButton>
  );
};
