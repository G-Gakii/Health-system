import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnrollInterface } from "../../interfaces/RegisterInterface";

import styles from "./EnrollClient.module.css";
import Navbar from "../Navbar/Navbar";

import axiosInstance from "../../services/ApiInterceptor";

const EnrollClient = () => {
  const navigate = useNavigate();
  const [program, setProgram] = useState({
    program_name: "",
    client_id: "",
  });
  const [allPrograms, SetallPrograms] = useState<string[]>([]);
  const [formError, SetFormErrors] = useState<EnrollInterface>({
    program_name: "",
    client_id: "",
  });

  // get all available programs
  useEffect(() => {
    const fetchAllPrograms = async () => {
      try {
        const response: any = await axiosInstance.get(`health/program/`);
        console.log("res", response);

        const programs: string[] = [];
        for (let res of response.data) {
          programs.push(res.name);
        }
        SetallPrograms(programs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPrograms();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      const res = await axiosInstance.post(`health/enroll/`, program);
      navigate("/");
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
        } else if (data.non_field_errors) {
          alert(data.non_field_errors);
          navigate("/");
        }
      } else if (error.request) {
        alert("Check your network connection.");
      } else {
        alert("Something went wrong try again");
      }
    }
  };

  // remove error when user focus on input field
  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    SetFormErrors((prev) => {
      let updatedError: any = { ...prev };
      delete updatedError[name];
      return updatedError;
    });
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
        <h1 className="text-capitalize text-center mb-5">
          Enroll client for a program
        </h1>
        <div className="mb-3 fs-5">
          <label htmlFor="client_id" className="form-label">
            Client ID
          </label>
          <input
            type="text"
            className="form-control p-3 fs-5"
            id="client_id"
            name="client_id"
            placeholder="e.g 123456"
            value={program.client_id}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {formError.client_id && (
            <span className={`${styles.errorMsg}`}>{formError.client_id}</span>
          )}
        </div>
        <div className="mb-3 fs-5">
          <label htmlFor="programName" className="form-label">
            Program Name
          </label>
          <select
            className="form-select p-3 fs-5 text-capitalize"
            aria-label="program name"
            id="programName"
            name="program_name"
            value={program.program_name}
            onChange={handleChange}
            onFocus={handleFocus}
          >
            <option selected>Select program</option>
            {allPrograms.map((program, index) => (
              <option key={index} value={program}>
                {" "}
                {program}{" "}
              </option>
            ))}
          </select>

          {formError.program_name && (
            <span className={`${styles.errorMsg}`}>
              {" "}
              {formError.program_name}{" "}
            </span>
          )}
        </div>
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-between my-5">
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
    </>
  );
};

export default EnrollClient;
