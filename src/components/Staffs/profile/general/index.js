import React from 'react';
import './General.css';

function General() {
  return (
    <div className="general">
      <div className='title-general'>General Account Settings</div>
      <div className='private-information'>
        <div className='title-information'>Private informations</div>
        <div className='content-private-information'>
          <div className='content-left-private-information'>
            <div className='content-left-private-information-child-left'>
              <p className="text-item-ganeral">Name:</p>
              <p className="text-item-ganeral">Gender:</p>
              <p className="text-item-ganeral">Birthday:</p>
            </div>
            <div className='content-left-private-information-child-right'>
              <p>Lê Văn Nghĩa</p>
              <p>Nam</p>
              <p>01/08/1989</p>
            </div>
          </div>
          <div className='content-right-private-information'>
            <div className='content-right-private-information-child-left'>
              <p className="text-item-ganeral">Email:</p>
              <p className="text-item-ganeral">Phone:</p>
              <p className="text-item-ganeral">Address:</p>
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
        <div className='title-information'>Staff information</div>
        <div className='content-staff-information'>
          <div className='content-left-staff-information'>
            <div className='content-left-staff-information-child-left'>
              <p className="text-item-ganeral">Staff ID:</p>
              <p className="text-item-ganeral">Position:</p>
            </div>
            <div className='content-left-staff-information-child-right'>
              <p>B000001</p>
              <p>PG</p>
            </div>
          </div>
          <div className='content-right-staff-information'>
            <div className='content-right-staff-information-child-left'>
              <p className="text-item-ganeral">Contract Type:</p>
              <p className="text-item-ganeral">Join Date:</p>
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