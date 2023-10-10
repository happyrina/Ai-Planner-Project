import styled from "styled-components";
import React from "react";
import defaultImage from "../assets/images/smiile.jpeg";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { goalIdState, modeState } from "../atoms";
import { useNavigate } from "react-router-dom";

function Goalitem({ goaltitle, goalperiod, event_id, photoUrl, isCompleted }) {
  const navigate = useNavigate();
  const [goalId, setGoalId] = useRecoilState(goalIdState);
  const [mode, setMode] = useRecoilState(modeState);
  const movetoDetailHandler = () => {
    setMode("update");
    setGoalId(event_id);
    navigate("/planlist", { state: { event_id } });
  };
  return (
    <GoalContainer onClick={movetoDetailHandler}>
      <Img
        src={photoUrl && photoUrl !== null ? photoUrl : defaultImage}
        alt="goal"
      ></Img>
      <div className="title">{goaltitle}</div>
      <div className="period">{goalperiod}</div>
    </GoalContainer>
  );
}

export default Goalitem;

const Img = styled.img`
  width: 150px;
  height: 146px;
  object-fit: cover;
  border-radius: 5px;
  background-color: transparent;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
const GoalContainer = styled(motion.div)`
  width: 187.5px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: center;
  margin: 12px 0px;
  padding: 0px 15px;
  div.title {
    width: 100%;
    margin: 2px 0;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    padding-left: 5px;
    padding-top: 3px;
  }
  div.period {
    width: 100%;
    padding-left: 5px;
    margin: 2px 0;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    color: #7e7e7e;
  }
  position: relative;
`;
