import "./App.css";
import { ApplicationState } from "./components/context";
import Homepage from "./pages/Homepage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ApplicationState>
        <ToastContainer />
        <Homepage />
      </ApplicationState>
    </>
  );
}

export default App;
