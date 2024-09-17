import { useCallback, useState } from "react";
import { ButtonsWrapper, ModalContentWrapper } from "./styled";
import { Button } from "../../../library/button";
import { QUERY_FIELDS } from "./config";
import { toast } from "react-toastify";
import useQuery from "../../../hooks/useQuery";

interface IModalContentProps {
  afterSave: any;
}

const ModalContent: React.FC<IModalContentProps> = ({ afterSave }) => {
  const { addQuery } = useQuery();
  const [query, setQuery] = useState({
    title: "",
    value: "",
  });
  const handleChange = useCallback(
    (e: any) => {
      const { name, value } = e.target;
      setQuery({ ...query, [name]: value });
    },
    [setQuery, query]
  );

  const clickSave = () => {
    if (query.title !== "" && query.value !== "") {
      addQuery(query);
      afterSave();
    } else {
      toast("Please fill in all of the fields.", { type: "error" });
    }
  };
  return (
    <ModalContentWrapper>
      {QUERY_FIELDS.map((field, key) => (
        <div key={`${field.name}-${key}`}>
          {field.renderInput(query, handleChange)}
        </div>
      ))}
      <ButtonsWrapper>
        <Button type="submit" onClick={clickSave} variant="default">
          <i className="fa-solid fa-plus" /> Add query
        </Button>
      </ButtonsWrapper>
    </ModalContentWrapper>
  );
};

export default ModalContent;
