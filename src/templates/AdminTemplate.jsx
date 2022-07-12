import { Route } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";

export default function AdminTemplate(props) {
  return (
    <Route
      exact
      path={props.path}
      render={(propsRoute) => {
        return (
          <>
            <HeaderAdmin {...propsRoute} />
            <props.component {...propsRoute} />
          </>
        );
      }}
    />
  );
}
