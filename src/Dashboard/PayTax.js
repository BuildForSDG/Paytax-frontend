import React, { Fragment, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import './Style.css';
import { loadUser, logout } from '../actions/auth';
import { calaculatePit, taxTypes, paystackPayment, paymentHistory } from '../actions/tax';
import { PaystackButton } from 'react-paystack';
import Header from './Header';
import Sidebar from './Sidebar';

const PayTax = ({ calaculatePit, loadUser, taxTypes, auth: { user }, tax, paystackPayment, paymentHistory }) => {
  useEffect(() => {
    loadUser();
    taxTypes();
    paymentHistory();
  }, [loadUser, taxTypes, paymentHistory]);

  console.log(tax.paymenthistory);

  const [formData, setFormData] = useState({
    income: '',
    selectothers: '',
    amountOther: ''
  });

  const { income, selectothers, amountOther } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    calaculatePit(income, user && user.taxPayerId);
  };

  const config = {
    reference: new Date().getTime(),
    email: user && user.email,
    amount: parseInt(user && user.paymentIncomeTax) * 100,
    publicKey: 'pk_test_1ca60b2a2bd97e196ce315722aefe15b18453231',
    metadata: {
      taxpayer: user && user.businessName,
      tax_type: 'PIT'
    }
  };

  const config2 = {
    reference: new Date().getTime(),
    email: user && user.email,
    amount: parseInt(amountOther) * 100,
    publicKey: 'pk_test_1ca60b2a2bd97e196ce315722aefe15b18453231',
    metadata: {
      taxpayer: user && user.businessName,
      tax_type: selectothers
    }
  };

  const componentProps = {
    ...config,
    text: 'Pay',
    onSuccess: (response) => {
      console.log(response);
      if (response.status === 'success') {
        const payFromData = {
          name: user && user.businessName,
          amount: parseInt(user && user.paymentIncomeTax),
          email: user && user.email,
          taxtype: 'PIT',
          reference: response.reference
        };
        paystackPayment(payFromData);
      }
    },
    onClose: () => null
  };

  const componentProps2 = {
    ...config2,
    text: 'Pay',
    onSuccess: (response) => {
      console.log(response);
      if (response.status === 'success') {
        const payFromData = {
          name: user && user.businessName,
          amount: parseInt(amountOther),
          email: user && user.email,
          taxtype: selectothers,
          reference: response.reference
        };
        paystackPayment(payFromData);
      }
    },
    onClose: () => null
  };

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
                <div className="card-header">Personal Income Tax (PIT)</div>
                <div className="card-body">
                  <div className="card-text">
                    <form onSubmit={(e) => onSubmit(e)}>
                      <p>Add or Update your income.</p>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          name="income"
                          value={income}
                          onChange={(e) => onChange(e)}
                          placeholder="₦ 0.00"
                        />
                        <input type="submit" value="Update" className="btn btn-primary" />
                      </div>
                    </form>
                    <br />
                    <p>
                      Payable Amount:{' '}
                      {user && user.paymentIncomeTax ? parseInt(user && user.paymentIncomeTax) : '₦ 0.00'}
                    </p>
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
                        <strong>Total Amount: </strong>₦{' '}
                        {user && user.paymentIncomeTax ? parseInt(user && user.paymentIncomeTax) : '0.00'}
                      </p>
                    </div>
                    <div className="text-center">
                      {/* <button type="submit" onClick={(e) => onSubmit2(e)} className="btn btn-primary btn-lg btn-block text-center">
                        Pay
                      </button> */}
                      <PaystackButton className="btn btn-primary btn-lg btn-block text-center" {...componentProps} />
                    </div>
                    <br />
                    <br />
                  </div>
                </div>
              </div>
            
              <div className="card shadow-sm mb-5 bg-white rounded">
                <div className="card-header">Others</div>
                <div className="card-body">
                  <div className="card-text">
                    <div className="input-group">
                      <select
                        name="selectothers"
                        value={selectothers}
                        className="form-control"
                        onChange={(e) => onChange(e)}
                      >
                        <option>Other Taxes</option>
                        {tax.taxtypes.length > 0 ? (
                          tax.taxtypes.map((tax) => (
                            <option key={tax._id} value={tax.name}>
                              {tax.name}
                            </option>
                          ))
                        ) : (
                          <option>None Found...</option>
                        )}
                      </select>
                    </div>
                    <br />
                    <div className="input-group">
                      <input
                        type="number"
                        value={amountOther}
                        className="form-control"
                        onChange={(e) => onChange(e)}
                        name="amountOther"
                        placeholder="Enter Amount"
                        required
                      />
                    </div>
                    <br />
                    <div className="text-center">
                      <PaystackButton className="btn btn-primary btn-lg btn-block text-center" {...componentProps2} />
                    </div>
                    <br />
                    <p className="text-center">
                      <strong>NOTE: </strong>You can only pay one at a time.
                    </p>
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

PayTax.protoTypes = {
  auth: PropTypes.object.isRequired,
  tax: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  calaculatePit: PropTypes.func.isRequired,
  taxTypes: PropTypes.func.isRequired,
  paystackPayment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tax: state.tax
});

export default connect(mapStateToProps, { loadUser, calaculatePit, logout, taxTypes, paystackPayment, paymentHistory })(
  PayTax
);
