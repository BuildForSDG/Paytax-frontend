import React, { Fragment, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import './Style.css';
import { loadUser } from '../actions/auth';
import { paymentHistory } from '../actions/tax';
import Moment from 'moment';
import Header from './Header';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

const Dashboard = ({ loadUser, auth: { user }, tax, paymentHistory }) => {
  useEffect(() => {
    loadUser();
    paymentHistory();
  }, [loadUser, paymentHistory]);

  return (
    <Fragment>
      <Header />
      <div className="d-flex" id="wrapper">
        <Sidebar user={user} />
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <p></p>
            <div className="card-deck">
              <div className="card shadow-sm mb-5 bg-white rounded">
                <div className="card-header">Data Info</div>
                <div className="card-body">
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
                  </div>
                  <div className="text-center">
                    <Link to="/">
                      <button type="submit" className="btn btn-primary">
                        Edit Profile
                      </button>
                    </Link>
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
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Type</th>
                      </tr>
                    </thead>

                    {tax && tax.paymenthistory.length > 0 ? (
                      tax.paymenthistory.filter((val,i)=>i<5).map((taxpay, i) => (
                        <tbody>
                          <tr>
                            <th scope="row">{i + 1}</th>
                            <td>{Moment(taxpay.payment_date).format('LL')}</td>
                            <td>₦{parseInt(taxpay.amount)}</td>
                            <td>{taxpay.taxtype}</td>
                          </tr>
                        </tbody>
                      ))
                    ) : (
                      <p>No History Found...</p>
                    )}
                  </table>
                  <div className="text-center">
                    <Link to="/paymenthistory">
                      <button type="submit" className="btn btn-primary">
                        View More
                      </button>
                    </Link>{' '}
                    <Link to="/paytax">
                      <button type="submit" className="btn btn-primary">
                       Make Payment
                      </button>
                    </Link>
                  </div>
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
  tax: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tax: state.tax
});

export default connect(mapStateToProps, { loadUser, paymentHistory })(Dashboard);
