import { useClientContext } from "../../context/ClientContext";

const ClientProfile = () => {
  const { selectedClientId } = useClientContext();
  console.log(selectedClientId);

  return <div></div>;
};

export default ClientProfile;
