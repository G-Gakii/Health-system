import { createContext, ReactNode, useContext, useState } from "react";

interface ProgramInterface {
  selectedProgram: string | null;
  setSelectedProgram: (program: string) => void;
}

// create context
const ProgramContext = createContext<ProgramInterface | undefined>(undefined);

// context provider
export const ProgramProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  return (
    <ProgramContext.Provider value={{ selectedProgram, setSelectedProgram }}>
      {children}
    </ProgramContext.Provider>
  );
};

// custom hook to use it
export const useProgramContext = () => {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error("useProgramContext must be used within a ClientProvider");
  }
  return context;
};
