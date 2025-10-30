import { useEffect, useState } from "react";
import { getAPI } from "../../../utils/getAPI";
import Jobs from "../Job";
import { Spin, Pagination } from "antd";
import './style.scss';
import { params } from "../../../utils/Params";

function AllJobs(){
    const param = params;
    const [allJobs, setAllJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalJobs, setTotalJobs] = useState(0);
    const [start, setStart] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            const allJobs = await getAPI(`http://localhost:3001/jobs`);
            const listJobs = await getAPI(`http://localhost:3001/jobs?_start=${start}&_limit=${param.limit}`);
            const company = await getAPI("http://localhost:3001/company");
            const result = listJobs.map((job) => {
                const companyInfo = company.find((c) => job.idCompany === c.idCompany);
                return {
                    ...job,
                    company: companyInfo ? companyInfo : "Unknown Company",
                }
            });
            setTotalJobs(allJobs.length);
            setAllJobs(result);
            setLoading(false);
            
        }
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [start]);
    const handlePagination = (page, pageSize) => {
        page === 1 ? setStart(0) : setStart((page-1)*pageSize);
    }
 
    return(
        <>
            <div className="container">
                <h3>Tất cả công việc đang cần tuyển</h3>
                <div className="allJobs">
                    {loading ? (<Spin />) : (
                        allJobs.map(job => (
                            <Jobs className="allJobs__item" key={job.id} job={job}/>
                        ))
                    )}
                    <Pagination onChange={handlePagination} pageSize={param.limit} style={{marginTop: "24px"}} defaultCurrent={1} total={totalJobs} />
                </div>
            </div>
        </>
    )
}

export default AllJobs;