import styled from "@emotion/styled";
import { RoundedButton } from "../button";

export const CodeEditorWrapper = styled.div`
  button {
    position: absolute;
    right: 15px;
    bottom: 15px;
    z-index: 3;
  }
`;

export const CopyButton = styled(RoundedButton)`
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 3;
`;
