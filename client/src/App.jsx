import React, { useEffect } from 'react';
import {
  Grid, AppBar, Button, Toolbar,
} from '@material-ui/core';
import 'typeface-roboto';
import { Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toolBarStyles } from './AppStyles';
import RegForm from './components/Forms/RegForm';
import AuthForm from './components/Forms/AuthForm';
import Alerts from './components/Alert/Alert';
import { signOut as signOutAction } from './actions/auth';


function App({ signOut, isAuthorized }) {
  const toolBarClass = toolBarStyles();

  const handleSignOut = () => {
    signOut();
  };

  return (

    <Grid container spacing={2} justify="center">
      <Alerts />
      <AppBar position="static" color="transparent">
        <Toolbar className={toolBarClass.root}>
          {!isAuthorized
          && (
          <Button component={Link} to="/auth">
            Sign In
          </Button>
          )}
          {!isAuthorized
          && (
          <Button component={Link} to="/registration">
            Sign Up
          </Button>
          )}
          {isAuthorized
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
        {isAuthorized ? (
          <Route path="/dashboard" />
        ) : <Redirect to="auth" /> }
      </Grid>
    </Grid>

  );
}

const mapStateToProps = (store) => ({
  isAuthorized: store.auth.isAuthorizated,
});

const mapDispatchToProps = (dispatch) => ({
  signOut() {
    dispatch(signOutAction());
  },
});

App.propTypes = {
  signOut: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
