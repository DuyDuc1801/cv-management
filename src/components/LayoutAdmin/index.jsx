import { Button, Layout, Menu, Popconfirm, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  FileDoneOutlined,
  LoginOutlined,
  InsertRowRightOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { deleteCookie, getCookie } from "../../utils/cookie";
import { getAPI } from "../../utils/fetchAPI";

function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const [reload, setReload] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState({});
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie("email");
      const admin = await getAPI(`http://localhost:3001/recruiter?email=${token}`);
      const curAdmin = admin[0];
      setCurrentAdmin(curAdmin);
      if (!token) {
        nav("/");
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const handleLogout = () => {
    deleteCookie("email");
    deleteCookie("phone");
    deleteCookie("fullName");
    setReload(!reload);
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          {/* Logo Section */}
          <div
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              padding: collapsed ? "0" : "0 24px",
              color: "white",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              transition: "all 0.2s",
            }}
          >
            {collapsed ? (
              <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>
                CV
              </h1>
            ) : (
              <div>
                <h1 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
                  CV Manager
                </h1>
                <p style={{ margin: 0, fontSize: "12px", opacity: 0.7 }}>
                  Admin Panel
                </p>
              </div>
            )}
          </div>

          {/* Menu Section */}
          <Menu
            style={{ fontSize: "14px", marginTop: 16 }}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            items={[
              {
                key: "dashboard",
                icon: <DashboardOutlined />,
                label: "Dashboard",
              },
              {
                key: "cv",
                icon: <FileDoneOutlined />,
                label: "Quản lý CV",
              },
              {
                key: "jobs",
                icon: <InsertRowRightOutlined />,
                label: "Việc làm",
              },
            ]}
          />

          {/* Logout Button - Fixed at Bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              padding: "16px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Popconfirm
              placement="topLeft"
              title="Xác nhận"
              description="Bạn chắc chắn muốn đăng xuất?"
              okText="Đăng xuất"
              cancelText="Hủy"
              onConfirm={handleLogout}
            >
              <Button
                type="primary"
                danger
                block
                icon={<LoginOutlined />}
                iconPosition="end"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {!collapsed && "Đăng xuất"}
              </Button>
            </Popconfirm>
          </div>
        </Sider>

        <Layout
          style={{ marginLeft: collapsed ? 80 : 200, transition: "all 0.2s" }}
        >
          {/* Header */}
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />

            {/* User Info Section */}
            <div
              style={{
                paddingRight: 24,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ textAlign: "right", lineHeight: "12px" }}>
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {currentAdmin.fullName}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#888",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {currentAdmin.email}
                </p>
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#1890ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                A
              </div>
            </div>
          </Header>

          {/* Content */}
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default LayoutAdmin;
