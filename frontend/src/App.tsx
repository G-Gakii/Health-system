import Dashboard from "./components/DashBoard/Dashboard";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProgram from "./components/AddProgram/AddProgram";
import RegisterClient from "./components/RegisterClient/RegisterClient";
import EnrollClient from "./components/EnrollClient/EnrollClient";
import RegisteredClient from "./components/RegisteredClients/RegisteredClient";
import { ClientProvider } from "./context/ClientContext";
import ClientProfile from "./components/clientProfile/ClientProfile";
import Programs from "./components/programs/Programs";
import { ProgramProvider } from "./context/ProgramContext";
import ClientsInProgram from "./components/programs/ClientsProgram";
import RegisterUser from "./components/auth/RegisterUser/RegisterUser";
import Login from "./components/auth/Login/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register_doctor" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create_program" element={<AddProgram />} />
        <Route path="/register_client" element={<RegisterClient />} />
        <Route path="/enroll_program" element={<EnrollClient />} />
        <Route
          path="/programs"
          element={
            <ProgramProvider>
              <Programs />
            </ProgramProvider>
          }
        />
        <Route
          path="/programs_clients"
          element={
            <ProgramProvider>
              <ClientsInProgram />
            </ProgramProvider>
          }
        />
        <Route
          path="/registered_client"
          element={
            <ClientProvider>
              <RegisteredClient />
            </ClientProvider>
          }
        />
        <Route
          path="/client"
          element={
            <ClientProvider>
              <ClientProfile />
            </ClientProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
