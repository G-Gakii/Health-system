import { useNavigate } from "react-router-dom";
import styles from "./AddProgram.module.css";
import React, { useState } from "react";
import axios from "axios";
import BaseUrl from "../../services/ApiInterceptor";

const AddProgram = () => {
  type formErrorType = {
    name?: string;
  };
  const navigate = useNavigate();
  const [program, setProgram] = useState({ name: "", description: "" });
  const [formErrors, SetFormErrors] = useState<formErrorType>({});

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
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
      const res = await axios.post(`${BaseUrl}program/`, program);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const validate = (program: any) => {
    const errors = { name: "" };
    if (!program.name) {
      errors.name = "Program name required";
    }
    return errors;
  };
  return (
    <form className="" onSubmit={handleSubmit}>
      <h1 className="fs-1 text-capitalize">Create new program</h1>
      <div className="mb-3">
        <label htmlFor="programName" className="form-label">
          Program Name
        </label>
        <input
          type="text"
          className="form-control p-3"
          id="programName"
          placeholder="e.g TB"
          name="name"
          value={program.name}
          onChange={handleChange}
          onFocus={() => {
            SetFormErrors((prev) => {
              let updattedErrors = { ...prev };
              delete updattedErrors.name;
              return updattedErrors;
            });
          }}
        />
        {formErrors.name && (
          <span className={`${styles.errormsg}`}> {formErrors.name} </span>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="desscription"
          rows={3}
          name="description"
          onChange={handleChange}
          value={program.description}
        ></textarea>
        <p>(Optional)</p>
      </div>
      <div className="d-flex flex-column flex-sm-row gap-3 justify-content-between">
        <button type="submit" className={`btn fs-5 p-3 ${styles.containerBtn}`}>
          Save Program
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
  );
};

export default AddProgram;
