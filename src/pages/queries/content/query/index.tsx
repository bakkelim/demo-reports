import {
  CodeOverlay,
  QueryWrapper,
  DataWrapper,
  DeleteButton,
  InnerQueryContainer,
  OverlayContent,
  OverlayIcon,
  OverlayTitle,
  Title,
  UpperCol,
  UpperRow,
} from "./styled";
import CodeEditor from "../../../../library/code-editor";
import { Fragment, useState } from "react";
import { Query as QueryConfig } from "../../../../hooks/useQuery";

interface IQueryProps {
  record: QueryConfig;
  openModal: () => void;
}

const Query: React.FC<IQueryProps> = ({
  record,
  openModal,
}) => {
  const [shouldBlur, setShouldBlur] = useState<boolean>(true);

  return (
    <Fragment>
      <QueryWrapper>
        <InnerQueryContainer>
          <UpperRow>
            <UpperCol className="my-auto">
              <Title>{record?.title}</Title>
            </UpperCol>
            <UpperCol className="buttons my-auto">
              <DeleteButton onClick={openModal}>
                <i className="fa-regular fa-trash-can" /> Delete
              </DeleteButton>
            </UpperCol>
          </UpperRow>
          <DataWrapper>
            <CodeEditor disabled value={record?.value} />
            {shouldBlur && (
              <CodeOverlay onClick={() => setShouldBlur(false)}>
                <OverlayContent>
                  <OverlayIcon>
                    <i className="fa-regular fa-eye" />
                  </OverlayIcon>
                  <OverlayTitle>View query</OverlayTitle>
                </OverlayContent>
              </CodeOverlay>
            )}
          </DataWrapper>
        </InnerQueryContainer>
      </QueryWrapper>
    </Fragment>
  );
};

export default Query;
