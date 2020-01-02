import React, {useEffect } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './styles.css';
import * as modalActions from '../../../actions/modal';
import * as accountActions from '../../../actions/account';
import WrapModal from './modal/index';
import AccountFrom from './from/AccountFrom';

function Accounts(props) {
  useEffect(() => { 
    const {accountActions} = props;
    const {fetchListAccountRequest} = accountActions;
    fetchListAccountRequest();
  }, [])
  const openFrom = () => {
    const {modalActions, accountActions} = props;
    const {setAccountEditting} = accountActions;
		setAccountEditting(null);
    const {showModel, changeModelTitle, changeModelContent} = modalActions;
    showModel();
    changeModelTitle('Add new Account');
    changeModelContent(<AccountFrom/>);
  };
  const handleEditTask = (account) => {
    const {modalActions, accountActions} = props;
    const {setAccountEditting} = accountActions;
    setAccountEditting(account);
    const {showModel, changeModelTitle, changeModelContent} = modalActions;
    showModel();
    changeModelTitle('Update Account');
    changeModelContent(<AccountFrom/>);
  }
  const showModalStatus = account => {
    const {modalActions} = props;
    const {showModel, hideModel, changeModelTitle, changeModelContent} = modalActions;
    showModel();
    changeModelTitle('change status Account');
    changeModelContent(
      <div>
        <p>
          Bạn có chắc chắn muốn xóa tài khoản <span id="status-name">{account.name}</span>?
        </p>
        <div className="btn-wrapper">
          <button type="button" onClick={hideModel} className="btn btn-secondary mr-2">close</button>
          <button type="button" onClick={() => handleDeleteAccount(account)} className="btn btn-danger">Delete</button>
        </div>
      </div>
    );
  }
  const handleDeleteAccount = (account) => {
		const {id} = account;
		const {accountActions} = props;
		const {deleteAccountRequest} = accountActions;
		deleteAccountRequest(id);
	}
  const {listAccount} = props;
  return(
    <main>
      {/* breadcrumb */}
      <div className="breadcrumb-wrapper">
        <div className="container-fluid">
          <nav id="breadcrumb-body" aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/Admin">Dashboard</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Staff</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* breadcrumb end */}
      {/*tables-saffs  */}
      <div className="tables-saffs-wrapper">
        <div className="container-fluid">
          <div className="saffs-body">
            <div className="saffs-search">
              <button type="button" onClick={openFrom} className="btn btn-add" data-toggle="modal" data-target="#exampleModalCenter"><i className="fas fa-plus mr-2" />Add</button>
              <div className="saffs-search-content">
                <form className="form-inline">
                  <input className="form-control mr-sm-2" type="search" placeholder="input name or id or email" aria-label="Search" />
                  <button className="btn btn-search my-2 my-sm-0" type="submit"><i className="fas fa-search" /></button>
                </form>
              </div>
            </div>
            <div className="saffs-table-content">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Staff ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Setting</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    listAccount.map((value, key) => {
                      return (
                        <tr key={key}>
                          <td>{value.id}</td>
                          <td>{value.name}</td>
                          <td>{value.email}</td>
                          <td>{value.role}</td>
                          <td>
                            {
                              value.status === "1" ? <button type="button" className="btn btn-success">Active</button>
                              : <button type="button" className="btn btn-warning">Deactive</button>
                            }
                            </td>
                          <td className="setting-button">
                            <button type="button" onClick={() => handleEditTask(value)} className="btn btn-success mr-2">Edit</button>
                            <button type="button" onClick={() => showModalStatus(value)} className="btn btn-danger">Delete</button>
                          </td>
                        </tr> 
                      )
                    })
                  }   
                </tbody>
                <thead>
                  <tr>
                    <th>Staff ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Setting</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
      <WrapModal/>
    </main>
  )
}

const mapStateToProps = (state) => {
  return {
    open: state.modalReducer.showModel,
    listAccount: state.accountReducer.listAccount,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    modalActions: bindActionCreators(modalActions, dispatch),
    accountActions: bindActionCreators(accountActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts)