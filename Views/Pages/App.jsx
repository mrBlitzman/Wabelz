import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mainpage from './Mainpage.jsx';
import Packages from './Packages.jsx';
import Package from './Package.jsx';
import Order from './Order.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Mainpage />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/package" element={<Package />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </Router> 
  );
}

export default App;
