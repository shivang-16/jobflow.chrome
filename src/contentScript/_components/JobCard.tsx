import React from 'react'

const styles = {
  jobflow_content: {
    padding: '1rem',
  },
  jobflow_tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  jobflow_tag: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
  },
  jobflow_location: {
    marginTop: '1rem',
  },
  jobflow_footer: {
    display: 'flex',
    padding: '1rem 0',
    borderTop: '1px solid #e5e7eb',
  },
  jobflow_status: {
    font: 'bold',
  },
  jobflow_saveButton: {
    width: '100%',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.5rem 0',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  jobflow_card: {
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    margin: '3px',
    padding: '1rem',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  jobflow_button: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '2px',
    margin: '4px',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#2563eb',
    },
  },
  jobflow_statusDropdown: {
    marginLeft: '1rem',
    padding: '2px',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb',
  },
  
  jobflow_logo: {
    width: '50px',
    height: '50px',
    margin: '1rem',
  },
  jobflow_card_header: {
    display: 'flex',
  },
}
const JobCard = ({ scrapedJob, handleTrackJob }: { scrapedJob: any, handleTrackJob: any }) => {
  return (
    <div style={styles.jobflow_content}>
    <div style={styles.jobflow_card}>
      <div style={styles.jobflow_card_header}>
      <img src={scrapedJob?.company_logo || scrapedJob?.company.company_logo} alt={`${scrapedJob?.company_name} logo`} style={styles.jobflow_logo} />
      <p>
        <strong>{scrapedJob?.title}</strong>
      </p>
      </div>
      <p>{scrapedJob?.company_name || scrapedJob?.company.company_name}</p>
      <p style={styles.jobflow_location}>Location: {scrapedJob?.job_location}</p>
      <p>Salary: {scrapedJob?.job_salary}</p>
      <p>Type: {scrapedJob?.job_type}</p>
      <a href={scrapedJob?.job_link} target="_blank" rel="noopener noreferrer">View Job</a>
    </div>

    <div style={styles.jobflow_footer}>
      {scrapedJob?.userId ? (
        <div style={styles.jobflow_status}>
          Status: {scrapedJob.status || 'Not Set'}
        </div>
      ) : (
        <>
          <button style={styles.jobflow_saveButton} onClick={handleTrackJob}>Track</button>
          <button>📑</button>
          <select style={styles.jobflow_statusDropdown}>
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