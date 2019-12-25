import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

function Accounts(props) {
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
              <button type="button" className="btn btn-add" data-toggle="modal" data-target="#exampleModalCenter"><i className="fas fa-plus mr-2" />Add</button>
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
                      <button type="button" className="btn btn-warning mr-2">Deactive</button>
                      <button type="button" className="btn btn-success">Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td>B000002</td>
                    <td>Nguyễn Nam Hà</td>
                    <td>nghialv@bunbsoft.com</td>
                    <td>Admin</td>
                    <td><button type="button" className="btn btn-success">Active</button></td>
                    <td className="setting-button">
                      <button type="button" className="btn btn-warning mr-2">Deactive</button>
                      <button type="button" className="btn btn-success">Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td>B000003</td>
                    <td>Hà Thế Trung</td>
                    <td>nghialv@bunbsoft.com</td>
                    <td>Admin</td>
                    <td><button type="button" className="btn btn-success">Active</button></td>
                    <td className="setting-button">
                      <button type="button" className="btn btn-warning mr-2">Deactive</button>
                      <button type="button" className="btn btn-success">Edit</button>
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
      {/*tables-saffs end */}
      {/* Modal */}
      <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Create account</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group row">
                  <label htmlFor="inputEmail" className="col-sm-3 col-form-label">Email(*)</label>
                  <div className="col-sm-9">
                    <input type="email" className="form-control" id="inputEmail" placeholder="email" />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputName" className="col-sm-3 col-form-label">Name(*)</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" id="inputName" placeholder="Name" />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputSaff" className="col-sm-3 col-form-label">Staff ID(*)</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" id="inputSaff" placeholder="Staff ID" />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputRole" className="col-sm-3 col-form-label">Role(*)</label>
                  <div className="col-sm-9">
                    <select className="custom-select mr-sm-2" id="inputDate">
                      <option/>
                      <option value={1}>Admin</option>
                      <option value={2}>Saffs</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputDate" className="col-sm-3 col-form-label">date(*)</label>
                  <div className="col-sm-9">
                    <input type="date" className="form-control" id="inputDate" placeholder="date" />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success">Save</button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
    </main>
  )
}

export default Accounts;