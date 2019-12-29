import React from 'react';
import './General.css';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';

function General(props) {
  const currentUser = props.currentUser
  return (
    <div>
      {
        currentUser.status === 200 ?
          <div className="general">
            <div className='title-general'>General Account Settings</div>
            <div className='private-information'>
              <div className='title-private-information'>Private informations</div>
              <div className='content-private-information'>
                <div className='content-left-private-information'>
                  <div className='content-left-private-information-child-left'>
                    <p>Name </p>
                    <p>Gender</p>
                    <p>Birthday</p>
                  </div>
                  <div className='content-left-private-information-child-right'>
                    <p>{currentUser.data.name}</p>
                    <p>{currentUser.data.sex}</p>
                    <p>{currentUser.data.birthDay}</p>
                  </div>
                </div>
                <div className='content-right-private-information'>
                  <div className='content-right-private-information-child-left'>
                    <p>Email</p>
                    <p>Phone</p>
                    <p>Address</p>
                  </div>
                  <div className='content-right-private-information-child-right'>
                    <p>{currentUser.data.mail}</p>
                    <p>{currentUser.data.sdt}</p>
                    <p>{currentUser.data.address}</p>
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
                    <p>{currentUser.data.id}</p>
                    <p>{currentUser.data.position}</p>
                  </div>
                </div>
                <div className='content-right-staff-information'>
                  <div className='content-right-staff-information-child-left'>
                    <p>Contract Type</p>
                    <p>Join Date</p>
                  </div>
                  <div className='content-right-staff-information-child-right'>
                    <p>{currentUser.data.contractType}</p>
                    <p>{currentUser.data.dateJoinCompany}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          null
      }
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