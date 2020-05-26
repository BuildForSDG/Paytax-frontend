import React from 'react';
import { Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, NavbarText, Nav, Container } from 'reactstrap';
import './index.css';
import { Icon } from 'react-icons-kit';
import { eye } from 'react-icons-kit/fa/eye';
import { user } from 'react-icons-kit/icomoon/user';
import SideNavBar from '../SideNavBar';

export default class LandingPage extends React.Component {
  state = {
    tax_id: '',
    password: '',
    landing_page: []
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(
      (prevState) => ({
        landing_page: prevState.landing_page.concat({
          tax_id: this.state.tax_id,
          password: this.state.password
        })
      }),
      console.log(this.state.tax_id, this.state.password)
    );
  };

  render() {
    return (
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
          <img className="img-fluid br-3" src={require('./work_together.svg')} />
        </Col>
        <Col md="4">
          <form onSubmit={this.handleSubmit}>
            <div className="form-style-8">
              <div className="form-control form-control-sm sam">
                <Icon icon={user} />
                <input
                  className="input"
                  name="tax_id"
                  type="text"
                  value={this.state.tax_id}
                  onChange={this.handleChange}
                  placeholder="Tax ID"
                  autoComplete="off"
                />
              </div>
              <br />
              <div className="form-control form-control-sm sam">
                <Icon icon={eye} />
                <input
                  className="input"
                  placeholder="Password"
                  type="password"
                  name="password"
                  autoComplete="off"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <br />
              <center>
                <button className="btn btn-primary">Login</button>{' '}
                <button className="btn btn-primary" type="reset">
                  Register
                </button>
              </center>
            </div>
          </form>
        </Col>
        ;</Row>
      </div>
    );
  }
}
