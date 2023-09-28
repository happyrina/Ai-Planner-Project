import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import styles from "../styles/Timeline.module.css";

const Timeline = ({ eventsProp = [] }) => {
  const [events, setEvents] = useState(eventsProp);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showOptionsIndex, setShowOptionsIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editingTitles, setEditingTitles] = useState({});
  const dropdownRef = useRef();

  const fetchMoreEvents = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const tokenString = document.cookie;
      const token = tokenString.split("=")[1];
      const response = await axios.get(
        `http://3.39.153.9:3000/todo/read?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEvents((prevEvents) => [...prevEvents, ...response.data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching more events", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollHeight - (scrollTop + clientHeight) < 50) {
      // Adjust as needed
      fetchMoreEvents();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const deleteEvent = async (index, eventId) => {
    if (window.confirm("이 이벤트를 정말로 삭제하시겠습니까?")) {
      try {
        const tokenString = document.cookie;
        const token = tokenString.split("=")[1];
        await axios.delete(`http://3.39.153.9:3000/event/delete/${eventId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setShowOptionsIndex(null);
      } catch (error) {
        console.error("Could not delete event", error);
      }
    }
  };

  const finishEditing = async (eventId, newTitle) => {
    try {
      const tokenString = document.cookie;
      const token = tokenString.split("=")[1];
      await axios.put(
        `http://3.39.153.9:3000/event/update/${eventId}`,
        { title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditIndex(null);
    } catch (error) {
      console.error("Could not finish editing", error);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptionsIndex(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.app}>
      <ul className={styles["event-list"]}>
        {eventsProp.map((event, index) => (
          <li
            key={event.event_id}
            className={styles["event-item"]}
            style={{
              backgroundColor: `hsl(${180 + ((index * 35) % 55)}, 60%, 82%)`,
            }}
          >
            <span className={styles["event-time"]}>
              {new Date(event.startDatetime).toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </span>
            {editIndex === event.event_id ? (
              <input
                className={styles["edit-input"]}
                value={editingTitles[event.event_id] || ""}
                onChange={(e) =>
                  setEditingTitles({
                    ...editingTitles,
                    [event.event_id]: e.target.value,
                  })
                }
                onBlur={() =>
                  finishEditing(event.event_id, editingTitles[event.event_id])
                }
                autoFocus
              />
            ) : (
              <span
                className={styles["event-title"]}
                onDoubleClick={() => {
                  setEditIndex(event.event_id);
                  setEditingTitles({
                    ...editingTitles,
                    [event.event_id]: event.title,
                  });
                }}
              >
                {event.title}
              </span>
            )}
            <span
              className={styles.options}
              onClick={() =>
                setShowOptionsIndex(
                  showOptionsIndex === event.event_id ? null : event.event_id
                )
              }
            >
              {editIndex === event.event_id ? "완료" : "..."}
              {showOptionsIndex === event.event_id &&
                editIndex !== event.event_id && (
                  <div className={styles["dropdown-options"]} ref={dropdownRef}>
                    <button
                      className={styles["edit-btn"]}
                      onClick={() => {
                        setEditIndex(event.event_id);
                        setEditingTitles({
                          ...editingTitles,
                          [event.event_id]: event.title,
                        });
                      }}
                    >
                      수정
                    </button>
                    <button
                      className={styles["delete-btn"]}
                      onClick={() => deleteEvent(index, event.event_id)}
                    >
                      삭제
                    </button>
                  </div>
                )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
