import React from "react";
import "../styles/style.css";


export default function Navbar({ setView }) {
  return (
    <nav className="navbar">
      <button onClick={() => setView("home")}>Home</button>
      <button onClick={() => setView("archive")}>Archive</button>
    </nav>
  );
}
