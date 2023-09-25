import React, { useState } from "react";
import styles from "../styles/Schedule.module.css";

function GoalSchedule() {
  const [selectedCategory, setSelectedCategory] = useState("일정");
  const schedules = [
    {
      day: 1,
      schedules: [
        { title: "인천 → 방콕", time: "02:00am - 08:32am" },
        { title: "왕궁, 왓포 사원 방문 ", time: "11:00am - 02:00pm" },
        { title: "저녁이야~~", time: "18:00" },
      ],
    },
    {
      day: 1,
      schedules: [
        { title: "인천 → 방콕", time: "02:00am - 08:32am" },
        { title: "왕궁, 왓포 사원 방문 ", time: "11:00am - 02:00pm" },
        { title: "저녁이야~~", time: "18:00" },
      ],
    },
    {
      day: 2,
      schedules: [
        { title: "2일차 일정", time: "11:00" },
        { title: "인천 → 방콕", time: "02:00am - 08:32am" },
        { title: "왕궁, 왓포 사원 방문 ", time: "11:00am - 02:00pm" },
        { title: "저녁이야~~", time: "18:00" },
      ],
    },
    {
      day: 3,
      schedules: [
        { title: "3일차 일정", time: "11:00" },
        { title: "인천 → 방콕", time: "02:00am - 08:32am" },
        { title: "왕궁, 왓포 사원 방문 ", time: "11:00am - 02:00pm" },
        { title: "저녁이야~~", time: "18:00" },
      ],
    },
  ];

  return (
    <div>
      <div className={styles.categoryRow}>
        <div>
          {" "}
          <button
            className={selectedCategory === "일정" ? "active" : "nonactive"}
            onClick={() => setSelectedCategory("일정")}
          >
            일정
          </button>
          <button
            className={selectedCategory === "할일" ? "active" : "nonactive"}
            onClick={() => setSelectedCategory("할일")}
          >
            할일
          </button>
        </div>
        <button
          className={
            selectedCategory === "추가" ? "active blue-button" : "blue-button"
          }
          onClick={() => setSelectedCategory("추가")}
        >
          + 추가
        </button>
      </div>
      {selectedCategory === "일정" && (
        <div className={styles.scheduleContainer}>
          {schedules.map((daySchedule, index) => (
            <div key={index} className={styles.daySchedule}>
              <h3>{daySchedule.day}일 차</h3>
              {daySchedule.schedules.map((schedule, idx) => (
                <div key={idx} className={styles.scheduleBox}>
                  <div>{schedule.title}</div>
                  <div>{schedule.time}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GoalSchedule;
