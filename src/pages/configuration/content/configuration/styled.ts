import styled from "@emotion/styled";
import { Row, Col } from "react-bootstrap";

export const ConfigurationWrapper = styled.div`
  padding: 40px;
  border-radius: 20px;
  margin-bottom: 25px;
  background-color: #1b1b1b;
`;

export const InnerConfigurationContainer = styled.div``;

export const UpperRow = styled(Row)``;

export const UpperCol = styled(Col)`
  &.buttons {
    text-align: right;
  }
`;

export const Title = styled.h3`
  color: #fff;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 18px;
`;

export const DataWrapper = styled.div`
  position: relative;
  margin-top: 20px;
  .code-editor {
    position: relative;
    z-index: 1;
  }
`;

export const DeleteButton = styled.button`
  font-size: 16px;
  border: none;
  border-radius: 12.5px;
  background: transparent;
  color: #d42e45;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
`;

export const CodeOverlay = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  z-index: 3;
  border: 2px dashed #909090;
  border-radius: 10px;
  overflow: hidden;
  backdrop-filter: blur(3px);
  background: rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

export const OverlayContent = styled.div`
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const OverlayTitle = styled.span`
  display: block;
  color: #fff;
  text-align: center;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 18px;
`;

export const OverlayIcon = styled.span`
  display: block;
  color: #fff;
  font-size: 24px;
  text-align: center;
  margin-right: 10px;
`;

export const ModalContentWrapper = styled.div``;

export const ModalTextWrapper = styled.div`
  text-align: center;
`;

export const ModalButtonsWrapper = styled.div`
  margin-top: 25px;
  text-align: center;
  button {
    margin-left: 5px;
    margin-right: 5px;
  }
`;
