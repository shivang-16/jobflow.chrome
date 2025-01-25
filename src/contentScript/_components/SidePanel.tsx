import React, { useState, useEffect } from "react";
import styles from "../styles/SidePanel.module.scss";
import urlList from './urlList'; // Import the URL list
import { getJobData, saveJob, scrapeJobPage } from "../../actions";
import DraggableButton from "./DraggableButton";
import JobForm from "./JobForm"; // Import the new JobForm component
import getTokenFromBackground from "../../actions/getCookie";
import LoginButton from "../../components/shared/LoginButton/LoginButton";
import JobCard from "./JobCard";

const SidePanel: React.FC = () => {
  console.log("inside sidepanel");
  const [isOpen, setIsOpen] = useState(true);
  const [scrapedJob, setScrapedJob] = useState<any>()
  const [jobs, setJobs] = useState<any>()
  const [isFormOpen, setIsFormOpen] = useState(false); // State to control form visibility
  const [token, setToken] = useState('')

  useEffect(() => {
    (async () => {
      const currentUrl = window.location.href;
      // Check if the current URL matches any of the specified prefixes
      const matchedUrl = urlList.find(url => currentUrl.startsWith(url.url));
      if (matchedUrl) {
        setIsOpen(true);
        const data = await scrapeJobPage(currentUrl, matchedUrl.platform);
        if (typeof data !== 'string') {
          console.log(data.data);
          setScrapedJob(data.data);
        } else {
          console.error("Received string instead of AxiosResponse:", data);
        }

        const jobs = await getJobData(1, matchedUrl.platform, '')
        console.log(jobs, "here is jobs")
        setJobs(jobs.jobs)
      }
      
      const jwt_token = await getTokenFromBackground() as string
      setToken(jwt_token)

    })(); 
  }, []); 

    
  const handleTrackJob = async() => {
    if (scrapedJob) {
      const jobData = {
        ...scrapedJob,
        status: 'applied' // Set default status when tracking
      }

      const response = await saveJob(jobData)
      if (response.success) {
        setScrapedJob({ ...scrapedJob, userId: response.data.userId, status: 'applied' })
      }
    }
  }
  return (
    <>
      {/* <DraggableButton setIsOpen={setIsOpen}/> */}

   
        <div className={`${styles.jobflow_sidePanel} ${isOpen ? styles.jobflow_open : styles.jobflow_closed}`}>
          { token ? <><div className={styles.jobflow_header}>
            <h2 className={styles.jobflow_title}>JobFlow</h2>
            <button
              className={styles.jobflow_closeButton}
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>

          <div className={styles.jobflow_header}>
            <input type="text" placeholder="Search..." className={styles.jobflow_searchBar} />
            <button className={styles.jobflow_addJobButton} onClick={() => setIsFormOpen(true)}>Add</button>
          </div>

          {scrapedJob ? (
            <JobCard scrapedJob={scrapedJob} handleTrackJob={handleTrackJob}/>
 ) : (
  
    <p>No scraped data found.</p>
)}

 <div>
  <h2 className="jobflow-p-2 jobflow-font-semibold"> Other jobs --</h2>
  {jobs && jobs.map((job: any) => (
    <JobCard key={job._id} scrapedJob={job} handleTrackJob={handleTrackJob}/>
  ))}
 </div>
</>
: <LoginButton/>}
          {isFormOpen && <JobForm setIsFormOpen={setIsFormOpen} />} 
        </div>
     
    </>
  );
};

export default SidePanel;