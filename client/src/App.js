import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Produce from './pages/Produce/Produce';
import Add from './pages/Produce/Add';
import Update from './pages/Produce/Update';

import Undercons from './pages/Produce/Undercons';

import './pages/style.css';
import Signup from './pages/Resigtration/Signup';
import Login from './pages/Resigtration/Login';

import Marketplace from './pages/Marketplace/Marketplace';
import Cart from './pages/Marketplace/Cart';
import Shop from './pages/Marketplace/Shop';






function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
                 
          <Route path="/Produce" element={<Produce />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />

          <Route path="/Signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/shop" element={<Shop/>} />
          <Route path='/Undercons' element={<Undercons />}></Route>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
