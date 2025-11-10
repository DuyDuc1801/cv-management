import { Avatar, Card, Tag } from "antd";
import { NavLink } from "react-router-dom";
import {
  EnvironmentOutlined,
  TeamOutlined,
  RightOutlined,
} from "@ant-design/icons";

function Company(props) {
  const {company} = props;
  return (
    <Card
      hoverable
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        height: "100%",
      }}
      cover={
        <div
          style={{
            background: "#91bfffff",
            height: "80px",
            position: "relative",
          }}
        />
      }
    >
      <div
        style={{
          marginTop: "-50px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Avatar
          size={80}
          src={company.logo}
          style={{
            border: "4px solid white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            backgroundColor: "#aaadbbff",
          }}
        >
          {!company.logo && company.name?.charAt(0)}
        </Avatar>
      </div>

      <div style={{ marginTop: "12px" }}>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "8px",
            color: "#1a1a1a",
          }}
        >
          {company.name}
        </h3>

        <p
          style={{
            color: "#666",
            fontSize: "14px",
            marginBottom: "12px",
            minHeight: "40px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {company.description || company.address}
        </p>

        <div style={{ marginBottom: "8px" }}>
          <p
            style={{
              margin: "6px 0",
              fontSize: "13px",
              color: "#555",
            }}
          >
            <EnvironmentOutlined
              style={{ color: "#667eea", marginRight: "6px" }}
            />
            {company.address || "Đang cập nhật"}
          </p>
          <p
            style={{
              margin: "6px 0",
              fontSize: "13px",
              color: "#555",
            }}
          >
            <TeamOutlined style={{ color: "#667eea", marginRight: "6px" }} />
            {company.numberEmployees
              ? `${company.numberEmployees}+ nhân viên`
              : "Đang cập nhật"}
          </p>
        </div>

        <div style={{ margin: "12px 0" }}>
          <Tag
            color="blue"
            style={{
              marginBottom: "6px",
              borderRadius: "12px",
              fontSize: "12px",
            }}
          >
            Công nghệ
          </Tag>
          <Tag
            color="green"
            style={{
              marginBottom: "6px",
              borderRadius: "12px",
              fontSize: "12px",
            }}
          >
            IT Solutions
          </Tag>
        </div>

        <div
          style={{
            borderTop: "1px solid #f0f0f0",
            paddingTop: "12px",
            marginTop: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "#667eea",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Đang tuyển
          </span>
          <NavLink to={`/Company/${company.idCompany}`}>
            Xem chi tiết <RightOutlined />
          </NavLink>
        </div>
      </div>
    </Card>
  );
}

export default Company;
