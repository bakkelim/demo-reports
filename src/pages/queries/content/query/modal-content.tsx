import { Button } from "../../../../library/button";
import Text from "../../../../library/text";
import {
  ModalButtonsWrapper,
  ModalContentWrapper,
  ModalTextWrapper,
} from "./styled";

interface IModalContentProps {
  onCancel: any;
  onDelete: any;
}

const ModalContent: React.FC<IModalContentProps> = ({ onCancel, onDelete }) => {
  return (
    <ModalContentWrapper>
      <ModalTextWrapper>
        <Text>
          Are you sure you want to delete this query? If you delete it
          you will not be able to restore it.
        </Text>
      </ModalTextWrapper>
      <ModalButtonsWrapper>
        <Button type="button" onClick={onCancel} variant="cancel">
          Cancel
        </Button>
        <Button type="button" onClick={onDelete} variant="default">
          Yes, delete it
        </Button>
      </ModalButtonsWrapper>
    </ModalContentWrapper>
  );
};

export default ModalContent;
