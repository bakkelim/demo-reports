import styled from "@emotion/styled";

export const ContentWrapper = styled.div``;

export const InnerContentWrapper = styled.div`
  max-width: 800px;
  display: block;
  margin: 0 auto;
  padding-top: 75px;
`;

export const FormWrapper = styled.div`
  padding: 40px;
  border-radius: 20px;
  margin-top: 25px;
  background-color: #1b1b1b;
`;

export const Field = styled.div`
  margin-bottom: 15px;
  &:first-of-type {
    margin-top: 0px;
  }
  input,
  .code-editor,
  select {
    margin-top: 5px;
  }
`;

export const Form = styled.form``;

export const ButtonsWrapper = styled.div`
  margin-top: 25px;
`;
