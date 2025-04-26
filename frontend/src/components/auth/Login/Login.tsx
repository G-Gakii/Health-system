import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import { DoctorInterface } from "../../../interfaces/DoctorInterface";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";
import baseUrl from "../../../services/ApiInterceptor";
import axiosInstance from "../../../services/ApiInterceptor";

const Login = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<DoctorInterface>({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(doctor);
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }
    try {
      console.log("start");

      const res = await axiosInstance.post(`user/login/`, doctor);
      console.log("start2");
      if (res.status === 200) {
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);

        navigate("/");
      } else {
        console.log("Login unsuccessful", res);
        alert("Invalid login credentials");
      }

      navigate("/");
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        const { data } = error.response;

        setFormError((prev) => ({
          ...prev,

          email: data.email?.[0] || "",
          password: data.password?.[0] || "",
        }));
        if (data.detail) {
          alert(data.detail);
        }
      } else if (error.request) {
        alert("Kindly check you internet connection");
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

    if (!doctor.email) {
      errors.email = "Email required";
    }

    if (!doctor.password) {
      errors.password = "Password required";
    }

    return errors;
  };
  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className={`${styles.form}`}>
        <h1 className="text-capitalize text-center">Sign In </h1>

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

        <div className="py-5 d-flex gap-5">
          <button
            type="submit"
            className={`btn fs-5 p-3 ${styles.containerBtn}`}
          >
            Login
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
            Dont have an account?
            <a className="text-primary" href="/register_doctor">
              Register
            </a>
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
