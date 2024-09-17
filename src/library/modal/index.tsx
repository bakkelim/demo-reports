import Title from "../title";
import {
  ContentContainer,
  ExitIconButton,
  ModalBody,
  ModalTitle,
  PopupModal,
} from "./styled";

interface IModalProps {
  onClose: any;
  open: any;
  title?: string;
  children: any;
}

const Modal: React.FC<IModalProps> = ({ onClose, open, title, children }) => {
  return (
    <PopupModal size={"lg"} centered show={open} onHide={onClose}>
      <ModalTitle>
        <Title>{title}</Title>
        <ExitIconButton onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </ExitIconButton>
      </ModalTitle>
      <ModalBody>
        <ContentContainer>{children}</ContentContainer>
      </ModalBody>
    </PopupModal>
  );
};

export default Modal;
