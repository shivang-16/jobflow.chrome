import React, { useState, useEffect } from "react";
import styles from "../styles/SidePanel.module.scss";
import urlList from './urlList'; // Import the URL list
import { saveJob, scrapeJobPage } from "../../actions";
import DraggableButton from "./DraggableButton";
import JobForm from "./JobForm"; // Import the new JobForm component
import { getTokenFromBackground } from "../../apiClient/apiClient";

const SidePanel: React.FC = () => {
  console.log("inside sidepanel");
  const [isOpen, setIsOpen] = useState(false);
  const [scrapedJob, setScrapedJob] = useState<any>()
  const [isFormOpen, setIsFormOpen] = useState(false); // State to control form visibility

  useEffect(() => {
    (async () => {
      const currentUrl = window.location.href;
      // Check if the current URL matches any of the specified prefixes
      const isUrlMatched = urlList.some(url => currentUrl.startsWith(url));
      if (isUrlMatched) {
        const data = await scrapeJobPage(currentUrl, 'ycombinator');
        if (typeof data !== 'string') {
          console.log(data.data);
          setScrapedJob(data.data);
          setIsOpen(true);
        } else {
          console.error("Received string instead of AxiosResponse:", data);
        }
      }

      console.log(await getTokenFromBackground(), "here is token")

    })(); 
  }, []); 
    
  const handleTrackJob = async() => {
    const data = {}
    const reponse = await saveJob(data)
  }
  return (
    <>
      <DraggableButton setIsOpen={setIsOpen}/>

   
        <div className={`${styles.jobflow_sidePanel} ${isOpen ? styles.jobflow_open : styles.jobflow_closed}`}>
          <div className={styles.jobflow_header}>
            <h2 className={styles.jobflow_title}>Detail</h2>
            <button
              className={styles.jobflow_closeButton}
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>

          <div className={styles.jobflow_header}>
            <input type="text" placeholder="Search..." className={styles.jobflow_searchBar} />
            <button className={styles.jobflow_addJobButton} onClick={() => setIsFormOpen(true)}>Add Job</button>
          </div>

          {scrapedJob ? (
          <div className={styles.jobflow_content}>
            <div className={styles.jobflow_card}>
              <div className={styles.jobflow_card_header}>
              <img src={scrapedJob?.company_logo} alt={`${scrapedJob?.company_name} logo`} className={styles.jobflow_logo} />
              <p>
                <strong>{scrapedJob?.title}</strong>
              </p>
              </div>
              <p>{scrapedJob?.company_name}</p>
              <p className={styles.jobflow_location}>Location: {scrapedJob?.job_location}</p>
              <p>Salary: {scrapedJob?.job_salary}</p>
              <p>Type: {scrapedJob?.job_type}</p>
              <a href={scrapedJob?.job_link} target="_blank" rel="noopener noreferrer">View Job</a>
            </div>

            <div className={styles.jobflow_footer}>
              <button className={styles.jobflow_saveButton}>Tracker</button>
              <button>📑</button>
              <select className={styles.jobflow_statusDropdown}>
                <option value="applied">App</option>
                <option value="interviewing">Inte</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
 ) : (
  
    <p>No scraped data found.</p>
)}
          {isFormOpen && <JobForm setIsFormOpen={setIsFormOpen} />}
        </div>
     
    </>
  );
};

export default SidePanel;