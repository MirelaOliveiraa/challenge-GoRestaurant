import React from "react";
import "./style/global.scss";
import Home from "./pages/Home";

import Modal from "react-modal";

Modal.setAppElement("#root");

const App = () => {
  return (
    <section>
      <Home />
    </section>
  );
};

export default App;
