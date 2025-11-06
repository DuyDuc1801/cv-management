import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAPI } from "../../../utils/fetchAPI";
import { Button, Col, Form, Input, Select } from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined
} from "@ant-design/icons";
import Jobs from "../Job";
import './style.scss'

function ListJobSearch() {
  const [result, setResult] = useState([]);
  const [cities, setCities] = useState([]);
  const [inputValues, setInputValues] = useState({});
//   const [reload, setReload] = useState(false);
  const inputSearch = useSelector((state) => state.getInputSearch);
  const dataFilter = (input, jobs) => {
    if (input.skill && input.city) {
            const result = jobs.filter(
            (item) =>
                item.city.includes(input.city) &&
                item.tags.includes(input.skill)
            );
            setResult(result);
        } else {
            const result = jobs.filter(
            (item) =>
                item.city.includes(input.city) ||
                item.tags.includes(input.skill)
            );
            setResult(result);
        }
  }
  useEffect(() => {
    const fetchData = async () => {
      const jobs = await getAPI(`http://localhost:3001/jobs`);
      const listCity = await getAPI("http://localhost:3001/cites");
      const company = await getAPI("http://localhost:3001/company");
        const allJobs = jobs
            .map((job) => {
            const companyInfo = company.find(
                (c) => job.idCompany === c.idCompany
            );
            return {
                ...job,
                company: companyInfo ? companyInfo : "Unknown Company",
            };
            });
      setCities(listCity);
      if(Object.keys(inputValues).length === 0){
        dataFilter(inputSearch, allJobs);
      }
      else{
        dataFilter(inputValues, allJobs);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ inputValues]);
  const handleSearch = (values) => {
      setInputValues(values);
  }
  return (
    <>
      <div className="listJobSearch">
        <div className="container">
          <Form
            onFinish={handleSearch}
            className="home__form-search"
            name="listJob-search"
            layout="inline"
            initialValues={{ remember: true }}
            style={{margin: 'auto', width: '100%'}}
          >
            <Col span={12}>
                <Form.Item name="skill">
                <Input
                    style={{ width: "100%", height: "42px" }}
                    prefix={<SearchOutlined style={{ color: "#ccc" }} />}
                    placeholder="Vị trí, kỹ năng..."
                />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item name="city">
                <Select
                    style={{ width: '100%', height: "42px" }}
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
            </Col>
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

          <div className="listJobSearch__list">
            {result.length > 0 ? (
                result.map(job => (
                    <Jobs className="listJobSearch__jobs" key={job.id} job={job}/>
                ))
            ) : (
                <h3 style={{fontStyle: 'italic', color: 'grey'}}>Không có kết quả tìm kiếm phù hợp...</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListJobSearch;
