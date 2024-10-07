import styled from "@emotion/styled";

export const ContentWrapper = styled.div``;

export const InnerContentWrapper = styled.div`
  max-width: 800px;
  display: block;
  margin: 0 auto;
  padding-top: 75px;
`;

export const FormWrapper = styled.div`
  padding: 20px;
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

export const ResponseContentWrapper = styled.div`
  widht: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin: 0 auto;
  padding-top: 20px;
`;

export const NodeCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 20px;
  background-color: #1b1b1b;
`;

export const NodeType = styled.div`  
  text-align: center;
  background: rgb(85, 74, 213);
  background: linear-gradient(
    90deg,
    rgba(85, 74, 213, 1) 53%,
    rgba(104, 98, 173, 1) 100%
  );
  border-radius: 12px;
  border: none;
  font-size: 16px;
  color: #fff;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  padding: 2px 10px;
`;
