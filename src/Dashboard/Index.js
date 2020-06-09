import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import './Style.css';
import { loadUser, logout } from '../actions/auth';
import { calaculatePit, paystackPayment } from '../actions/tax';

const Dashboard = ({ calaculatePit, paystackPayment, loadUser, logout, auth: { user } }) => {

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const [formData, setFormData] = useState({
    income: ''
  });

  const { income } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    calaculatePit(income, user && user.taxPayerId);
  };

  const onSubmit2 = (e) => {
    e.preventDefault();
    const formPay = {
      name: user && user.businessName,
      amount: user && user.paymentIncomeTax,
      email: user && user.email,
      tax_type: 'PIT'
    };
    paystackPayment(formPay);
    console.log(formPay);
  };

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
            <h6><Link to='/' onClick={logout}>Logout</Link> </h6>
          </div>
        </div>
      </header>
      <div className="d-flex" id="wrapper">
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading bg-dark text-center">
            <img src="https://via.placeholder.com/80" alt="" />
            <p>
              Name: {user && user.businessName.toUpperCase()} <br />
              Tax ID: {user && user.taxPayerId.toUpperCase()}
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
            <Link to='/' onClick={logout} className="list-group-item list-group-item-action bg-light">
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
                    <img src="https://via.placeholder.com/150" alt="" />
                  </div>
                  <h5 className="card-title text-center">
                    Name: {user && user.businessName.toUpperCase()} <br />
                    Tax ID: {user && user.taxPayerId.toUpperCase()}
                  </h5>
                  <br />
                  <div className="card-text">
                    <h6>Personal Information</h6>
                    <hr />
                    <p>Name: {user && user.businessName} </p>
                    <p>Email: {user && user.email}</p>
                    <p>Phone No: {user && user.phone}</p>
                    <p>State: {user && user.state}</p>
                    <p>City: {user && user.city}</p>
                    <br />
                    <br />
                  </div>
                </div>
              </div>
              <div className="card shadow-sm mb-5 bg-white rounded">
                <div className="card-header">Make Payment</div>
                <div className="card-body">
                  <div className="card-text">
                    <h6>Personal Income Tax (PIT)</h6>
                    <hr />
                    <form onSubmit={(e) => onSubmit(e)}>
                    <p>Add or Update your income.</p>
                    <div className="input-group">
                      <input type="number"
                      className="form-control"
                      name="income"
                      value={income}
                      onChange={(e) => onChange(e)}
                      placeholder="₦ 0.00" />
                      <input type="submit" value="Update" className="btn btn-primary" />
                    </div>
                    </form>
                    <br />
                    <p>Payable Amount: {user && user.paymentIncomeTax ? parseInt(user && user.paymentIncomeTax) : '₦ 0.00'}</p>
                    <div className="input-group">
                      <p>
                        <strong>Outstanding Payment </strong>
                      </p>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" name="amount" id="amount" /> Outstanding Amount: ₦ 0.00
                        </label>
                      </div>
                    </div>
                    <br />
                    <div className="input-group">
                      <p>
                        <strong>Total Amount: </strong>₦ {parseInt(user && user.paymentIncomeTax)}
                      </p>
                    </div>
                    <div className="text-center">
                      <button type="submit" onClick={(e) => onSubmit2(e)} className="btn btn-primary btn-lg btn-block text-center">
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

Dashboard.protoTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  calaculatePit: PropTypes.func.isRequired,
  paystackPayment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser, calaculatePit, logout, paystackPayment })(Dashboard);
