import React from 'react';
import './CheckIn.css';

function CheckIn() {
  return (
    <div className="check-in">
      <div className='total-content-check-in'>
        <div className='title-check-in'>Checkin</div>
        <div className='date-check-in'>10-10-2019</div>
        <div className='text-check-in'>
          <p>Sáng ra nhìn thấy bạn hiền</p>
          <p> Cười tươi một cái lĩnh tình ăn chơi</p>
        </div>
        <div className='div-btn-check-in'>
          <button className='btn-check-in'></button>
        </div>
      </div>
    </div>
  );
}

export default CheckIn;