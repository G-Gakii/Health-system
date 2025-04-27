import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import { DoctorInterface } from "../../../interfaces/DoctorInterface";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterUser.module.css";

import axiosInstance, {
  axiosNoInterceptors,
} from "../../../services/ApiInterceptor";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<DoctorInterface>({
    fullName: "",
    email: "",
    password: "",
    confirm_password: "",
    doctor_id: "",
  });
  const [formError, setFormError] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm_password: "",
    doctor_id: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(doctor);
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }
    try {
      const res = await axiosNoInterceptors.post(`user/register/`, doctor);
      console.log(res);
      navigate("/login");
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        const { data } = error.response;

        setFormError((prev) => ({
          ...prev,
          doctor_id: data.doctor_id?.[0] || "",
          fullName: data.fullName?.[0] || "",
          email: data.email?.[0] || "",
          password: data.password?.[0] || "",
          confirm_password: data.confirm_password?.[0] || "",
        }));
      } else if (error.request) {
        alert("Kindly check you internet connection");
      } else {
        alert("Something went wrong try again later");
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  // remove error on focus of input field
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFormError((prev) => {
      let updatedErrors: any = { ...prev };
      delete updatedErrors[name];
      return updatedErrors;
    });
  };

  // validate form input fields
  const validate = (doctor: DoctorInterface) => {
    const errors: any = {};
    if (!doctor.doctor_id) {
      errors.doctor_id = "Doctor id required";
    }
    if (!doctor.email) {
      errors.email = "Email required";
    }
    if (!doctor.fullName) {
      errors.fullName = "Full name required";
    }
    if (!doctor.password) {
      errors.password = "Password required";
    }
    if (!doctor.confirm_password) {
      errors.confirm_password = "Confirm password required";
    }
    if (doctor.password !== doctor.confirm_password) {
      errors.confirm_password = "Confirm password should match password";
    }
    return errors;
  };
  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className={`${styles.form}`}>
        <h1 className="text-capitalize text-center">Register </h1>
        <div className="mb-3 fs-4">
          <label htmlFor="doctor_id" className="form-label ">
            Doctor ID
          </label>
          <input
            type="text"
            className="form-control p-3"
            id="doctor_id"
            name="doctor_id"
            placeholder="e.g 345678"
            value={doctor.doctor_id}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {formError.doctor_id && (
            <span className={`${styles.errorMsg}`}>{formError.doctor_id}</span>
          )}
        </div>
        <div className="mb-3 fs-5">
          <label htmlFor="fullname" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control p-3"
            id="fullname"
            name="fullName"
            placeholder="e.g Jane Doe"
            value={doctor.fullName}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {formError.fullName && (
            <span className={`${styles.errorMsg}`}>{formError.fullName}</span>
          )}
        </div>
        <div className="mb-3 fs-5">
          <label htmlFor="age" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control p-3"
            id="email"
            name="email"
            placeholder="e.g jane@example.com"
            value={doctor.email}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {formError.email && (
            <span className={`${styles.errorMsg}`}>{formError.email}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label fs-5 text-capitalize">
            Password
          </label>
          <input
            type="password"
            className="form-control p-3"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={doctor.password}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {formError.password && (
            <span className={`${styles.errorMsg}`}> {formError.password} </span>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="confirm_password"
            className="form-label fs-5 text-capitalize"
          >
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control p-3"
            id="pconfirm_password"
            name="confirm_password"
            placeholder="Enter your password"
            value={doctor.confirm_password}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {formError.confirm_password && (
            <span className={`${styles.errorMsg}`}>
              {" "}
              {formError.confirm_password}{" "}
            </span>
          )}
        </div>
        <div className="py-5 d-flex gap-5">
          <button
            type="submit"
            className={`btn fs-5 p-3 ${styles.containerBtn}`}
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/");
            }}
            className={`btn btn-light fs-4 p-3 ${styles.lightBtn}`}
          >
            Cancel
          </button>
        </div>
        <div className="text-center fs-5">
          <p className="">
            Already have an account?
            <a className="text-primary" href="/login">
              Login
            </a>
          </p>
        </div>
      </form>
    </>
  );
};

export default RegisterUser;
