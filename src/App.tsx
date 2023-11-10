import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login/Login"; // Login component
// import Dashboard from './pages/Dashboard/Dashboard'; // Your protected page

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
