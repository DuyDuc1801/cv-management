import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAPI } from "../../../utils/fetchAPI";
import Jobs from "../Job";
import './style.scss';

function ListJobsByCompany() {
    const idCompany = useParams();
    const [jobs, setJobs] = useState([]);
    const [company, setCompany] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const listJob = await getAPI(`http://localhost:3001/jobs?idCompany=${idCompany.idCompany}`);
            const allCompany = await getAPI("http://localhost:3001/company");
            const myCompany = allCompany.find(c => c.idCompany === parseInt(idCompany.idCompany));
            const result = listJob
                .map((job) => {
                const companyInfo = allCompany.find(
                    (c) => job.idCompany === c.idCompany
                );
                return {
                    ...job,
                    company: companyInfo ? companyInfo : "Unknown Company",
                };
                });
            setJobs(result);
            setCompany(myCompany);
            setLoading(false);
        } 
        fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className="container">
                {loading ? ("Loading...") : (
                    jobs.length === 0 ? (
                        <h3>Công ty {company.name} hiện chưa có vị trí nào cần tuyển dụng!</h3>
                    ) : (
                        <>
                            <h3>Các vị trí cần tuyển dụng của {jobs[0].company.name}</h3>
                            <div className="listJobByCompany">
                                {jobs.map(job => (
                                    <Jobs className="listJobByCompany__item" key={job.id} job={job}/>
                                ))}
                            </div>
                        </>
                    )
                )}
                
            </div>
        </>
    )
}

export default ListJobsByCompany;