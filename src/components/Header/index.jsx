import { Button } from "antd";
import "./style.scss";
import { ReconciliationOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="header__logo" onClick={() => navigate("/")}>
        <div className="header__icon"><ReconciliationOutlined/></div>
        <h3 className="header__title">IT Jobs</h3>
      </div>
      <div className="header__nav">
        <Button
          className="header__signin-btn"
          color="primary"
          variant="outlined"
        >
          <NavLink to={"/login"}>Đăng nhập</NavLink>
        </Button>
        <Button type="primary">
          <NavLink to={"/register"}>Đăng ký</NavLink>
        </Button>
      </div>
    </div>
  );
}

export default Header;
