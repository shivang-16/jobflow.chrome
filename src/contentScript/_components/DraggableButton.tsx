import React, { useState } from 'react'
import Draggable from "react-draggable";
import styles from "../styles/DraggableButton.module.scss";

const DraggableButton = ({setIsOpen}) => {
  console.log(window.innerHeight, window.innerWidth, "here is dimenstion")
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleStop = (e: any, data: any) => {
      const restX = data.x < window.innerWidth / 2 ? 0 : window.innerWidth - 45;
      setPosition({ x: restX, y: data.y });
    };

  return (
    <Draggable position={position} axis="both" onStop={handleStop}>
    <button
      className={styles.jobflow_draggableButton}
      onClick={() => setIsOpen(true)}
    >
      <img       style={{
        borderRadius: position.x < 0 ? "10px 0 0 10px" : "0 10px 10px 0",
        transition: "border-radius 0.2s"
      }}
 src="https://res.cloudinary.com/ddszevvis/image/upload/v1733896685/errvzkge4g8wxvzehqkz.png" alt="Track Job" />
    </button>
  </Draggable>  )
}

export default DraggableButton