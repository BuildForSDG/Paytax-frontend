import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = ({logout, user}) => {
  return (
    <Fragment>
      <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading bg-dark text-center">
            <img src="https://via.placeholder.com/80" alt="" />
            <p>
              Name: {user && user.businessName.toUpperCase()} <br />
              Tax ID: {user && user.taxPayerId.toUpperCase()}
            </p>
          </div>
          <div className="list-group list-group-flush">
            <Link to="../dashboard" className="list-group-item list-group-item-action bg-light">
              <i className="fa fa-fw fa-arrow-circle-right"></i>
              Dashboard
            </Link>
            <Link to="../paymenthistory" className="list-group-item list-group-item-action bg-light">
              <i className="fa fa-fw fa-eye"></i>
              Payment History
            </Link>
            <Link to="../paytax" className="list-group-item list-group-item-action bg-light">
              <i className="fa fa-fw fa-money"></i>Pay Tax
            </Link>
            <Link to="#" className="list-group-item list-group-item-action bg-light">
              <i className="fa fa-fw fa-thumbs-up"></i>Contact Us
            </Link>
            <Link to="#" className="list-group-item list-group-item-action bg-light">
              <i className="fa fa-fw fa-question-circle"></i>FAQ
            </Link>
            <Link to="/" onClick={logout} className="list-group-item list-group-item-action bg-light">
              <i className="fa fa-fw fa-sign-out"></i>
              Logout
            </Link>
          </div>
        </div>
    </Fragment>
  );
};

Sidebar.propTypes = {
    logout: PropTypes.func.isRequired,
};

export default connect(null, {logout})(Sidebar);
