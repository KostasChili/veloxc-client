import { Outlet, Link } from "react-router-dom";

import DashFooter from "./DashFooter";

const DashLayout = () => {
  return (
    <>
      <div >
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
};

export default DashLayout;
