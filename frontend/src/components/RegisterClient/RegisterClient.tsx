import { useNavigate } from "react-router-dom";
import styles from "./RegisterClient.module.css";
import React, { useState } from "react";
import RegisterInterface from "../../interfaces/RegisterInterface";
import axios from "axios";
import BaseUrl from "../../services/ApiInterceptor";
import Navbar from "../Navbar/Navbar";

const RegisterClient = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState<RegisterInterface>({
    client_id: "",
    fullName: "",
    age: 0,
    phone_number: "",
    gender: "",
  });
  const [formError, setFormError] = useState<RegisterInterface>({
    client_id: "",
    fullName: "",
    age: "",
    phone_number: "",
    gender: "",
  });
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setClient((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) || "" : value, // Ensure age is a number
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(client);
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }
    try {
      const res = await axios.post(`${BaseUrl}client/`, client);
      // after successful login navigate to homepage
      navigate("/");
    } catch (error: any) {
      console.log(error.response.data);

      if (error.response) {
        const { data } = error.response;
        setFormError((prevErrors) => ({
          ...prevErrors,
          client_id: data.client_id?.[0] || "",
          fullName: data.fullName?.[0] || "",
          age: data.age?.[0] || "",
          phone_number: data.phone_number?.[0] || "",
          gender: data.gender?.[0] || "",
        }));
      } else if (error.request) {
        alert(" Check your network connection.");
      } else {
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  // validate input and select field for the form
  const validate = (client: RegisterInterface) => {
    let errors: any = {};
    if (!client.client_id) {
      errors.client_id = "Client Id required";
    }
    if (!client.fullName) {
      errors.fullName = "Full name required";
    }
    if (!client.age) {
      errors.age = "Age required";
    }
    if (!client.gender) {
      errors.gender = "Gender required";
    }
    if (!client.phone_number) {
      errors.phone_number = "phone number required";
    }
    return errors;
  };
  // remove error when user focus on input field
  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormError((prev) => {
      let updatedError: any = { ...prev };
      delete updatedError[name];
      return updatedError;
    });
  };
  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className={`${styles.form}`}>
        <h1 className="text-capitalize text-center">Register new client</h1>
        <div className="mb-3 fs-4">
          <label htmlFor="client_id" className="form-label ">
            Client ID
          </label>
          <input
            type="text"
            className="form-control p-3"
            id="client_id"
            name="client_id"
            placeholder="e.g Jane Doe"
            value={client.client_id}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {formError.client_id && (
            <span className={`${styles.errorMsg}`}>{formError.client_id}</span>
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
            value={client.fullName}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {formError.fullName && (
            <span className={`${styles.errorMsg}`}>{formError.fullName}</span>
          )}
        </div>
        <div className="mb-3 fs-5">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control p-3"
            id="age"
            name="age"
            placeholder="e.g 30"
            value={client.age}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {formError.age && (
            <span className={`${styles.errorMsg}`}>{formError.age}</span>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="phone_number"
            className="form-label fs-5 text-capitalize"
          >
            phone number
          </label>
          <input
            type="text"
            className="form-control p-3"
            id="phone_number"
            name="phone_number"
            placeholder="e.g +291111111111"
            value={client.phone_number}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {formError.phone_number && (
            <span className={`${styles.errorMsg}`}>
              {" "}
              {formError.phone_number}{" "}
            </span>
          )}
        </div>
        <label htmlFor="gender" className="form-label fs-5">
          Gender
        </label>
        <select
          className="form-select p-3"
          aria-label="Default select "
          onChange={handleChange}
          name="gender"
          value={client.gender}
          onFocus={handleFocus}
        >
          <option value="" disabled>
            Select gender
          </option>
          <option value="F">Female</option>
          <option value="M">Male</option>
          <option value="O">others</option>
        </select>
        {formError.gender && (
          <span className={`${styles.errorMsg}`}>{formError.gender}</span>
        )}
        <div className="py-5 d-flex gap-5">
          <button
            type="submit"
            className={`btn fs-5 p-3 ${styles.containerBtn}`}
          >
            Register Client
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
      </form>
    </>
  );
};

export default RegisterClient;
