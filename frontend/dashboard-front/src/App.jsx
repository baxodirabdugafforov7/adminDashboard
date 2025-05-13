import React from "react";
import Dashboard from "./components/Dashboard";
import ChartComponent from "./components/ChartComponent";
import HorizontalBarChart from "./components/HorizontalBarChart";
import "./styles/styles.css";
import SalesChart from "./components/SalesChart";

function App() {
  return (
    <div className="App">
      <Dashboard />
      <div className="charts">
          <ChartComponent />
          <HorizontalBarChart />
      </div>
    </div>
  );
}

export default App;
