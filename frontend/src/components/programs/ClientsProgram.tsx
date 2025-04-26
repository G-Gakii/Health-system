import { useEffect, useState } from "react";
import { useProgramContext } from "../../context/ProgramContext";
import axios from "axios";
import BaseUrl from "../../services/ApiInterceptor";
import { ProgramsInterface } from "../../interfaces/ClientInterface";
import Navbar from "../Navbar/Navbar";
import styles from "./ClientProgram.module.css";
import axiosInstance from "../../services/ApiInterceptor";

const ClientsInProgram = () => {
  const { selectedProgram } = useProgramContext();
  const [clients, setClients] = useState<ProgramsInterface[]>([]);
  useEffect(() => {
    const fetchClientInProgram = async () => {
      try {
        const res = await axiosInstance.get(
          `health/enroll?search=${selectedProgram}`
        );
        console.log(res.data);

        setClients(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClientInProgram();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={`${styles.program__container}`}>
        <h1 className="text-center text-capitalize">
          {" "}
          {selectedProgram} Program{" "}
        </h1>
        <table className={`table  fs-5`}>
          <thead className="fs-4">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Enrollment date</th>
            </tr>
          </thead>
          <tbody>
            {clients.length < 1 ? (
              <tr>No client registered for the program</tr>
            ) : (
              clients.map((client) => (
                <tr>
                  <td className="text-capitalize">{client.client}</td>
                  <td>
                    {" "}
                    {new Date(client.enrollment_date).toLocaleDateString()}{" "}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsInProgram;
