import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import marketplaceImage1 from './img/marketplace-1.jpg';
import marketplaceImage2 from './img/marketplace-2.jpg';
import marketplaceImage3 from './img/marketplace-3.jpg';

import MarketNav from './MarketNav';
import './marketplace.css'
import Footer from './Footer';



const Marketplace = () => {
  const [produce, setProduce] = useState([]);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchAllProduce = async () => {
      try {
        const res = await axios.get("http://localhost:8800/produce");
        setProduce(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllProduce();
  }, []);

  return (
    <div>
      <MarketNav />

      <div className="marketplace-header">
        <h2>Fresh Picks Await!</h2>
        <p>Finest Produce Delivered to Your Doorstep!</p>
        <button className="shop-now-button">
        <Link to="/shop" style={{ color: "inherit", textDecoration: "none" }}>
        SHOP NOW! </Link> </button>      
        </div>

      <div className="marketplace-content">
        <div className="marketplace-carousel">
          <Slider ref={sliderRef} {...carouselSettings}>
            <div>
              <img src={marketplaceImage3} alt="Marketplace 3" className="carousel-image" />
            </div>
            <div>
              <img src={marketplaceImage2} alt="Marketplace 2" className="carousel-image" />
            </div>
            <div>
              <img src={marketplaceImage1} alt="Marketplace 1" className="carousel-image" />
            </div>
          </Slider>
        </div>

        <div className="our-products">
          <h2>Our Products</h2>
        </div>

        <div className="market-produces">
          {produce.map((item) => (
            <div className="market-produce" key={item.id}>
              {item.image && <img src={item.image} alt="" />}
              <h2 className='market-name'>{item.name}</h2>
              <p className='market-description' >{item.description}</p>
              <span className= 'market-price'>₱{item.price}</span>
            </div>
 
          ))}
        </div>
        
        <Footer />

      </div>

    </div>
  );
};

export default Marketplace;
