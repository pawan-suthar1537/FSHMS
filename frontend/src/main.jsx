import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const Context = createContext({ isauth: false });

const AppWrapper = () => {
  const [user, setuser] = useState({});
  const [isauth, setisauth] = useState(false);
  const [admin, setadmin] = useState({});
  const [adminauth, setadminauth] = useState(false);

  return (
    <Context.Provider
      value={{
        isauth,
        setisauth,
        user,
        setuser,
        admin,
        setadmin,
        adminauth,
        setadminauth,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
