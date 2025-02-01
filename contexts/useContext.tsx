import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axiosRequest from "@/hooks/useAxios";
import { configUrl } from "@/config/configUrl";

type AppContextType = {
  lastUrl: string;
  setLastUrl: (url: string) => void;
  roles: Role[];
  fetchRoles: () => void;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

type User = {
  id: string;
  role: string;
  user_name: string;
};

type Role = {
  id: string;
  role_name: string;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [lastUrl, setLastUrl] = useState("/");
  const [roles, setRoles] = useState<Role[]>([]);
  const [user, setUser] = useState<User>({ id: "", role: "", user_name: "" });

  const fetchRoles = async () => {
    const { response, error } = await axiosRequest({
      url: `${configUrl.apiUrlUserService}/auth/get-roles`,
      method: "GET",
    });

    if (response) {
      setRoles(response.data);
    } else {
      console.error("Failed to fetch roles:", error?.message);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <AppContext.Provider
      value={{ lastUrl, setLastUrl, roles, fetchRoles, user, setUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
