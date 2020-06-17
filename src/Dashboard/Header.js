import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({logout}) => {
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
            <h6>
              <Link to="/" onClick={logout}>
                Logout
              </Link>{' '}
            </h6>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

Header.propTypes = {
    logout: PropTypes.func.isRequired,
};

export default connect(null, {logout})(Header);
