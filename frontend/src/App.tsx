import Dashboard from "./components/DashBoard/Dashboard";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProgram from "./components/AddProgram/AddProgram";
import RegisterClient from "./components/RegisterClient/RegisterClient";
import EnrollClient from "./components/EnrollClient/EnrollClient";
import RegisteredClient from "./components/RegisteredClients/RegisteredClient";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create_program" element={<AddProgram />} />
        <Route path="/register_client" element={<RegisterClient />} />
        <Route path="/enroll_program" element={<EnrollClient />} />
        <Route path="/registered_client" element={<RegisteredClient />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
