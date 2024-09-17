import styled from "@emotion/styled";
import { Col, Row } from "react-bootstrap";

export const ContentWrapper = styled.div``;

export const InnerContentWrapper = styled.div`
  max-width: 1200px;
  display: block;
  margin: 0 auto;
  padding-top: 75px;
`;

export const ModalContentWrapper = styled.div``;

export const Field = styled.div`
  &:first-of-type {
    margin-top: 0px;
  }
  margin-top: 20px;
  input,
  .code-editor {
    margin-top: 5px;
  }
`;

export const ButtonsWrapper = styled.div`
  margin-top: 25px;
`;

export const TableWrapper = styled.div`
  margin-top: 50px;
`;

export const UpperRow = styled(Row)``;

export const UpperCol = styled(Col)`
  &.align-right {
    text-align: right;
  }
`;
