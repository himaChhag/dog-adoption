import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginForm from "./components/LoginForm.tsx";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
