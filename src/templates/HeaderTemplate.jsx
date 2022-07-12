import { Route } from "react-router-dom";
import HeaderHome from "../components/HeaderHome";
import FooterHome from "../components/FooterHome";

export default function HomeTemplate(props) {
  return (
    <Route
      exact
      path={props.path}
      render={(propsRoute) => {
        return (
          <>
            <HeaderHome {...propsRoute} />
            <props.component {...propsRoute} />
            <FooterHome />
          </>
        );
      }}
    />
  );
}
