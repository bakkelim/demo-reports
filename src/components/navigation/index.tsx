import {
  InnerSelectionWrapper,
  LinkIcon,
  LinkTitle,
  LinksWrapper,
  NavigationWrapper,
  SelectionItem,
  Title,
  TitleWrapper,
} from "./styled";
import { Link, useLocation } from "react-router-dom";

const FUNCTION_LINKS = [
  {
    icon: <i className="fa-solid fa-file"></i>,
    title: "Global User Access Report",
    target: "/insights",
  },
  {
    icon: <i className="fa-solid fa-file"></i>,
    title: "Orphaned Account Report",
    target: "/report2"
  },
  {
    icon: <i className="fa-solid fa-file"></i>,
    title: "Individual User Access Report",
    target: "/report3",
  },
];

const CONFIG_LINKS = [
  {
    icon: <i className="fa-solid fa-gear"></i>,
    title: "Configurations",
    target: "/configuration",
  },
];

const Navigation = () => {
  const location = useLocation();

  const isActive = (target: string) => {
    return location.pathname === target ? "active" : "";
  };

  return (
    <NavigationWrapper>
      <TitleWrapper>
        <Title>reporting application</Title>
      </TitleWrapper>
      <LinksWrapper>
        {FUNCTION_LINKS.map((link, key) => (
          <Link key={`${link.title}-${key}`} to={link.target}>
            <SelectionItem className={isActive(link.target)}>
              <InnerSelectionWrapper>
                <LinkIcon className={isActive(link.target)}>
                  {link.icon}
                </LinkIcon>
                <LinkTitle className={isActive(link.target)}>
                  {link.title}
                </LinkTitle>
              </InnerSelectionWrapper>
            </SelectionItem>
          </Link>
        ))}
      </LinksWrapper>
      <div className="border-t border-[#909090] my-2"></div>
      <LinksWrapper>
        {CONFIG_LINKS.map((link, key) => (
          <Link key={`${link.title}-${key}`} to={link.target}>
            <SelectionItem className={isActive(link.target)}>
              <InnerSelectionWrapper>
                <LinkIcon className={isActive(link.target)}>
                  {link.icon}
                </LinkIcon>
                <LinkTitle className={isActive(link.target)}>
                  {link.title}
                </LinkTitle>
              </InnerSelectionWrapper>
            </SelectionItem>
          </Link>
        ))}
      </LinksWrapper>
    </NavigationWrapper>
  );
};

export default Navigation;
