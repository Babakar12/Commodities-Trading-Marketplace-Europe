import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
import Dashboard from './pages/Dashboard';
import MarketPrices from './pages/MarketPrices';
import Calculators from './pages/Calculators';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listings/:id" element={<ListingDetail />} />
            <Route path="/market" element={<MarketPrices />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
