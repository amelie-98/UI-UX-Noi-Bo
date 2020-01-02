import React from 'react';
import './General.css';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/index';

function General(props) {
  const currentUser = props.currentUser
  return (
    <div>
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
                <p>{currentUser.name}</p>
                <p>{currentUser.sex}</p>
                <p>{currentUser.birthDay}</p>
              </div>
            </div>
            <div className='content-right-private-information'>
              <div className='content-right-private-information-child-left'>
                <p className="text-item-ganeral">Email:</p>
                <p className="text-item-ganeral">Phone:</p>
                <p className="text-item-ganeral">Address:</p>
              </div>
              <div className='content-right-private-information-child-right'>
                <p>{currentUser.mail}</p>
                <p>{currentUser.sdt}</p>
                <p>{currentUser.address}</p>
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
                <p>{currentUser.id}</p>
                <p>{currentUser.position}</p>
              </div>
            </div>
            <div className='content-right-staff-information'>
              <div className='content-right-staff-information-child-left'>
                <p className="text-item-ganeral">Contract Type:</p>
                <p className="text-item-ganeral">Join Date:</p>
              </div>
              <div className='content-right-staff-information-child-right'>
                <p>{currentUser.contractType}</p>
                <p>{currentUser.dateJoinCompany}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getInfoCurrentUser: () => { dispatch(actions.getInfoCurrentUser()) }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(General);