import { useEffect, useState } from "react";
import { useClientContext } from "../../context/ClientContext";
import BaseUrl from "../../services/ApiInterceptor";
import axios from "axios";
import ClientInterface from "../../interfaces/ClientInterface";
import Navbar from "../Navbar/Navbar";

const ClientProfile = () => {
  const { selectedClientId } = useClientContext();
  const [client, setClient] = useState<ClientInterface>({
    age: 0,
    client_id: "",
    fullName: "",
    gender: "",
    phone_number: "",
    programs: [
      {
        id: "",
        enrollment_date: "",
        program: "",
      },
    ],
    registration_date: "",
    updated_at: "",
  });

  useEffect(() => {
    async function fetchClient() {
      try {
        const res = await axios.get(`${BaseUrl}client/${selectedClientId}`);
        setClient(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchClient();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="fs-5" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1>Client Profile</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title fs-4">Client Information</h5>

            <p className="card-text">Name : {client.fullName}</p>
            <p className="card-text">Client ID : {client.client_id}</p>
            <p className="card-text">Age : {client.age}</p>
            <p className="card-text">Gender : {client.gender}</p>
            <p className="card-text">Phone Number : {client.phone_number}</p>
          </div>
        </div>
        <h2 className="py-3 text-capitalize">Programs Enrolled in</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Program Name</th>
              <th scope="col">Enrollment Date</th>
            </tr>
          </thead>
          <tbody>
            {client.programs.length === 0 ? (
              <tr>
                <td colSpan={2}>
                  <p>No program enrolled yet</p>
                </td>
              </tr>
            ) : (
              client.programs.map((program) => (
                <tr key={program.id}>
                  <td className="text-uppercase"> {program.program} </td>
                  <td>
                    {" "}
                    {new Date(program.enrollment_date).toLocaleDateString(
                      "en-GB"
                    )}{" "}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientProfile;
