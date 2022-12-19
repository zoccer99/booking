import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { Navigation } from "./components/ui/Navigation";
import { About } from "./components/ui/Pages/About";
import { Contact } from "./components/ui/Pages/Contact";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ExtendedEvent } from "./components/ui/Blog/ExtendedEvent";
import { Cart } from "./components/ui/user/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events/:id" element={<ExtendedEvent />} />
        <Route path="/myTickets" element={<Cart />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
