import React, { Fragment, useState } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, NavbarText, Nav } from 'reactstrap';
import './index.css';
import { Icon } from 'react-icons-kit';
import { eye } from 'react-icons-kit/fa/eye';
import { user } from 'react-icons-kit/icomoon/user';
import { signup, login } from '../actions/auth';

const LandingPage = ({ signup, login, auth }) => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: '/dashboard' } };
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    address: '',
    email: '',
    maritalStatus: '',
    phone: '',
    status: '',
    gender: '',
    birthDate: '',
    bvn: '',
    password: '',
    state: '',
    city: '',
    taxPayerId: '',
    passwordLogin: ''
  });

  const { name, address, email, phone, bvn, state, city, taxPayerId, passwordLogin, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // const formDataSignup = new FormData();
    // formDataSignup.append('company', company);
    // formDataSignup.append('name', name);
    // formDataSignup.append('address', address);
    // formDataSignup.append('email', email);
    // formDataSignup.append('maritalStatus', maritalStatus);
    // formDataSignup.append('phone', phone);
    // formDataSignup.append('status', status);
    // formDataSignup.append('gender', gender);
    signup(formData);
  };

  const onSubmit1 = (e) => {
    e.preventDefault();
    login(taxPayerId, passwordLogin);
  };

  if (auth && auth.isAuthenticated) {
    from ? history.replace(from) : history.replace('/dashboard');
  }

  return (
    <Fragment>
      <div>
        <Navbar color="primary" light expand="md">
          <NavbarBrand href="/" style={{ color: 'white' }}>
            PayTax
          </NavbarBrand>
          <NavbarToggler />
          <Collapse navbar>
            <Nav className="mr-auto" navbar></Nav>
            <NavbarText style={{ color: 'white', fontFamily: 'Times New Roman' }}>need help? +234-Taxhelp</NavbarText>
          </Collapse>
        </Navbar>
        {/* <Col xs="2">
              <SideNavBar />
            </Col> */}
        <Row className="p-0 m-0 pt-lg-3  d-flex flex-direction-row align-items-center">
          <Col md="8">
            <center>
              <h6 style={{ color: 'red', fontFamily: 'Times New Roman', fontSize: '20px' }}>
                AN EASY WAY TO MANAGE <br />
                YOUR TAX
              </h6>
            </center>
            <br />
            <img Alt="" className="img-fluid br-3" src={require('./work_together.svg')} />
          </Col>
          <Col md="4">
            <form onSubmit={(e) => onSubmit1(e)}>
              <div className="form-style-8">
                <div className="form-control form-control-sm sam">
                  <Icon icon={user} />
                  <input
                    className="input"
                    name="taxPayerId"
                    type="text"
                    value={taxPayerId}
                    placeholder="Tax ID"
                    autoComplete="off"
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <br />
                <div className="form-control form-control-sm sam">
                  <Icon icon={eye} />
                  <input
                    className="input"
                    placeholder="Password"
                    type="password"
                    name="passwordLogin"
                    value={passwordLogin}
                    autoComplete="off"
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <br />
                <center>
                  <button className="btn btn-primary">Login</button>{' '}
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                    Register
                  </button>
                </center>
              </div>
            </form>
          </Col>
          ;
        </Row>
      </div>

      <div
        class="modal fade"
        id="exampleModalLong"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            {auth && auth.taxid ? (
              <div class="modal-header text-center">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  You have Successfully Registered, your Tax ID is {auth.taxid.PaytaxId}
                  <br />
                  Login with your Tax ID and Password to continue to your Dashboard.
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
            ) : (
              <div>
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Register and take control of your tax payment
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div class="modal-body">
                    <div className="form-group">
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="radio"
                            class="form-check-input"
                            onChange={(e) => onChange(e)}
                            name="company"
                            value="false"
                          />
                          Individual
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input
                            type="radio"
                            class="form-check-input"
                            onChange={(e) => onChange(e)}
                            name="company"
                            value="true"
                          />
                          Company
                        </label>
                      </div>
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={(e) => onChange(e)}
                        placeholder="Full Name"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <textarea
                        name="address"
                        class="form-control"
                        value={address}
                        onChange={(e) => onChange(e)}
                        cols="30"
                        rows="3"
                        placeholder="Address"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="number"
                        className="form-control"
                        name="phone"
                        value={phone}
                        onChange={(e) => onChange(e)}
                        placeholder="Phone no"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="number"
                        className="form-control"
                        name="bvn"
                        value={bvn}
                        onChange={(e) => onChange(e)}
                        placeholder="BVN"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}
                        className="form-control"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        name="confirmPassword"
                        onChange={(e) => onChange(e)}
                        className="form-control"
                        placeholder="Confirm Password"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        name="state"
                        value={state}
                        onChange={(e) => onChange(e)}
                        className="form-control"
                        placeholder="State"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        name="city"
                        value={city}
                        onChange={(e) => onChange(e)}
                        className="form-control"
                        placeholder="City"
                        required
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                      Close
                    </button>
                    <button type="submit" class="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

LandingPage.protoTypes = {
  signup: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { signup, login })(LandingPage);
