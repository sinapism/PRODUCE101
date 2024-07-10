import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MarketNav from './MarketNav';
import './shop.css';
import Footer from './Footer';

const Shop = () => {
  const [produce, setProduce] = useState([]);

  useEffect(() => {
    // Fetching all produce data from the server
    const fetchAllProduce = async () => {
      try {
        const res = await axios.get("http://localhost:8800/produce");
        setProduce(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllProduce();
  }, []);

  const handleAddToCart = (produceId) => {
    // Implement your logic to add the product to the cart
    console.log(`Product with ID ${produceId} added to cart`);
  };

  return (
    <div>
      <MarketNav />

      <div className="shop-content">
        <h2>Welcome to the Shop!</h2>

        <div className="shop-produces">
          {produce.map((item) => (
            <div className="shop-produce" key={item.id}>
              {item.image && <img src={item.image} alt="" />}
              <h2 className='shop-name'>{item.name}</h2>
              <p className='shop-description'>{item.description}</p>
              <span className='shop-price'>₱{item.price}</span>
              <button onClick={() => handleAddToCart(item.id)} className='add-to-cart-button'>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;
