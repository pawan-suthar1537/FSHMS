import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const context = createContext({ isauth: false });

const AppWrapper = () => {
  const [isauth, setisauth] = useState(false);
  const [user, setuser] = useState({});

  return (
    <context.Provider
      value={{
        isauth,
        setisauth,
        user,
        setuser,
      }}
    >
      <App />
    </context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
