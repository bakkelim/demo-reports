import styled from "@emotion/styled";
import { Col, Row } from "react-bootstrap";

export const LayoutWrapper = styled.div`
  background-color: #121212;
  height: 100vh;
`;

export const LayoutRow = styled(Row)``;

export const LayoutCol = styled(Col)`
  height: 100vh;
  &.navigation {
    max-width: 300px;
    border-right: 1px solid #1f1f1f;
    padding-right: 0px;
  }
`;

export const ColumnWrapper = styled.div`
  padding: 20px;
`;
