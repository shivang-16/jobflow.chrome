import React, { useState } from "react";

const styles = {
  formContainer: {
    // position: 'absolute',
    top: 0,
    right: 0,
    width: '300px',
    height: '100%',
    backgroundColor: 'black',
    boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.1)',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease-in-out',
    zIndex: 9999,
  },
  jobForm: {
    padding: '1rem',
  },
  input: {
    width: '100%',
    marginBottom: '1rem',
    padding: '0.5rem',
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
  },
  submitButton: {
    width: '100%',
    padding: '0.5rem',
    border: 'none',
    borderRadius: '0.5rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    cursor: 'pointer',
    marginBottom: '0.5rem',
  },
  cancelButton: {
    width: '100%',
    padding: '0.5rem',
    border: 'none',
    borderRadius: '0.5rem',
    backgroundColor: '#e5e7eb',
    color: '#1f2937',
    cursor: 'pointer',
  },
};

const JobForm: React.FC<{ setIsFormOpen: (isOpen: boolean) => void }> = ({ setIsFormOpen }) => {
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, companyName, salary, location });
    setIsFormOpen(false);
  };

  return (
    <div style={styles.formContainer}>
      <form onSubmit={handleSubmit} style={styles.jobForm}>
        <h2>Add Job</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.submitButton}>Submit</button>
        <button type="button" onClick={() => setIsFormOpen(false)} style={styles.cancelButton}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default JobForm;