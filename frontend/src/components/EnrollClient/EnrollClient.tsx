import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnrollInterface } from "../../interfaces/RegisterInterface";
import axios from "axios";
import BaseUrl from "../../services/ApiInterceptor";
import styles from "./EnrollClient.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const EnrollClient = () => {
  const navigate = useNavigate();
  const [program, setProgram] = useState({
    program_name: "",
    client_id: "",
  });
  const [formError, SetFormErrors] = useState<EnrollInterface>({
    program_name: "",
    client_id: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProgram((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(program);
    if (Object.keys(errors).length > 0) {
      SetFormErrors(errors);
      return;
    }
    try {
      const res = await axios.post(`${BaseUrl}enroll/`, program);
      console.log(res);
    } catch (error: any) {
      console.log(error);

      if (error.response) {
        const { data } = error.response;
        if (data.program_name || data.client_id) {
          SetFormErrors((prev) => ({
            ...prev,
            program_name: data.program_name,
            client_id: data.client_id,
          }));
        }
      } else if (error.request) {
        alert("Check your network connection.");
      } else {
        alert("Something went wrong try again");
      }
    }
  };
  const validate = (program: EnrollInterface) => {
    const errors: any = {};
    if (!program.program_name) {
      errors.program_name = "Program name required";
    }
    if (!program.client_id) {
      errors.client_id = "Client Id required";
    }
    return errors;
  };
  return (
    <>
      <Navbar />
      <form className="" onSubmit={handleSubmit}>
        <h1 className="text-capitalize text-center">Enroll client</h1>
        <div className="mb-3">
          <label htmlFor="client_id" className="form-label">
            Client ID
          </label>
          <input
            type="text"
            className="form-control p-3"
            id="client_id"
            name="client_id"
            placeholder="e.g 123456"
            value={program.client_id}
            onChange={handleChange}
          />
          {formError.client_id && (
            <span className={`${styles.errorMsg}`}>{formError.client_id}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="programName" className="form-label">
            Program Name
          </label>
          <input
            type="text"
            className="form-control p-3"
            id="programName"
            placeholder="e.g TB"
            name="program_name"
            value={program.program_name}
            onChange={handleChange}
          />
          {formError.program_name && (
            <span className={`${styles.errorMsg}`}>
              {" "}
              {formError.program_name}{" "}
            </span>
          )}
        </div>
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-between">
          <button
            type="submit"
            className={`btn fs-5 p-3 ${styles.containerBtn}`}
          >
            Enroll Client
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
            className={`btn btn-light fs-4 p-3 ${styles.lightBtn}`}
          >
            Cancel
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default EnrollClient;
