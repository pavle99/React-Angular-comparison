import React from "react";

interface IUserContext {
  user: string | null;
  setUser: (user: string | null) => void;
}

export const UserContext = React.createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<string | null>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
