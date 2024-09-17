import styled from "@emotion/styled";

export const NavigationWrapper = styled.div``;

export const TitleWrapper = styled.div`
  padding: 30px 0px;
  text-align: center;
`;

export const Title = styled.h2`
  font-family: "Inclusive Sans", sans-serif;
  color: #fff;
  text-transform: uppercase;
  font-size: 22px;
  font-weight: 600;
`;

export const LinksWrapper = styled.div`
  a {
    text-decoration: none;
  }
`;

export const SelectionItem = styled.div`
  background: none;
  margin-bottom: 2.5px;
  &.active {
    background: rgb(85, 74, 213);
    background: linear-gradient(
      90deg,
      rgba(85, 74, 213, 1) 53%,
      rgba(104, 98, 173, 1) 100%
    );
    border-radius: 12px;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const InnerSelectionWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 17.5px 10px;
`;

export const LinkIcon = styled.span`
  max-width: 30px;
  font-size: 16px;
  padding-left: 10px;
  color: #909090;
  &.active {
    color: #fff;
  }
`;

export const LinkTitle = styled.span`
  font-family: "Raleway", sans-serif;
  margin-left: 10px;
  font-weight: 600;
  font-size: 16px;
  color: #909090;
  &.active {
    color: #fff;
  }
`;
