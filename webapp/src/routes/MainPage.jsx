import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import WeeklyCalendar from "../components/WeeklyCalendar.jsx";
import CalendarThumbnail from "../components/CalendarThumbnail.jsx";
import styles from "../styles/MainPage.module.css";
import Category from "../components/Category.jsx";
import Navbar from "../components/Navbar.jsx";
import { infoState, nameState } from "../atoms";
import { useRecoilValue } from "recoil";
import { format } from "date-fns";

export const CalendarContext = createContext();
export const useCalendar = () => useContext(CalendarContext);

const MainPage = () => {
  const name = useRecoilValue(nameState);
  const info = useRecoilValue(infoState);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [goals, setGoals] = useState({});
  const [events, setEvents] = useState({});
  const [eventsProp, setEventsProp] = useState([]);
  const [dataForSelectedDate, setDataForSelectedDate] = useState({
    events: [],
    todos: [],
    goals: [],
  });

  const [eventsForSelectedDate, setEventsForSelectedDate] = useState([]);

  useEffect(() => {
    fetchEventsForSelectedDate();
  }, [selectedDate]);

  const fetchEventsForSelectedDate = async () => {
    try {
      const tokenstring = document.cookie;
      const token = tokenstring.split("=")[1];
      const selectedDateString = format(selectedDate, "yyyy-MM-dd"); // 시간 정보를 제외하고 날짜만 보내기

      console.log("메인페이지날짜 :", selectedDateString);
      const response = await axios.get(`http://3.39.153.9:3000/event/read`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEventsForSelectedDate(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const contextValue = {
    selectedDate,
    setSelectedDate,
    dataForSelectedDate,
    setDataForSelectedDate,
    eventsForSelectedDate,
    fetchEventsForSelectedDate,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      <div className={styles.mainWrapper}>
        <div className={styles.mainContainer}>
          <div className={styles.mainweeklyCalendar}>
            <WeeklyCalendar
              events={eventsProp}
              setEvents={setEventsProp}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
          <div className={styles.mainThumbnails}>
            <CalendarThumbnail goals={goals} />
          </div>
          <div className={styles.scheduleTodoRow}>
            <Category
              dataForSelectedDate={dataForSelectedDate}
              eventsProp={eventsProp} // 이렇게 Category 컴포넌트로 eventsProp을 전달합니다.
            />
          </div>
          <div>
            <Navbar className={styles.NavbarContainer} />
          </div>
        </div>
      </div>
    </CalendarContext.Provider>
  );
};

export default MainPage;
