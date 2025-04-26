import { useEffect, useState } from "react";
import ClientInterface from "../../interfaces/ClientInterface";
import Navbar from "../Navbar/Navbar";
import { useClientContext } from "../../context/ClientContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/ApiInterceptor";
import styles from "./RegisteredClient.module.css";

const RegisteredClient = () => {
  const [clients, setClients] = useState<ClientInterface[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const { setSelectedClientId } = useClientContext();
  const navigate = useNavigate();

  // get all clients
  const listClients = async () => {
    try {
      const res = await axiosInstance.get(`health/client/`);
      console.log(res.data);
      setClients(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listClients();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    try {
      const res = await axiosInstance.get(`health/client?search=${value}`);
      console.log(res);
      setClients(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div className="d-flex justify-content-between align-items-center">
          <form className="d-flex " style={{ width: "80%" }} role="search">
            <input
              className="form-control me-2 p-3"
              type="search"
              placeholder="Search by client id or name"
              name="searchValue"
              value={searchValue}
              aria-label="Search"
              onChange={handleChange}
            />
          </form>
          <a
            className={`btn  p-2 px-3 ${styles.button}`}
            href="register_client"
          >
            Register Client
          </a>
        </div>

        <h1 className="text-center py-3">Registered Clients</h1>
        <table className="table m-5 ">
          <thead className="fs-4">
            <tr>
              <th scope="col">Client ID</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Registered_on</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="fs-5">
            {clients.length < 1 ? (
              <tr>No client registered yet</tr>
            ) : (
              clients.map((client) => (
                <tr key={client.client_id}>
                  <th scope="row"> {client.client_id} </th>
                  <td> {client.fullName} </td>
                  <td> {client.age} </td>
                  <td>
                    {" "}
                    {new Date(
                      client.registration_date
                    ).toLocaleDateString()}{" "}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedClientId(client.client_id);
                        navigate("/client");
                      }}
                      className="btn btn-light p-3 fs-5 px-5"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RegisteredClient;
