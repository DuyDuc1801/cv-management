/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getAPI } from "../../../utils/fetchAPI";
import { Pagination, Spin } from "antd";
import Company from "../Company";
import { params } from "../../../utils/Params";

function AllCompanies() {
  const [companies, setCompanies] = useState([]);
  const [start, setStart] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [loading, setLoading] = useState(true);
  const { limit } = params;
  useEffect(() => {
    const getData = async () => {
      const allCompanies = await getAPI(`http://localhost:3001/company?_start=${start}&_limit=${limit}`);
      const totalCompanies = await getAPI(`http://localhost:3001/company`);
      setCompanies(allCompanies);
      setTotalCompanies(totalCompanies.length);
      setLoading(false);
    };
    getData();
  }, [start]);
  const handlePagination = (page, pageSize) => {
    page === 1 ? setStart(0) : setStart((page - 1) * pageSize);
  };
  return (
    <>
      <div className="container">
        <h3>Tất cả công ty hàng đầu!</h3>
        <div className="allJobs">
          {loading ? (
            <Spin />
          ) : (
            companies.map((company) => (
              <div className="home__list-company__item" key={company.idCompany}>
                <Company company={company} />
              </div>
            ))
          )}
          <Pagination
            onChange={handlePagination}
            pageSize={limit}
            style={{ marginTop: "24px" }}
            defaultCurrent={1}
            total={totalCompanies}
          />
        </div>
      </div>
    </>
  );
}

export default AllCompanies;
