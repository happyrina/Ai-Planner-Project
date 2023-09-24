import { RecoilRoot } from "recoil";
import Router from "./Router";
import "./css/App.css";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ProfileProvider } from "./context/ProfileContext";
function App() {
  return (
  <>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ProfileProvider>
        <RecoilRoot>
          <Router />
        </RecoilRoot>
      </ProfileProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
