import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/LoginPage/LoginPage";
import HomePage from "./Components/HomePage/HomePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route Component={LoginPage} path="/" />
          <Route Component={HomePage} path="/Home" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
