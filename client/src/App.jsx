import React from 'react';
import {
  Grid, AppBar, Button, Toolbar,
} from '@material-ui/core';
import 'typeface-roboto';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toolBarStyles } from './AppStyles';
import RegForm from './components/Forms/RegForm';
import AuthForm from './components/Forms/AuthForm';
import Alerts from './components/Alert/Alert';
import { signOut as signOutAction } from './actions/auth';
import Shortener from './components/Shortener/Container/Shortener';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


function App({ signOut, isAuth }) {
  const toolBarClass = toolBarStyles();

  const handleSignOut = () => {
    signOut();
  };

  const userToken = Cookies.get('userToken');

  console.log(userToken);


  return (

    <Grid container spacing={2} justify="center">
      <Alerts />
      <AppBar position="static" color="transparent">
        <Toolbar className={toolBarClass.root}>
          {!isAuth
          && (
          <Button component={Link} to="/auth">
            Sign In
          </Button>
          )}
          {!isAuth
          && (
          <Button component={Link} to="/registration">
            Sign Up
          </Button>
          )}
          {isAuth
          && (
          <Button component={Link} to="/auth" onClick={handleSignOut}>
            Sign Out
          </Button>
          )}
        </Toolbar>
      </AppBar>
      <Grid item container xs={8}>
        <Route path="/registration">
          <RegForm />
        </Route>
        <Route path="/auth">
          <AuthForm />
        </Route>
        <PrivateRoute path="/dashboard" component={Shortener} />
      </Grid>
    </Grid>

  );
}

const mapDispatchToProps = (dispatch) => ({
  signOut() {
    dispatch(signOutAction());
  },
});

const mapStateToProps = (store) => ({
  isAuth: store.userAuth.isAuth,
});

App.propTypes = {
  signOut: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
