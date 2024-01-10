import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Administrator from "./pages/Admin/Admin";
import User from "./pages/User/User";

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Administrator />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
