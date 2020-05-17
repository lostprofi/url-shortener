import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import formStyle from './formStyles';
import regAction from '../../actions/registration';
import alertAction from '../../actions/alert';

const RegForm = ({ setAlert, regUser }) => {
  const formClass = formStyle();
  const history = useHistory();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name } = formData;
    const { email } = formData;
    const { password1 } = formData;
    const { password2 } = formData;

    if (password1 !== password2) {
      setAlert('Entered passwords do not match', 'error');
    } else {
      regUser(name, email, password1);
      history.push('/auth');
    }
  };

  return (
    <form noValidate autoComplete="off" className={formClass.root} onSubmit={handleSubmit}>
      <TextField id="name" label="Enter your name" type="text" name="name" onChange={handleChange} />
      <TextField id="email" label="Enter your email" type="email" name="email" onChange={handleChange} />
      <TextField id="password1" label="Enter your password" type="password" name="password1" onChange={handleChange} />
      <TextField id="password2" label="Please confirm password" type="password" name="password2" onChange={handleChange} />
      <Button type="submit" className={formClass.submitBtn} variant="outlined">Submit</Button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  regUser(name, email, password) {
    dispatch(regAction(name, email, password));
  },
  setAlert(msg, alertType) {
    dispatch(alertAction(msg, alertType));
  },

});

RegForm.propTypes = {
  regUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(RegForm);
