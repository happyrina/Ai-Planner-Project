import { RecoilRoot } from "recoil";

import Router from "./Router";
import "./css/App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ProfileProvider } from "./context/ProfileContext";
import React from "react";
import { Provider } from "react-redux";
import store from "./Chat/store";

function App() {
  return (
    <>
      {" "}
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ProfileProvider>
            <RecoilRoot>
              <Router />
            </RecoilRoot>
          </ProfileProvider>
        </LocalizationProvider>
      </Provider>
    </>
  );
}

export default App;
