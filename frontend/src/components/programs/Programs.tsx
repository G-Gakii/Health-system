import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";

import { AxiosResponse } from "axios";
import { axiosNoInterceptors } from "../../services/ApiInterceptor";
import ProgramInterface from "../../interfaces/ProgramInterface";
import styles from "./Program.module.css";
import { useProgramContext } from "../../context/ProgramContext";
import { useNavigate } from "react-router-dom";

const Programs = () => {
  const [programs, setPrograms] = useState<ProgramInterface[]>([]);
  const { setSelectedProgram } = useProgramContext();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchPrograms() {
      try {
        const res: AxiosResponse<ProgramInterface[]> =
          await axiosNoInterceptors.get(`health/program/`);
        setPrograms(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPrograms();
  });
  return (
    <div className="">
      <Navbar />
      <a className={`${styles.div__anchor} m-5`} href="/create_program">
        Create Program
      </a>
      <table className="table m-5">
        <thead>
          <tr className="fs-3">
            <th scope="col">Program Name</th>
            <th scope="col">Description</th>
            <th scope="col">Added on</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className="fs-5 text-capitalize">
          {programs.length < 1 ? (
            <tr>No registered Program</tr>
          ) : (
            programs.map((program) => (
              <tr key={program.id}>
                <td> {program.name}</td>
                <td>
                  {!program.description ? (
                    <span className="text-primary">No description</span>
                  ) : (
                    program.description
                  )}
                </td>
                <td> {new Date(program.created_at).toLocaleDateString()}</td>
                <td>
                  {" "}
                  <button
                    className={` text-capitalize fs-5 ${styles.table__button}`}
                    onClick={() => {
                      setSelectedProgram(program.name);
                      navigate("/programs_clients");
                    }}
                  >
                    {" "}
                    See Enrolled Clients
                  </button>{" "}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Programs;
