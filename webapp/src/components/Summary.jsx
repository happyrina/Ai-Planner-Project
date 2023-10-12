import React, { useEffect, useState } from "react";
import styles from "../styles/Summary.module.css";

function Summary() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = "Copple"; // TODO: Replace with actual user ID
      const tokenString = document.cookie;
      const token = tokenString.split("=")[1];

      if (!token) {
        setError("Token not found");
        return;
      }

      try {
        const response = await fetch(
          `http://3.39.153.9:8000/summarize_node_data/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.summary) {
          setSummary(data.summary);
        } else {
          throw new Error("Summary not found in response");
        }
      } catch (error) {
        console.error("There was an error!", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.SummaryPageContainer}>
      <div
        className={styles.SummaryPageWrapper}
        style={{ wordBreak: "break-all", height: "auto" }}
      >
        {summary ? summary : error ? `Error: ${error}` : "Loading…"}
      </div>
    </div>
  );
}

export default Summary;
