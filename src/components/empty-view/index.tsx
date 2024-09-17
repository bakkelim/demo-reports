import Text from "../../library/text";
import Title from "../../library/title";
import {
  AnimationWrapper,
  EmptyViewWrapper,
  InnerContainer,
  TextWrapper,
} from "./styled";
import Lottie from "lottie-react";
import emptyView from "../../assets/animations/empty-view.json";

interface IEmptyViewProps {
  title: string;
  description: string;
}

const EmptyView: React.FC<IEmptyViewProps> = ({ title, description }) => {
  return (
    <EmptyViewWrapper>
      <InnerContainer>
        <AnimationWrapper>
          <Lottie animationData={emptyView} />
        </AnimationWrapper>
        <Title>{title}</Title>
        <TextWrapper>
          <Text>{description}</Text>
        </TextWrapper>
      </InnerContainer>
    </EmptyViewWrapper>
  );
};

export default EmptyView;
