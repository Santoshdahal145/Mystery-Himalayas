"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type UserRoleType = "ADMIN" | "USER";

export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRoleType;
  avatar: string;
  id: string;
}

interface AuthContextType {
  user: UserType | null;
  loading: boolean;
  onLogin: (user: UserType) => void;
  onLogout: () => void;
  setUserToLocalAndState: (user: UserType) => void;
  updateUserField: <K extends keyof UserType>(
    field: K,
    value: UserType[K]
  ) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const onLogin = (newUser: UserType) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const setUserToLocalAndState = async (user: UserType) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const onLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateUserField = <K extends keyof UserType>(
    field: K,
    value: UserType[K]
  ) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;

      const updatedUser = { ...prevUser, [field]: value };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        onLogin,
        onLogout,
        loading,
        setUserToLocalAndState,
        updateUserField,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  // Handle server-side rendering gracefully
  if (typeof window === "undefined") {
    return {
      user: null,
      loading: true,
      onLogin: () => {},
      onLogout: () => {},
      setUserToLocalAndState: async () => {},
      updateUserField: () => {},
    } as AuthContextType;
  }
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
