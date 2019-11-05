import React from "react";
import Header from "./partials/Header";

const App = props => {
  return (
    <div className="container-fluid">
      <Header />
      {props.children}
    </div>
  );
};

export default App;
