import { Avatar, Badge, Card, Tag } from "antd";
import {
  EnvironmentOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import "./style.scss";
import { NavLink } from "react-router-dom";

const { Meta } = Card;
function Jobs(props) {
    const { job } = props;
  return (
    <div className="job" key={job.id}>
      <Badge.Ribbon text="New">
        <Card hoverable>
          <Meta
            avatar={
              <Avatar src="https://vareno.vn/wp-content/uploads/2022/09/logo-acgen.jpg" />
            }
            title={job.company.name}
          />
          <h3>{job.name}</h3>
          <p>
            <EnvironmentOutlined style={{ color: "#2c0063ff" }} />{" "}
            {job.city.map((city) => city).join(", ")}
          </p>
          <p>
            <DollarOutlined style={{ color: "green" }} /> {job.salary}$
          </p>
          <p>
            <ClockCircleOutlined style={{ color: "#0042e7ff" }} /> Full-time
          </p>
          <div>
            {job.tags.map((tag, index) => (
              <Tag key={index} color="magenta">
                {tag}
              </Tag>
            ))}
          </div>
          <div
            style={{
              borderBottom: "1px solid #f0f0f0",
              margin: "18px 0",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Tag color="#108ee9">Còn tuyển</Tag>
            <NavLink to={`/Jobs/Detail/${job.id}`} style={{ color: "#da4f92ff" }}>
              Xem chi tiết <ArrowRightOutlined />
            </NavLink>
            
          </div>
        </Card>
      </Badge.Ribbon>
    </div>
  );
}

export default Jobs;
