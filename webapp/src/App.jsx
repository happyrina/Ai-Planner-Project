import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./Router";
import "./css/App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ProfileProvider } from "./context/ProfileContext";
import React from "react";
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      {" "}
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ProfileProvider>
            <RecoilRoot>
              <Router />
            </RecoilRoot>
          </ProfileProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
