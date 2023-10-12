import UserPhoto from "../components/UserPhoto";
import Summary from "../components/Summary";
import CalendarThumnail from "../components/CalendarThumbnail";
import styles from "../styles/UserInfo.module.css";
import styled from "styled-components";

function UserInfo() {
  return (
    <Background>
      <BigContainer>
        <div>
          <div className={styles.UserPhotoContainer}>
            <UserPhoto />
          </div>
          <div className={styles.UserSummaryContainer}>
            <Summary />
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              marginTop: "40px",
              marginLeft: "25px",
            }}
          >
            🔥지금 진행중인 목표🔥
          </div>
          <div className={styles.CalendarThumnailContainer}>
            <CalendarThumnail />
          </div>
          {/* <div>{추후목표}</div> */}
        </div>
      </BigContainer>
    </Background>
  );
}
const BigContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

const Background = styled.div`
  width: 375px;
  margin: 0px auto;
  height: 100vh;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.05);
`;

export default UserInfo;
