import { useCallback, useState } from "react";
import ModalComponent from "../library/modal";

interface IModalProps {
  title: string;
  text?: string;
  onSubmit?: any;
  children?: JSX.Element;
}

const useModal = (initialState = false) => {
  const [open, setOpen] = useState<boolean>(initialState);
  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const Modal: React.FC<IModalProps> = ({ title, children }) => {
    if (!open) return null;
    return (
      <ModalComponent title={title} onClose={closeModal} open={open}>
        {children}
      </ModalComponent>
    );
  };

  return { open, openModal, closeModal, Modal };
};

export default useModal;
