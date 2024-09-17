import styled from "@emotion/styled";
import { Modal } from "react-bootstrap";

export const PopupModal = styled(Modal)`
  .modal-dialog.modal-lg {
    max-width: 575px;
  }
  .modal-content {
    background-color: #1b1b1b !important;
    padding: 20px;
  }
`;

export const ModalTitle = styled(Modal.Title)`
  text-align: center;
  padding-top: 10px;
`;

export const ExitIconButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  border: none;
  color: grey;
  background-color: transparent;
  font-size: 20px;
  opacity: 0.38;
  transition: 0.5s;
  &:hover {
    opacity: 1;
  }
`;

export const ModalBody = styled(Modal.Body)``;

export const ContentContainer = styled.div`
  padding-top: 10px;
  margin-left: 2.5px;
  margin-right: 2.5px;
  .input-field {
    margin-bottom: 20px;
  }
  .carousel-inner {
    padding-left: 2px;
    padding-right: 2px;
  }
`;
