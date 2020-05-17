import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import formStyle from './formStyles';
// action
import alertAction from '../../actions/alert';
import { auth } from '../../actions/auth';

const AuthForm = ({ isAuth, authUser }) => {
  const formClass = formStyle();

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

    authUser(email, password);
  };

  return (
    <>
      { isAuth && <Redirect to="/dashboard" />}

      {!isAuth && (
      <form noValidate className={formClass.root} onSubmit={handleSubmit}>
        <TextField id="email" label="Enter your email" type="email" name="email" onChange={handleChange} />
        <TextField id="password1" label="Enter your password" type="password" name="password" onChange={handleChange} />
        <Button type="submit" className={formClass.submitBtn} variant="outlined">Submit</Button>
      </form>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setAlert(msg, alertType) {
    dispatch(alertAction(msg, alertType));
  },

  authUser(email, password) {
    dispatch(auth(email, password));
  },
});

const mapStateToProps = (store) => ({
  isAuth: store.userAuth.isAuth,
});

AuthForm.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  authUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
