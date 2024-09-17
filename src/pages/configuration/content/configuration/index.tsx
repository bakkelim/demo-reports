import {
  CodeOverlay,
  ConfigurationWrapper,
  DataWrapper,
  DeleteButton,
  InnerConfigurationContainer,
  OverlayContent,
  OverlayIcon,
  OverlayTitle,
  Title,
  UpperCol,
  UpperRow,
} from "./styled";
import CodeEditor from "../../../../library/code-editor";
import { Fragment, useState } from "react";
import { Config } from "../../../../hooks/useConfiguration";

interface IConfigurationProps {
  record: Config;
  openModal: () => void;
}

const Configuration: React.FC<IConfigurationProps> = ({
  record,
  openModal,
}) => {
  const [shouldBlur, setShouldBlur] = useState<boolean>(true);

  return (
    <Fragment>
      <ConfigurationWrapper>
        <InnerConfigurationContainer>
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
                  <OverlayTitle>View configuration</OverlayTitle>
                </OverlayContent>
              </CodeOverlay>
            )}
          </DataWrapper>
        </InnerConfigurationContainer>
      </ConfigurationWrapper>
    </Fragment>
  );
};

export default Configuration;
