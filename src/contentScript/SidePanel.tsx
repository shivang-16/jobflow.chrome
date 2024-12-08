import React, { useState } from "react";
import Draggable from "react-draggable";
import styles from "./SidePanel.module.scss";

const SidePanel: React.FC = () => {
  console.log("inside sidepanel");
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight / 2 });

  const handleStop = (e: any, data: any) => {
    const restX = data.x < window.innerWidth / 2 ? 0 : window.innerWidth - 80;
    setPosition({ x: restX, y: data.y });
  };

  console.log(position, "here is the position");

  return (
    <>
      <Draggable axis="both" onStop={handleStop}>
        <button
          className={styles.draggableButton}
          onClick={() => setIsOpen(true)}
        >
          Track Job
        </button>
      </Draggable>

      <div
        className={`${styles.sidePanel} ${isOpen ? styles.open : styles.closed}`}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Chat Gpt</h2>
          <button
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        </div>

        <div className={styles.content}>
          <p>
            <strong>21 employees</strong>
          </p>
          <p>Information Technology & Services</p>
          <div className={styles.tags}>
            <span className={styles.tag}>cybersecurity</span>
            <span className={styles.tag}>web development</span>
            <span className={styles.tag}>ads</span>
          </div>
          <p className={styles.location}>Location: Tallinn, Estonia</p>
        </div>

        <div className={styles.footer}>
          <button className={styles.saveButton}>Save Company</button>
        </div>
      </div>
    </>
  );
};

export default SidePanel;