import { useCallback, useState } from "react";
import { ButtonsWrapper, ModalContentWrapper } from "./styled";
import { Button } from "../../../library/button";
import { CONFIGURATION_FIELDS } from "./config";
import { toast } from "react-toastify";
import useConfiguration from "../../../hooks/useConfiguration";

interface IModalContentProps {
  afterSave: any;
}

const ModalContent: React.FC<IModalContentProps> = ({ afterSave }) => {
  const { addConfigurationRecord } = useConfiguration();
  const [configuration, setConfiguration] = useState({
    title: "",
    value: "",
  });
  const handleChange = useCallback(
    (e: any) => {
      const { name, value } = e.target;
      setConfiguration({ ...configuration, [name]: value });
    },
    [setConfiguration, configuration]
  );

  const clickSave = () => {
    if (configuration.title !== "" && configuration.value !== "") {
      addConfigurationRecord(configuration);
      afterSave();
    } else {
      toast("Please fill in all of the fields.", { type: "error" });
    }
  };
  return (
    <ModalContentWrapper>
      {CONFIGURATION_FIELDS.map((field, key) => (
        <div key={`${field.name}-${key}`}>
          {field.renderInput(configuration, handleChange)}
        </div>
      ))}
      <ButtonsWrapper>
        <Button type="submit" onClick={clickSave} variant="default">
          <i className="fa-solid fa-plus" /> Add configuration
        </Button>
      </ButtonsWrapper>
    </ModalContentWrapper>
  );
};

export default ModalContent;
