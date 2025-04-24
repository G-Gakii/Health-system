import Dashboard from "./components/DashBoard/Dashboard";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProgram from "./components/AddProgram/AddProgram";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create_program" element={<AddProgram />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
