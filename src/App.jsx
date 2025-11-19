import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { initializeDummyData } from "./utils/helpers";

const App = () => {
  useEffect(() => {
    console.log = () => {};
    initializeDummyData();
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AppRoutes />
    </>
  );
};

export default App;

App.propTypes = {};
