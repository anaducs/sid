import React, { useState, useEffect } from "react";

function Timer({ timer }) {
  const [seconds, setSeconds] = useState(Math.floor(timer / 1000));

  useEffect(() => {
    if (seconds <= 0) return; // Stop when countdown reaches 0

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [seconds]);

  return (
    <div className="Timer">
      <p>{seconds}</p>
    </div>
  );
}

export default Timer;
