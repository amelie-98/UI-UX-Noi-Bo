import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

function Timesheets(props) {
  return (
    <main>
      {/* breadcrumb */}
      <div className="breadcrumb-wrapper">
        <div className="container-fluid">
          <nav id="breadcrumb-body" aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Timeshesst</li>
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
              <div className="times-select">
                <select className="custom-select mr-sm-2" id="inputDate" >
                  <option >09-2019</option>
                  <option value={1}>08-2019</option>
                  <option value={2}>07-2019</option>
                </select>
              </div>
              <div className="saffs-search-content">
                <form className="form-inline">
                  <input className="form-control mr-sm-2" type="search" placeholder="Enter name" aria-label="Search" />
                  <button className="btn btn-search my-2 my-sm-0" type="submit"><i className="fas fa-search" /></button>
                </form>
              </div>
            </div>
            <div className="tables-title">
              <div className="tables-title-item">Inlate: 1</div>
              <div className="tables-title-item">Leave early: 1</div>
              <div className="tables-title-item">Nghỉ: 1</div>
            </div>
            <div className="saffs-table-content">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>CheckIn</th>
                    <th>Checkout</th>
                    <th>Report</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>30/09/2019</td>
                    <td>08:10</td>
                    <td>17:00</td>
                    <td>Yes</td>
                    <td className="setting-button"><button type="button" className="btn btn-success">Report</button></td>
                  </tr>
                  <tr>
                    <td>39/09/2019</td>
                    <td>08:10</td>
                    <td>17:15</td>
                    <td className="times-dis">No</td>
                    <td className="setting-button"><button type="button" className="btn btn-success">Report</button></td>
                  </tr>
                  <tr>
                    <td>28/09/2019</td>
                    <td>08:10</td>
                    <td className="times-dis">16:10</td>
                    <td>Yes</td>
                    <td className="setting-button"><button type="button" className="btn btn-success">Report</button></td>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>CheckIn</th>
                    <th>Checkout</th>
                    <th>Report</th>
                    <th />
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
    </main>
  )
}

export default Timesheets;