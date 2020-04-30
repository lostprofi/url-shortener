import React from 'react';
import {
  Grid, AppBar, Button, Toolbar,
} from '@material-ui/core';
import 'typeface-roboto';
import { Route, Link } from 'react-router-dom';
import { toolBarStyles } from './AppStyles';
import RegForm from './components/Forms/RegForm';
import AuthForm from './components/Forms/AuthForm';
import Alerts from './components/Alert/Alert';
import Shortener from './components/Shortener/Container/Shortener';

function App() {
  const toolBarClass = toolBarStyles();

  return (

    <Grid container spacing={2} justify="center">
      <Alerts />
      <AppBar position="static" color="transparent">
        <Toolbar className={toolBarClass.root}>
          <Button component={Link} to="/auth">
            Sign In
          </Button>
          <Button component={Link} to="/registration">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      <Grid item container xs={8}>
        <Route path="/registration">
          <RegForm />
        </Route>
        <Route path="/auth">
          <AuthForm />
        </Route>
        <Route exact path="/">
          <Shortener />
        </Route>
      </Grid>
    </Grid>

  );
}

export default App;
