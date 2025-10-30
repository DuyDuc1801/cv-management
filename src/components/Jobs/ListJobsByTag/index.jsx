import { useParams } from 'react-router-dom';
import './style.scss';
import { useEffect, useState } from 'react';
import { getAPI } from '../../../utils/getAPI';
import Jobs from '../Job';
import { Tag } from 'antd';
function ListJobsByTag() {
    const idTag = useParams();
    const [jobs, setJobs] = useState([]);
    const [tag, setTag] = useState("");
    console.log(idTag);
    useEffect(() => {
        const fetchJobsByTag = async () => {
            const tag= await getAPI(`http://localhost:3001/tags/${idTag.tagId}`);
            const jobs = await getAPI(`http://localhost:3001/jobs`);
            const jobByTag = jobs.filter(job => {
                return job.tags.includes(tag.value);
            });
            const company = await getAPI("http://localhost:3001/company");
            const result = jobByTag.map((job) => {
                const companyInfo = company.find((c) => job.idCompany === c.idCompany);
                return {
                    ...job,
                    company: companyInfo ? companyInfo : "Unknown Company",
                }
            })
            setTag(tag.value);
            setJobs(result);
        }
        fetchJobsByTag();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <div className="container">
        <h3 style={{margin: "0", paddingTop: "24px"}}>Công việc liên quan đến <Tag style={{fontSize: "16px", padding: "4px 8px"}} color='magenta'>{tag}</Tag></h3>
        <div className="listJobByTag">
            {jobs.map(item => (
                <Jobs key={item.id} job={item} />
            ))}
        </div>
    </div>
  );
}

export default ListJobsByTag;