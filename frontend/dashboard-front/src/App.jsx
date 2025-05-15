// App.jsx
import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import ChartComponent from "./components/ChartComponent";
import HorizontalBarChart from "./components/HorizontalBarChart";
import SalesChart from "./components/SalesChart";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./styles/styles.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleSignupSuccess = () => setShowSignup(false);
  const handleLogout = () => setIsLoggedIn(false); // <-- Just change state, don't remove token

  if (!isLoggedIn) {
    return (
      <div className="auth-wrapper">
        {showSignup ? (
          <>
            <Signup onSignupSuccess={handleSignupSuccess} />
            <p>Already have an account? <button onClick={() => setShowSignup(false)}>Login</button></p>
          </>
        ) : (
          <>
            <Login onLoginSuccess={handleLoginSuccess} />
            <p>Don't have an account? <button onClick={() => setShowSignup(true)}>Sign Up</button></p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <Dashboard onLogout={handleLogout} />
      <div className="charts">
        <ChartComponent />
        <HorizontalBarChart />
      </div>
    </div>
  );
}

export default App;
