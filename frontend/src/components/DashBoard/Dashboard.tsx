import { useEffect, useState } from "react";

import styles from "./DashBoard.module.css";
import ProgramInterface from "../../interfaces/ProgramInterface";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

import axiosInstance, {
  axiosNoInterceptors,
} from "../../services/ApiInterceptor";
import { EnrollmentInterface } from "../../interfaces/EnrollmentInterface";

const Dashboard = () => {
  const [programsTotal, setProgramTotal] = useState(0);
  const [totalClient, setTotalClient] = useState(0);
  const [recentErrollment, setRecentEnrollment] = useState(0);
  const navigate = useNavigate();

  const totalPrograms = async () => {
    try {
      const res: AxiosResponse<ProgramInterface[]> =
        await axiosNoInterceptors.get(`health/program/`);

      setProgramTotal(res.data.length);
      console.log(programsTotal);
    } catch (error) {
      console.log(error);
    }
  };
  const totalClientFn = async () => {
    try {
      const res = await axiosNoInterceptors.get(`health/client`);

      setTotalClient(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const recentEnrollment = async () => {
    try {
      let res = await axiosNoInterceptors.get("health/enroll");
      let enrollments: EnrollmentInterface[] = res.data;
      let count = 0;
      for (let enrollment of enrollments) {
        let currentDate = new Date();
        let originalDate = new Date(enrollment.enrollment_date);
        let modifiedDate = new Date(enrollment.enrollment_date);
        modifiedDate.setDate(originalDate.getDate() + 7);
        if (modifiedDate > currentDate) {
          count++;
        }
      }
      setRecentEnrollment(count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    totalPrograms();
    totalClientFn();
    recentEnrollment();
  }, []);
  return (
    <>
      <Navbar />
      <div className={`container ${styles.container}`}>
        <div className="card mb-5 p-3">
          <div className="card-body">
            <h1 className="card-title fs-3">Quick Actions</h1>

            <div className="d-flex gap-3">
              <button
                className={`btn p-3 fs-4 ${styles.containerBtn}`}
                onClick={() => {
                  navigate("/create_program");
                }}
              >
                Create New Program
              </button>
              <button
                onClick={() => {
                  navigate("/register_client");
                }}
                className="btn btn-light p-3 fs-4"
              >
                Register client
              </button>
            </div>
          </div>
        </div>
        <div className="card p-3">
          <div className="card-body">
            <h2 className="card-title fs-4">Overview</h2>
            <div className="d-flex justify-content-between">
              <div className="card p-3">
                <div className="card-body text-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    fill="currentColor"
                    className="bi bi-bar-chart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                  </svg>
                  <p className="fs-1"> {programsTotal} </p>
                  <p className="fs-4">Active Programs</p>
                </div>
              </div>
              <div className="card p-3">
                <div className="card-body text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                  <p className="fs-1"> {totalClient} </p>
                  <p className="fs-4">Registered clients</p>
                </div>
              </div>
              <div className="card p-3">
                <div className="card-body text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    fill="currentColor"
                    className="bi bi-graph-up-arrow"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"
                    />
                  </svg>
                  <p className="fs-1"> {recentErrollment}</p>
                  <p className="fs-4">Recent Enrollments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
