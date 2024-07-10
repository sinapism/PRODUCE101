import React from 'react'
import ProduceNav from './ProduceNav';
import Footer from './Footer';
import './undercons.css'; 


const undercons = () => {
  return (
    <div>
        
      <ProduceNav />

      <div className="center-message">
        <h2>Under Development</h2>
        <p>This feature is currently under development. Check back later for updates!</p>
      </div>

      <Footer />  
        
        
    </div>
  )
}

export default undercons