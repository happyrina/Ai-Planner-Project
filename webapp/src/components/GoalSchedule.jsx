import React, { useState, useEffect } from "react";
import styles from "../styles/GoalSchedule.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modeState } from "../atoms";

function GoalSchedule({ eventId }) {
  // console.log("event_id :", eventId);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("일정");
  const [loadedData, setLoadedData] = useState({ schedules: [], todos: [] });
  const [mode, setMode] = useRecoilState(modeState);
  useEffect(() => {
    if (eventId) {
      const tokenstring = document.cookie;
      const token = tokenstring.split("=")[1];
      const todourl = `http://3.39.153.9:3000/todo/groupByGoal/${eventId}`;
      const planurl = `http://3.39.153.9:3000/event/groupByGoal/${eventId}`;

      axios
        .get(planurl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          const schedules = Object.entries(data).map(([date, events]) => {
            console.log(date, "is date", events, "is events");
            events.sort(
              (a, b) => new Date(a.startDatetime) - new Date(b.startDatetime)
            );
            return {
              day: date.substring(5),
              schedules: events.map((event) => ({
                title: event.title,
                time: `${event.startDatetime.substring(
                  10,
                  16
                )}  - ${event.endDatetime.substring(10, 16)}`,
              })),
            };
          });

          schedules.sort((a, b) => new Date(a.day) - new Date(b.day));

          setLoadedData((prevState) => ({ ...prevState, schedules }));
        });
      axios
        .get(todourl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data;

          const schedules = Object.entries(data).map(([date, events]) => {
            events.sort(
              (a, b) => new Date(a.startDatetime) - new Date(b.startDatetime)
            );
            return {
              day: date.substring(5),
              todos: events.map((event) => ({
                title: event.title,
              })),
            };
          });

          schedules.sort((a, b) => new Date(a.day) - new Date(b.day));

          setLoadedData((prevState) => ({ ...prevState, schedules }));
        })

        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [eventId]);

  const getButtonClassName = (category) =>
    selectedCategory === category ? `${styles.active}` : "";

  const getBlueButtonClassName = () =>
    selectedCategory === "추가"
      ? `${styles.active} ${styles.blueButton}`
      : `${styles.blueButton}`;
  const MovetoCretaeHandler = (category) => {
    setMode(false);
    if (category === "일정") {
      navigate("/plan");
    } else {
      navigate("/todo");
    }
  };
  console.log(loadedData);
  const handleTodoToggle = (todoId) => {
    console.log(`Toggle todo with ID ${todoId}`);
  };

  return (
    <div>
      <div className={styles.categoryRow}>
        <div className={styles.buttnoCategory}>
          <button
            className={getButtonClassName("일정")}
            onClick={() => setSelectedCategory("일정")}
          >
            일정
          </button>
          <button
            className={getButtonClassName("할일")}
            onClick={() => setSelectedCategory("할일")}
          >
            할일
          </button>
        </div>
        <button
          style={{ marginLeft: "175px" }}
          className={getBlueButtonClassName("추가")}
          onClick={() => MovetoCretaeHandler(selectedCategory)}
        >
          + 추가
        </button>
      </div>

      {selectedCategory === "일정" && (
        <div className={styles.scrollableContainer}>
          <div className={styles.scheduleContainer}>
            {loadedData.schedules.map((daySchedule, index) => (
              <div key={`day-${index}`} className={styles.daySchedule}>
                <h3 className={styles.scheduledate}>
                  {`${daySchedule.day.slice(0, 2)}월`}{" "}
                  {`${daySchedule.day.slice(3)}일`}
                </h3>
                {daySchedule.schedules.map((schedule, idx) => (
                  <div key={`schedule-${idx}`} className={styles.scheduleBox}>
                    <div>{schedule.title}</div>
                    <div>{schedule.time}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedCategory === "할일" && (
        <div className={styles.todoContainer}>
          {loadedData.todos.map((todo) => (
            <div key={todo.id} className={styles.todoItem}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleTodoToggle(todo.id)}
              />
              <span>{todo.task}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GoalSchedule;
