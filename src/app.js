import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Provider } from 'react-redux';
import store from './store';

import 'react-toastify/dist/ReactToastify.min.css';
import LandingPage from './LandingPage/LandingPage';
import Dashboard from './Dashboard/Index';
import Alert from './Alert/Alert';
import Success from './LandingPage/Success';
import { loadUser } from './actions/auth';
import setAuthToken from './Utils/setAuthToken';
import PrivateRoute from './routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router forceRefresh={true}>
        <Fragment>
          <ToastContainer
            position="top-right"
            autoClose={100}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
          <ToastContainer />
          <Alert />
          <div className="App">
            <Switch>
              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <Route path="/success" exact component={Success} />
              <Route path="/" exact component={LandingPage} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
