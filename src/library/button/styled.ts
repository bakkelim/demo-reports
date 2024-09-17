import styled from "@emotion/styled";

export const StyledButton = styled.button`
  height: 50px;
  padding: 0px 25px;
  border-radius: 10px;
  background: rgb(85, 74, 213);
  transition: 0.25s;
  background: linear-gradient(
    90deg,
    rgba(85, 74, 213, 1) 53%,
    rgba(104, 98, 173, 1) 100%
  );
  border-radius: 12px;
  border: none;
  font-size: 16px;
  color: #fff;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  &.variant-cancel {
    background: none;
    background-color: #fff !important;
    color: #121212;
  }
`;

export const StyledRoundedButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 22px;
  height: 40px;
  width: 40px;
  padding: 0px;
  border-radius: 8px;
  &.variant-delete {
    color: #d53c51;
  }
  &.variant-copy {
    background-color: #1b1b1b;
    color: #fff;
    font-size: 20px;
  }
`;
