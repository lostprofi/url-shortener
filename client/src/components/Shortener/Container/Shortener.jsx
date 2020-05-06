import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import axios from 'axios';
import { connect } from 'react-redux';
import ShortenerP from '../Presentation/ShortenerP';
import alert from '../../../actions/alert';


const Shortener = ({ setAlert }) => {
  const [fullURLInputData, setfullURLInputData] = useState({
    fullURL: '',
  });

  const handleChange = (event) => {
    setfullURLInputData({ ...fullURLInputData, fullURL: event.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const body = {
        fullURL: fullURLInputData.fullURL,
      };

      const config = {
        headers: {
          'Content-type': 'application/json',
          'x-auth-token': Cookies.get('userToken'),
        },
      };

      const res = await axios.post('/shortener', body, config);
      setAlert('URL successefully shortened', 'success');

    } catch (err) {
      const { errors } = err.response.data;

      errors.forEach((el) => setAlert(el.msg, 'error'));
    }
  };

  return (
    <>
      <ShortenerP onChange={handleChange} onSubmit={handleSubmit} />
    </>

  );
};

const mapDispatchToProps = (dispatch) => ({
  setAlert(msg, type) {
    dispatch(alert(msg, type));
  },
});

export default connect(null, mapDispatchToProps)(Shortener);
