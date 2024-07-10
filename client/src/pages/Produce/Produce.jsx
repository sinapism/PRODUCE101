import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProduceNav from './ProduceNav';
import './produce.css';
import Footer from './Footer';

const Produce = () => {
  const [produce, setProduce] = useState([]);
  const [selectedItemActions, setSelectedItemActions] = useState({});
  const dropdownRefs = useRef([]);

  useEffect(() => {
    const fetchAllProduce = async () => {
      try {
        const res = await axios.get("http://localhost:8800/produce");
        setProduce(res.data);

        // Initialize refs for each produce item
        dropdownRefs.current = res.data.map(() => React.createRef());
      } catch (err) {
        console.error("Error fetching produce:", err);
      }
    };

    fetchAllProduce();
  }, []);

  const handleDelete = async (produce_id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this item?");

      if (!confirmDelete) {
        return;
      }

      const response = await axios.delete(`http://localhost:8800/produce/${produce_id}`);

      if (response.data === "Produce has been deleted successfully") {
        setProduce((prevProduce) => prevProduce.filter((item) => item.produce_id !== produce_id));
        window.location.reload();
      } else {
        console.error("Error deleting produce:", response.data);
      }
    } catch (err) {
      console.error("Error deleting produce:", err);
    }
  };

  const handleDropdownChange = (index) => {
    setSelectedItemActions((prevState) => {
      return { ...prevState, [index]: !prevState[index] };
    });
  };

  return (
    <div>
      {/* Produce navigation component */}
      <ProduceNav />

  
      {/* List of produces */}
      <div className="produces">
        <table className="produces-table">
          <thead>
            <tr className="produce-header">
              <th className="column-name">IMAGE</th>
              <th className="column-name">PRODUCE NAME</th>
              <th className="column-name">DESCRIPTION</th>
              <th className="column-name">PRICE</th>
              <th className="column-name">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {produce.map((produceItem, index) => (
              <tr className="produce" key={produceItem.produce_id}>
                <td className="column-name">{produceItem.image && <img src={produceItem.image} alt="" />}</td>
                <td className="column-name">{produceItem.name}</td>
                <td className="column-name">{produceItem.description}</td>
                <td className="column-name">₱{produceItem.price}</td>
                <td className="column-name">
                  <div className="button-container" ref={dropdownRefs.current[index]}>
                    <img
                      className="dropdown-image"
                      src={require('./img/dot.png')}
                      alt=""
                      onClick={() => handleDropdownChange(index)}
                    />
                    {selectedItemActions[index] && (
                      <div className="dropdown-content">
                        {/* Button to delete produce */}
                        <button className="delete" onClick={() => handleDelete(produceItem.produce_id)}>
                          Delete
                        </button>

                        {/* Button to update (edit) produce */}
                        <button className="update">
                          <Link to={`/update/${produceItem.produce_id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            Edit
                          </Link>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      {/* Button to navigate to the "Add Produce" page */}
      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none"}}>
          + ADD NEW PRODUCE
        </Link>
      </button>


        
        
      </div>
      <Footer />
    </div>
  );
};

export default Produce;
