import React from 'react';
import './General.css';

function General() {
  return (
    <div className="general">
      <div className='title-general'>General Account Settings</div>
      <div className='private-information'>
        <div className='title-private-information'>Private informations</div>
        <div className='content-private-information'>
          <div className='content-left-private-information'>
            <div className='content-left-private-information-child-left'>
              <p>Name</p>
              <p>Gender</p>
              <p>Birthday</p>
            </div>
            <div className='content-left-private-information-child-right'>
              <p>Lê Văn Nghĩa</p>
              <p>Nam</p>
              <p>01/08/1989</p>
            </div>
          </div>
          <div className='content-right-private-information'>
            <div className='content-right-private-information-child-left'>
              <p>Email</p>
              <p>Phone</p>
              <p>Address</p>
            </div>
            <div className='content-right-private-information-child-right'>
              <p>nghialv@bunbusoft.com</p>
              <p>0987043236</p>
              <p>Hoai Duc - Ha Noi</p>
            </div>
          </div>
        </div>
      </div>
      <div className='staff-information'>
        <div className='title-staff-information'>Staff information</div>
        <div className='content-staff-information'>
          <div className='content-left-staff-information'>
            <div className='content-left-staff-information-child-left'>
              <p>Staff ID</p>
              <p>Position</p>
            </div>
            <div className='content-left-staff-information-child-right'>
              <p>B000001</p>
              <p>PG</p>
            </div>
          </div>
          <div className='content-right-staff-information'>
            <div className='content-right-staff-information-child-left'>
              <p>Contract Type</p>
              <p>Join Date</p>
            </div>
            <div className='content-right-staff-information-child-right'>
              <p>Parttime</p>
              <p>01/08/2019</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default General;