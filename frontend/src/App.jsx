import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";

import MainLaout from "./layouts/MainLaout";
import DashboardLaout from "./layouts/DashboardLaout";

import Map from "./pages/dashboard/Map";
import Settings from "./pages/dashboard/Settings";
import Forecast from "./pages/dashboard/Forecast";
import Profile from "./pages/dashboard/Profile";



import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* main layout */}

        <Route element={<MainLaout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>
        {/* Dashboard layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLaout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="map" element={<Map />} />
          <Route path="settings" element={<Settings />} />
          <Route path="forecast" element={<Forecast />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
