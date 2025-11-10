import { Button,Form, Input, Select, Tag } from "antd";
import { useEffect, useState } from "react";
import { getAPI } from "../../utils/fetchAPI";
import {
  SearchOutlined,
  EnvironmentOutlined
} from "@ant-design/icons";
import "./style.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Jobs from "../Jobs/Job";
import { useDispatch } from "react-redux";
import { getInputSearch } from "../../actions/getInputSearch";
import Company from "../Company/Company";

function Home() {
  const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);
  const [companies, setCompanies] = useState([]);
  const dispatch = useDispatch();
  const nav = useNavigate();
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
    dispatch(getInputSearch(e));
    nav('/search-result');

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
                <Company company={company}/>
              </div>
            ))}
          </div>
          <div style={{display: "flex", justifyContent: "center"}}>
            <Button color="primary" variant="filled">
              <NavLink to={"/Company/all"}>Xem thêm</NavLink>
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
