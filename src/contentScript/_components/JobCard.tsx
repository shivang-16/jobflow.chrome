import React from 'react'
import styles from "../styles/SidePanel.module.scss";

const JobCard = ({ scrapedJob, handleTrackJob }: { scrapedJob: any, handleTrackJob: any }) => {
  return (
    <div className={styles.jobflow_content}>
    <div className={styles.jobflow_card}>
      <div className={styles.jobflow_card_header}>
      <img src={scrapedJob?.company_logo || scrapedJob?.company.company_logo} alt={`${scrapedJob?.company_name} logo`} className={styles.jobflow_logo} />
      <p>
        <strong>{scrapedJob?.title}</strong>
      </p>
      </div>
      <p>{scrapedJob?.company_name || scrapedJob?.company.company_name}</p>
      <p className={styles.jobflow_location}>Location: {scrapedJob?.job_location}</p>
      <p>Salary: {scrapedJob?.job_salary}</p>
      <p>Type: {scrapedJob?.job_type}</p>
      <a href={scrapedJob?.job_link} target="_blank" rel="noopener noreferrer">View Job</a>
    </div>

    <div className={styles.jobflow_footer}>
      {scrapedJob?.userId ? (
        <div className={styles.jobflow_status}>
          Status: {scrapedJob.status || 'Not Set'}
        </div>
      ) : (
        <>
          <button className={styles.jobflow_saveButton} onClick={handleTrackJob}>Track</button>
          <button>📑</button>
          <select className={styles.jobflow_statusDropdown}>
            <option value="applied">App</option>
            <option value="interviewing">Inte</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </>
      )}
    </div>
  </div>
    )
}

export default JobCard