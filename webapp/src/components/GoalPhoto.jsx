import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "../styles/GoalPhoto.module.css";
import defaultImage from "../assets/noimg.png";
import threebutton from "../assets/more.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { infoState, modeState, nameState } from "../atoms";
import { useNavigate } from "react-router-dom";
import backSvg from "../assets/back.svg";

function GoalPhoto({ eventId }) {
  const [data, setData] = useState({
    goalPhoto: null,
    goalTitle: "",
    startDatetime: "",
    endDatetime: "",
  });
  const navigate = useNavigate();
  const info = useRecoilValue(infoState);
  const name = useRecoilValue(nameState);
  const dropdownRef = useRef();
  const [clicked, setClicked] = useState(false);
  const [mode, setMode] = useRecoilState(modeState);

  const tokenstring = document.cookie;
  const token = tokenstring.split("=")[1];
  const onClickHandler = () => {
    setClicked(!clicked);
  };
  useEffect(() => {
    if (eventId) {
      const goalUrl = `http://3.39.153.9:3000/goal/read/${eventId}`;

      axios
        .get(goalUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((goalResponse) => {
          const { photoUrl, title, startDatetime, endDatetime } =
            goalResponse.data;
          setData({
            goalPhoto: photoUrl || defaultImage,
            goalTitle: title,
            startDatetime,
            endDatetime,
          });
        })
        .catch((error) => {
          console.error("Error fetching goal data:", error);
        });
    }
  }, []);
  // 바깥쪽 누르면 모달창 사라지도록
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setClicked(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const moveToGoalEdit = () => {
    setMode("update");
    navigate("/goal");
  };
  const backHandler = () => {
    navigate("/main");
  };
  const deleteGoalHandler = () => {};

  return (
    <div className={styles.goalPhoto}>
      <img src={data.goalPhoto} alt="Goal Thumbnail" />
      <div className={styles.overlay}>
        {data.goalTitle && <div className={styles.title}>{data.goalTitle}</div>}
        {data.startDatetime && data.endDatetime && (
          <div className={styles.date}>
            {data.startDatetime} ~ {data.endDatetime}
          </div>
        )}
        <div>
          <img
            onClick={backHandler}
            src={backSvg}
            className={styles.backbutton}
            alt="back"
          />
          <img
            onClick={onClickHandler}
            src={threebutton}
            className={styles.threebutton}
            alt="button"
          />
          {clicked && (
            <div className={styles["dropdown-options"]} ref={dropdownRef}>
              <button className={styles["edit-btn"]} onClick={moveToGoalEdit}>
                수정
              </button>
              <button
                className={styles["delete-btn"]}
                onClick={deleteGoalHandler}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GoalPhoto;
