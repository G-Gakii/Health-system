import { createContext, ReactNode, useContext, useState } from "react";

interface ClientContextInterface {
  selectedClientId: string | null;
  setSelectedClientId: (id: string) => void;
}

const clientContext = createContext<ClientContextInterface | undefined>(
  undefined
);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  return (
    <clientContext.Provider value={{ selectedClientId, setSelectedClientId }}>
      {children}
    </clientContext.Provider>
  );
};

// Custom hook to use context
export const useClientContext = () => {
  const context = useContext(clientContext);
  if (!context) {
    throw new Error("useClientContext must be used within a ClientProvider");
  }
  return context;
};
