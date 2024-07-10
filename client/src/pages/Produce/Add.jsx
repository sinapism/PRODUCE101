import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ProduceNav from './ProduceNav';
import Footer from './Footer';

// Functional component for adding a new produce item
const Add = () => {
  const [produce, setProduce] = useState({
    name: '',
    price: null,
    description: '',
    image: '',
  });

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setProduce((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle button click to add a new produce item
  const handleClick = async (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    if (!produce.name || produce.price === null || !produce.description || !produce.image) {
      alert("Please fill in all the fields before adding produce.");
      return;
    }

    try {
      await axios.post('http://localhost:8800/produce', produce);
      navigate('/produce');
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  // JSX structure for the add produce form
  return (
    <div>
      <ProduceNav />

      <div className="form">
        <h1>ADD NEW PRODUCE</h1>
        <input type="text" placeholder="name" onChange={handleChange} name="name" />
        <input type="number" placeholder="price" onChange={handleChange} name="price" />
        <textarea rows={5} type="text" placeholder="description" onChange={handleChange} name="description" />
        <input type="text" placeholder="image" onChange={handleChange} name="image" />

        <button onClick={handleClick}>Add</button>
        {error && <p>Something went wrong!</p>}
        <Link to="/produce"> cancel </Link>
      </div>

      <Footer />
    </div>
  );
};

export default Add;
