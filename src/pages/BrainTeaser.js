import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useEffect } from "react";
import { AuthProvider } from "../context/AuthContext";

import Login from "./Login";
import AuthLanding from "./AuthLanding";
import MapView from "./MapView";
import EarthView from "./EarthView";
import PrivateRoute from "../routes/PrivateRoute";
import Dashboard from "./Dashboard";
import MazePuzzle from "./MazePuzzle";
import BrainTeaser from "./BrainTeaser";
import CaptureKingdom from "./CaptureKingdom";

function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/map"
            element={
              <PrivateRoute>
                <MapView />
              </PrivateRoute>
            }
          />

          <Route
            path="/earth"
            element={
              <PrivateRoute>
                <EarthView />
              </PrivateRoute>
            }
          />

          <Route
            path="/maze"
            element={
              <PrivateRoute>
                <MazePuzzle />
              </PrivateRoute>
            }
          />

          <Route
            path="/teaser"
            element={
              <PrivateRoute>
                <BrainTeaser />
              </PrivateRoute>
            }
          />

          <Route
            path="/capture"
            element={
              <PrivateRoute>
                <CaptureKingdom />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
