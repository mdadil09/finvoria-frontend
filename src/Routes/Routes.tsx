/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Routes } from "react-router-dom";
import { allRoutes } from "./Index";
// import { useAuthContext } from "@/context";
const AllRoutes = () => {
  return (
    <Routes>
      <Route>
        {allRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};
export default AllRoutes;
