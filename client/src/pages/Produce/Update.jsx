import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProduceNav from './ProduceNav';
import Footer from './Footer';

const Update = () => {
  const [produce, setProduce] = useState({
    name: '',
    price: null,
    description: '',
    image: '',
  });

  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const produceId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduce((prevProduce) => ({
      ...prevProduce,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    if (!produce.name || produce.price === null || !produce.description || !produce.image) {
      alert("Please fill in all the fields before updating produce.");
      return;
    }

    try {
      await axios.put(`http://localhost:8800/produce/${produceId}`, produce);
      navigate("/produce");
    } catch (err) {
      console.error("Update error:", err);

      if (err.response) {
        console.error("Server response:", err.response.data);
        setError(err.response.data);
      } else {
        console.error("Unknown error:", err);
        setError("Something went wrong!");
      }
    }
  };

  return (
    <div>
      <ProduceNav />

      <div className="form">
        <h1>UPDATE PRODUCE DATA</h1>
        <input type="text" placeholder="name" onChange={handleChange} name="name" />
        <input type="number" placeholder="price" onChange={handleChange} name="price" />
        <textarea rows={5} type="text" placeholder="description" onChange={handleChange} name="description" />
        <input type="text" placeholder="image" onChange={handleChange} name="image" />

        <button className="formButton" onClick={handleClick}>Update </button>
        {error && <p>Error: {error.response ? error.response.data : "Something went wrong!"}</p>}
        <Link to="/produce"> cancel </Link>
      </div>

      <Footer/>
    </div>
  );
};

export default Update;
