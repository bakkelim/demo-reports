import Navigation from "../navigation";
import { LayoutRow, LayoutCol, LayoutWrapper, ColumnWrapper } from "./styled";

interface LayoutProps {
  content: any;
}

const Layout: React.FC<LayoutProps> = ({ content }) => {
  return (
    <LayoutWrapper>
      <LayoutRow>
        <LayoutCol className="navigation">
          <ColumnWrapper>
            <Navigation />
          </ColumnWrapper>
        </LayoutCol>
        <LayoutCol>
          <ColumnWrapper>{content}</ColumnWrapper>
        </LayoutCol>
      </LayoutRow>
    </LayoutWrapper>
  );
};

export default Layout;
