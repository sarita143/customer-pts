import { useContext } from "react";
import { DataContext } from "./DataContextDefinition";

export const useDataContext = () => {
  const context = useContext(DataContext);

  return context;
};
