import { Outlet, useLocation } from "react-router-dom";
import Headers from "../Header";
import Footer from "../Footer";
import './style.scss';
import { useEffect } from "react";

function LayoutDefault() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="layoutdefault">
    <div className="layout-default__header">
        <Headers />
    </div>
      <div className="layout-default__content">
        <Outlet />
      </div>
      <div className="layout-default__footer">
        <Footer />
      </div>
    </div>
  );
}

export default LayoutDefault;
