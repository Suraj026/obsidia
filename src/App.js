// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";

// Pages
import Login from "./pages/Login";
import AuthLanding from "./pages/AuthLanding";
import Dashboard from "./pages/Dashboard";
import MapView from "./pages/MapView";
import EarthView from "./pages/EarthView";
import MazePuzzle from "./pages/MazePuzzle"; // ✅ Make sure this file exists
import BrainTeaser from "./pages/BrainTeaser"; // ✅ Make sure this file exists
import CaptureKingdom from "./pages/CaptureKingdom"; // ✅ Make sure this file exists

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 🔓 Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/auth" element={<AuthLanding />} />

          {/* 🔒 Private Routes */}
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
