import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App/App.jsx";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();