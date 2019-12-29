import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './styles.css';
import * as modalActions from '../../../actions/modal';
import WrapModal from './modal/index';
import AccountFrom from './from/AccountFrom';

function Accounts(props) {
  const openFrom = () => {
    const {modalActions} = props;
    const {showModel, changeModelTitle, changeModelContent} = modalActions;
    showModel();
    changeModelTitle('Add new Account');
    changeModelContent(<AccountFrom/>);
  };
  const handleEditTask = () => {
    const {modalActions} = props;
    const {showModel, changeModelTitle, changeModelContent} = modalActions;
    showModel();
    changeModelTitle('Update Account');
    changeModelContent(<AccountFrom/>);
  }
  const showModalStatus = () => {
    const {modalActions} = props;
    const {showModel, hideModel, changeModelTitle, changeModelContent} = modalActions;
    showModel();
    changeModelTitle('change status Account');
    changeModelContent(
      <div>
        <p>
          Bạn có chắc chắn muốn thay đổi trạng thái của <span id="status-name">Le Van Nghia</span>?
        </p>
        <div className="btn-wrapper">
          <button type="button" onClick={hideModel} className="btn btn-secondary mr-2">close</button>
          <button type="button" className="btn btn-success">change</button>
        </div>
      </div>
    );
  }
  return(
    <main>
      {/* breadcrumb */}
      <div className="breadcrumb-wrapper">
        <div className="container-fluid">
          <nav id="breadcrumb-body" aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Saffs</li>
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
                  <tr>
                    <td>B000001</td>
                    <td>Lê Văn Nghĩa</td>
                    <td>nghialv@bunbsoft.com</td>
                    <td>Admin</td>
                    <td><button type="button" className="btn btn-success">Active</button></td>
                    <td className="setting-button">
                      <button type="button" onClick={showModalStatus} className="btn btn-warning mr-2">Deactive</button>
                      <button type="button" onClick={handleEditTask} className="btn btn-success">Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td>B000002</td>
                    <td>Nguyễn Nam Hà</td>
                    <td>nghialv@bunbsoft.com</td>
                    <td>Admin</td>
                    <td><button type="button" className="btn btn-success">Active</button></td>
                    <td className="setting-button">
                      <button type="button" onClick={showModalStatus} className="btn btn-warning mr-2">Deactive</button>
                      <button type="button" onClick={handleEditTask} className="btn btn-success">Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td>B000003</td>
                    <td>Hà Thế Trung</td>
                    <td>nghialv@bunbsoft.com</td>
                    <td>Admin</td>
                    <td><button type="button" className="btn btn-success">Active</button></td>
                    <td className="setting-button">
                      <button type="button" onClick={showModalStatus} className="btn btn-warning mr-2">Deactive</button>
                      <button type="button" onClick={handleEditTask} className="btn btn-success">Edit</button>
                    </td>
                  </tr>
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
          <div className="pagination-wraper">
            <nav aria-label="...">
              <ul className="pagination">
                <li className="page-item disabled">
                  <Link className="page-link" to="/" tabIndex={-1}><i className="fas fa-angle-left" /></Link>
                </li>
                <li className="page-item active"><Link className="page-link" to="/">1</Link></li>
                <li className="page-item ">
                  <Link className="page-link" to="/">2 <span className="sr-only">(current)</span></Link>
                </li>
                <li className="page-item"><Link className="page-link" to="/">3</Link></li>
                <li className="page-item">
                  <Link className="page-link" to="/"><i className="fas fa-angle-right" /></Link>
                </li>
              </ul>
            </nav>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    modalActions: bindActionCreators(modalActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts)