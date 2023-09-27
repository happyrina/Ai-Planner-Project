import { Link, useNavigate } from "react-router-dom";
import Selectop from "../components/Select";
import axios from "axios";
import styles from "../css/FormStyle.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { goalState, modeState, selectedGoalState } from "../atoms";
import { useState } from "react";

function Todo() {
  const selectedgoal = useRecoilValue(selectedGoalState);
  const [mode, setMode] = useRecoilState(modeState);
  const todoinfo = {
    title: "",
    location: "",
    goal: "",
    content: "",
    isCompleted: false,
  };
  const navigate = useNavigate();
  console.log(selectedgoal);

  const handleGoBack = () => {
    navigate("/main"); // 뒤로 가기
  };
  const [todo, setTodo] = useState(todoinfo);

  const SendTodo = async (data) => {
    try {
      console.log(data);
      const tokenstring = document.cookie;
      const token = tokenstring.split("=")[1];
      await axios({
        method: "post",
        url: "http://3.39.153.9:3000/todo/create",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
        data: {
          title: data.title,
          isCompleted: data.isCompleted,
          goal: selectedgoal,
          location: data.location,
          content: data.content,
        },
        withCredentials: false,
      }).then((response) => {
        if (response.status === 200) {
          alert("성공");
          setMode(null);
        }
      });
    } catch (error) {
      console.error("An error occurred while updating profile:", error);
    }
  };
  const TitleHandler = (e) => {
    setTodo({ ...todo, title: e.target.value });
  };
  const LocationHandler = (e) => {
    setTodo({ ...todo, location: e.target.value });
  };
  const ContentHandler = (e) => {
    setTodo({ ...todo, content: e.target.value });
  };
  const IsCompletedHandler = (e) => {
    setTodo({ ...todo, isCompleted: e.target.checked });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      SendTodo(todo).then(navigate("/home"));

      console.log(selectedgoal);
    } catch (error) {
      console.error("SendTodo 함수 호출 중 에러 발생:", error);
    }
  };
  return (
    <div className={styles.Container}>
      <form onSubmit={onSubmit}>
        <div className={styles.Navbar}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <svg
              onClick={handleGoBack}
              className={styles.leftbutton}
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 320 512"
              style={{ fill: "black" }}
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
          </div>
          <button className={styles.Btn}>
            <Link to="/goal">목표</Link>
          </button>
          <button className={styles.Btn}>
            <Link to="/plan">일정</Link>
          </button>
          <button className={styles.selected}>
            <Link to="/todo">할일</Link>
          </button>

          <div></div>
          <button className={styles.Btn} type="submit">
            저장
          </button>
        </div>
        <div className={styles.Tag}>제목</div>
        <div className={styles.Tag}>
          <input
            required
            maxLength={20}
            value={todo.title}
            onChange={TitleHandler}
            className={styles.Input}
          ></input>
        </div>
        <span></span>
        <div className={styles.Tag}>목표</div>
        <div className={styles.Tag}>
          <Selectop />
        </div>
        <div className={styles.Tag}>내용</div>
        <div className={styles.Tag}>
          <textarea
            style={{ height: "90px" }}
            value={todo.content}
            onChange={ContentHandler}
            className={styles.Input}
          ></textarea>
        </div>
        <div className={styles.Tag}>장소</div>
        <div className={styles.Tag}>
          <input
            maxLength={20}
            value={todo.location}
            onChange={LocationHandler}
            className={styles.Input}
          ></input>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.Tag}>완료</div>
          <div className={styles.Tag}>
            <input
              className={styles.check}
              value={todo.isCompleted}
              onChange={IsCompletedHandler}
              type="checkbox"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Todo;
