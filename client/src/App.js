import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import TopFive from "./pages/TopFive";
import TodaysSale from "./pages/TodaysSale";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/topfive"
            element={
              <ProtectedRoute>
                <TopFive />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todaysale"
            element={
              <ProtectedRoute>
                <TodaysSale />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export const ProtectedRoute = (props) => {
  if (localStorage.getItem("userInfo")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default App;
