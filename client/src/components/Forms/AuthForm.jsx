import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import formStyle from './formStyles';
// action
import alertAction from '../../actions/alert';
import { authn } from '../../actions/auth';

const AuthForm = (props) => {
  const formClass = formStyle();
  const prop = props;

  const { isAuthorizated } = prop.auth;
  const { userLoaded } = prop.auth;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email } = formData;
    const { password } = formData;

    prop.authnUser(email, password);
  };

  if (isAuthorizated && userLoaded) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <form noValidate className={formClass.root} onSubmit={handleSubmit}>
      <TextField id="email" label="Enter your email" type="email" name="email" onChange={handleChange} />
      <TextField id="password1" label="Enter your password" type="password" name="password" onChange={handleChange} />
      <Button type="submit" className={formClass.submitBtn} variant="outlined">Submit</Button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setAlert(msg, alertType) {
    dispatch(alertAction(msg, alertType));
  },

  authnUser(email, password) {
    dispatch(authn(email, password));
  },


});

const mapStateToProps = (store) => ({
  auth: store.auth,
});


export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
