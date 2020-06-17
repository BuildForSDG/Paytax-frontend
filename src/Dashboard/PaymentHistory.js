import React, { Fragment, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import './Style.css';
import { loadUser } from '../actions/auth';
import { paymentHistory } from '../actions/tax';
import Moment from 'moment';
import Header from './Header';
import Sidebar from './Sidebar';

const PaymentHistory = ({ loadUser, auth: { user }, tax, paymentHistory }) => {
  useEffect(() => {
    loadUser();
    paymentHistory();
  }, [loadUser, paymentHistory]);

  console.log(tax.paymenthistory);

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
                <div className="card-header">Transaction History</div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Payment Reference</th>
                        <th scope="col">Type</th>
                        
                      </tr>
                    </thead>

                    {tax && tax.paymenthistory.length > 0 ? (
                      tax.paymenthistory.map((taxpay, i) => (
                        <tbody>
                          <tr>
                            <th scope="row">{i + 1}</th>
                            <td>{Moment(taxpay.payment_date).format('MMM. D, YYYY h:mm A z')}</td>
                            <td>₦{parseInt(taxpay.amount)}</td>
                            <td>{taxpay.payment_reference}</td>
                            <td>{taxpay.taxtype}</td>
                          </tr>
                        </tbody>
                      ))
                    ) : (
                      <p>No History Found...</p>
                    )}
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

PaymentHistory.protoTypes = {
  auth: PropTypes.object.isRequired,
  tax: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tax: state.tax
});

export default connect(mapStateToProps, { loadUser, paymentHistory })(PaymentHistory);
