import { Avatar, Button, Card, Form, Input, Select, Tag } from "antd";
import { useEffect, useState } from "react";
import { getAPI } from "../../utils/fetchAPI";
import {
  SearchOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  RightOutlined,
} from "@ant-design/icons";
import "./style.scss";
import { NavLink } from "react-router-dom";
import Jobs from "../Jobs/Job";

function Home() {
  const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const listCity = await getAPI("http://localhost:3001/cites");
      const listJob = await getAPI("http://localhost:3001/jobs");
      const company = await getAPI("http://localhost:3001/company");
      const tags = await getAPI("http://localhost:3001/tags");
      const result = listJob
        .map((job) => {
          const companyInfo = company.find(
            (c) => job.idCompany === c.idCompany
          );
          return {
            ...job,
            company: companyInfo ? companyInfo : "Unknown Company",
          };
        })
        .filter((_, index) => index < 6);
      setData(result);
      setCities(listCity);
      setTags(tags);
      setCompanies(company.filter((_, index) => index < 6));
    };
    getData();
  }, []);

  const handleSearch = (e) => {
    console.log(e);
  }

  return (
    <>
      <div className="container">
        <div className="home">
          <div className="home__title">
            <h1>Tìm công việc</h1>
            <h1 className="home__title--gradient">Mơ ước của bạn</h1>
            <p style={{ color: "#888" }}>
              Khám phá hơn 10,000+ cơ hội việc làm từ các công ty hàng đầu
            </p>
          </div>
          <div className="home__search">
            <Form
              onFinish={handleSearch}
              className="home__form-search"
              name="home-search"
              layout="inline"
              initialValues={{ remember: true }}
            >
              <Form.Item name="skill">
                <Input
                  style={{ width: "400px", height: "42px" }}
                  prefix={<SearchOutlined style={{ color: "#ccc" }} />}
                  placeholder="Vị trí, kỹ năng..."
                />
              </Form.Item>
              <Form.Item name="city">
                <Select
                  style={{ width: 160, height: "42px" }}
                  placeholder="Chọn thành phố"
                  prefix={<EnvironmentOutlined style={{ color: "#ccc" }} />}
                >
                  {cities.map((city) => (
                    <Select.Option key={city.id} value={city.value}>
                      {city.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  style={{ height: "42px" }}
                  type="primary"
                  htmlType="submit"
                >
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="home__tags">
            {tags.map((tag) => (
              <Tag key={tag.id} color="magenta" className="home__tags__item">
                <NavLink to={`/Jobs/Tag/${tag.id}`}>{tag.value}</NavLink>
              </Tag>
            ))}
          </div>

          <h3 style={{marginTop: "48px", color: "#14005bff"}}>Công ty hàng đầu</h3> 
          <div className="home__list-company">
            {companies.map((company) => (
              <div className="home__list-company__item" key={company.idCompany}>
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
                        <TeamOutlined
                          style={{ color: "#667eea", marginRight: "6px" }}
                        />
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
                      <NavLink to={`Company/${company.idCompany}`}>Xem chi tiết <RightOutlined /></NavLink>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          <div style={{display: "flex", justifyContent: "center"}}>
            <Button color="primary" variant="filled">
              <NavLink to={"/notfound"}>Xem thêm</NavLink>
            </Button>
          </div>
          <div className="home__list-jobs">
            <div className="home__list-jobs__title">
              <h2>Công việc nổi bật</h2>
              <p>Cơ hội tuyệt vời đang chờ bạn!</p>
            </div>
            <div className="home__list-jobs__content">
              {data.map((job) => {
                return (
                  <div className="home__list-jobs__item" key={job.id}>
                    <Jobs job={job} />
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{display: "flex", justifyContent: "center"}}>
            <Button color="primary" variant="filled">
              <NavLink to={"/Jobs"}>Xem thêm</NavLink>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
