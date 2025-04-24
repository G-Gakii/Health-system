import axios from "axios";
import { useEffect, useState } from "react";
import BaseUrl from "../../services/ApiInterceptor";
import ClientInterface from "../../interfaces/ClientInterface";

const RegisteredClient = () => {
  const [clients, setClients] = useState<ClientInterface[]>([]);
  const [searchValue, setSearchValue] = useState("");

  // get all clients
  const listClients = async () => {
    try {
      const res = await axios.get(`${BaseUrl}client`);
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
      const res = await axios.get(`${BaseUrl}client?search=${value}`);
      console.log(res);
      setClients(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="d-flex" role="search">
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
      <h1 className="text-center py-3">Registered Clients</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Client ID</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.client_id}>
              <th scope="row"> {client.client_id} </th>
              <td> {client.fullName} </td>
              <td> {client.age} </td>
              <td>
                <button className="btn btn-light p-3 fs-5">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RegisteredClient;
