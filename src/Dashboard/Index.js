import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Style.css';


const Dashboard = () => {
  return (
    <Fragment>
      <header>
        <div className="logo">
          PayTax
          <button className="btn btn-primary" id="menu-toggle">
            <span className="navbar-toggler-icon">|||</span>
          </button>
        </div>

        <div className="flex_r_j_between_align_center right_side">
          <div className="flex_r_j_between_align_center headertxt">need help? call +234-Taxhelp</div>
          <div className="flex_r_j_between_align_center username">
            <div>
              <img src="https://via.placeholder.com/150" alt="userpic" />
            </div>
            <h6>Logout</h6>
          </div>
        </div>
      </header>
      <div className="d-flex" id="wrapper">
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading bg-dark text-center">
            <img src="circle1.png" alt="" />
            <p>
              Margareta Casmonas <br />
              Tax Payment ID: 1111111111
            </p>
          </div>
          <div className="list-group list-group-flush">
            <Link to="#" className="list-group-item list-group-item-action bg-light">
              <i className="fa fa-fw fa-arrow-circle-right"></i>
              Dashboard
            </Link>
            <Link to="#" className="list-group-item list-group-item-action bg-light">
              <i className="fa fa-fw fa-eye"></i>
              Payment History
            </Link>
            <Link to="#" className="list-group-item list-group-item-action bg-light">
              <i className="fa fa-fw fa-flag"></i>
              Invoice
            </Link>
            <Link to="#" className="list-group-item list-group-item-action bg-light">
              <i className="fa fa-fw fa-money"></i>Pay Tax
            </Link>
            <Link to="#" className="list-group-item list-group-item-action bg-light">
              <i className="fa fa-fw fa-thumbs-up"></i>Contact Us
            </Link>
            <Link to="#" className="list-group-item list-group-item-action bg-light">
              <i className="fa fa-fw fa-question-circle"></i>FAQ
            </Link>
            <Link to="#" className="list-group-item list-group-item-action bg-light">
              <i className="fa fa-fw fa-sign-out"></i>
              Logout
            </Link>
          </div>
        </div>

        <div id="page-content-wrapper">
          <div className="container-fluid">
            <p></p>
            <div className="card-deck">
              <div className="card shadow-sm mb-5 bg-white rounded">
                <div className="card-header">Data Info</div>
                <div className="card-body">
                  <div className="text-center">
                    <img src="circle.png" alt="" />
                  </div>
                  <h5 className="card-title text-center">
                    Margareta Leyla Casmonas <br />
                    Tax Payment ID
                  </h5>
                  <br />
                  <div className="card-text">
                    <h6>Personal Information</h6>
                    <hr />
                    <p>Name of Business</p>
                    <p>Personal Address</p>
                    <br />
                    <br />
                  </div>
                  <div className="card-text">
                    <h6>Business Information</h6>
                    <hr />
                    <p>Business Address</p>
                    <p>Date of Registration</p>
                    <p>No. of Employees</p>
                    <p>Date of Registration</p>
                  </div>
                </div>
              </div>
              <div className="card shadow-sm mb-5 bg-white rounded">
                <div className="card-header">Make Payment</div>
                <div className="card-body">
                  <div className="card-text">
                    <h6>Personal Income Tax (PIT)</h6>
                    <hr />
                    <p>Use the update bottom to effect any change on your income else click pay.</p>
                    <div className="input-group">
                      <input type="number" className="form-control" placeholder="$0.00" />
                      <input type="submit" value="Update" className="btn btn-primary" />
                    </div>
                    <br />
                    <p>Payable Amount: $10,000</p>
                    <div className="input-group">
                      <p>
                        <strong>Outstanding Payment </strong>
                      </p>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" name="amount" id="amount" /> Outstanding Amount: $0.00
                        </label>
                      </div>
                    </div>
                    <br />
                    <div className="input-group">
                      <p>
                        <strong>Total Amount: </strong>$10,000
                      </p>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary btn-lg btn-block text-center">
                        Pay
                      </button>
                    </div>
                    <br />
                    <br />
                  </div>
                  <div className="card-text">
                    <h6>Others</h6>
                    <hr />
                    <p>Use the dropdown</p>
                    <div className="input-group">
                      <select name="others" id="others" className="form-control">
                        <option value="Other Taxes">Other Taxes</option>
                      </select>
                    </div>
                    <br />
                    <div className="input-group">
                      <input type="text" className="form-control" name="amount" placeholder="Enter Amount" />
                    </div>
                    <br />
                    <div className="input-group">
                      <p>
                        <strong>Payable Amount: </strong>$10,000
                      </p>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary btn-lg btn-block text-center">
                        Pay
                      </button>
                    </div>
                    <br />
                    <p className="text-center">
                      <strong>NOTE: </strong>You can only pay one at a time.
                    </p>
                  </div>
                </div>
              </div>
              <div className="card shadow-sm mb-5 bg-white rounded">
                <div className="card-header">Transaction History</div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Year</th>
                        <th scope="col">Month</th>
                        <th scope="col">Tax Levy</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>2020</td>
                        <td>January</td>
                        <td>$10,000</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>2020</td>
                        <td>Febuary</td>
                        <td>$10,000</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>2020</td>
                        <td>March</td>
                        <td>$10,000</td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td>2020</td>
                        <td>April</td>
                        <td>$10,000</td>
                      </tr>
                      <tr>
                        <th scope="row">5</th>
                        <td>2020</td>
                        <td>May</td>
                        <td>$10,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
