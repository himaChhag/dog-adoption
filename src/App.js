import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { FavoritesProvider } from "./contexts/FavoritesContext.tsx";
import LoginForm from "./components/LoginForm.tsx";
import DogList from "./components/DogList.tsx";
import './App.css';

function App() {
  return (
    <FavoritesProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/search" element={<DogList />} />
      </Routes>
    </Router>
    </FavoritesProvider>
  );
}

export default App;
