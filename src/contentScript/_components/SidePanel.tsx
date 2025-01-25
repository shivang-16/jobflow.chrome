import React, { useState, useEffect } from "react";
import urlList from './urlList';
import { getJobData, saveJob, scrapeJobPage } from "../../actions";
import DraggableButton from "./DraggableButton";
import JobForm from "./JobForm";
import getTokenFromBackground from "../../actions/getCookie";
import LoginButton from "../../components/shared/LoginButton/LoginButton";
import JobCard from "./JobCard";

const styles = {
  background: {
    backgroundColor: 'white',
    height: '100vh',
    zIndex: 999,
  },
  jobflow_sidePanel: {
    position: 'fixed',
    top: '20px',
    borderRadius: '10px',
    right: 0,
    height: '75%',
    width: '20rem',
    backgroundColor: 'white',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease-in-out',
    zIndex: 2147483647,
    overflow: 'auto',
  },
  jobflow_open: {
    transform: 'translateX(0)',
  },
  jobflow_closed: {
    transform: 'translateX(100%)',
  },
  jobflow_header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem 1rem',
    borderBottom: '1px solid #e5e7eb',
  },
  jobflow_title: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
  },
  jobflow_closeButton: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#4b5563',
    '&:hover': {
      color: '#1f2937',
    },
  },

  jobflow_searchBar: {
    flex: 1,
    marginRight: '1rem',
    padding: '0.5rem',
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
  },
  jobflow_addJobButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
  },
};

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

      <div style={{
        ...(isOpen ? styles.jobflow_open : styles.jobflow_closed)
      }}>
        {token ? (
          <>
            <div style={styles.jobflow_header}>
              <h2 style={styles.jobflow_title}>JobFlow</h2>
              <button
                style={styles.jobflow_closeButton}
                onClick={() => setIsOpen(false)}
              >
                &times;
              </button>
            </div>

            <div style={styles.jobflow_header}>
              <input
                type="text"
                placeholder="Search..."
                style={styles.jobflow_searchBar}
              />
              <button
                style={styles.jobflow_addJobButton}
                onClick={() => setIsFormOpen(true)}
              >
                Add
              </button>
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
) : (
  <LoginButton/>
)}
          {isFormOpen && <JobForm setIsFormOpen={setIsFormOpen} />} 
        </div>
     
    </>
  );
};

export default SidePanel;