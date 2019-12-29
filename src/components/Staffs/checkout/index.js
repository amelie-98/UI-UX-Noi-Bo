import React from 'react';
import {Link} from 'react-router-dom';
import './CheckOut.css';

function CheckOut() {
  return (
    <div className="check-out">
      <div className="total-content-check-out">
        <div className="title-check-out">CheckOut</div>
        <div className="date-check-out">10-10-2019</div>
        <Link to="/Checkout" className="link-btn"><button className="btn btn-checkout">Finish</button></Link>
      </div>
    </div>
  );
}

export default CheckOut;