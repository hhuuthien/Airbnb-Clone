import { Route } from "react-router-dom";
import HeaderHome from "../components/HeaderHome";

export default function HomeTemplate(props) {
  return (
    <Route
      exact
      path={props.path}
      render={() => {
        return (
          <>
            <HeaderHome />
            <props.component />
          </>
        );
      }}
    />
  );
}
