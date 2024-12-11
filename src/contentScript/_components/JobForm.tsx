import React, { useState } from "react";
import styles from "../styles/JobForm.module.scss"; // Import the new styles

const JobForm: React.FC<{ setIsFormOpen: (isOpen: boolean) => void }> = ({ setIsFormOpen }) => {
    console.log('insid job form')
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle job submission logic here
    console.log({ title, companyName, salary, location });
    setIsFormOpen(false); // Close the form after submission
  };

  return (
    <div >
      <form onSubmit={handleSubmit} className={styles.jobflow_jobForm}>
        <h2>Add Job</h2>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
        <input type="text" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} required />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => setIsFormOpen(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default JobForm; 