import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import HeroList from './components/HeroList/HeroList'; 
import HeroProfile from './components/HeroProfile/HeroProfile'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HeroList />} />
          <Route path="/hero/:id" element={<HeroProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
