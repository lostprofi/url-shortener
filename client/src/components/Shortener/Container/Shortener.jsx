import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ShortenerP from '../Presentation/ShortenerP';
import shortURL from '../../../actions/shortURL';
import ShortListP from '../Presentation/ShortListP';


const Shortener = ({ shortUserURL, URLDataArrObj }) => {
  const [fullURLInputData, setfullURLInputData] = useState({
    fullURL: '',
  });

  const func = () => {
    sessionStorage.setItem('links', JSON.stringify(URLDataArrObj));
  };

  useEffect(() => {
    return func()});

  // const id = uuidv4();

  const handleChange = (event) => {
    setfullURLInputData({ ...fullURLInputData, fullURL: event.target.value });
  };

  const handleSubmit = async (event) => {
<<<<<<< HEAD
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
=======
    const eventTarget = event;

    eventTarget.preventDefault();

    shortUserURL(fullURLInputData.fullURL);

    eventTarget.target.parentElement.querySelector('input').value = '';
>>>>>>> f770d10fb1dc34b79ffb93bec9719d7e08c23130
  };

  return (
    <>
      <ShortenerP onChange={handleChange} onSubmit={handleSubmit} />
      {URLDataArrObj.map((obj) => (
        <ShortListP
          key={uuidv4()}
          fullURL={obj.fullURL}
          shortenURL={obj.shortenURL}
        />
      ))}
    </>

  );
};

const mapDispatchToProps = (dispatch) => ({

  shortUserURL(fullURL) {
    dispatch(shortURL(fullURL));
  },
});

const mapStateToProps = (store) => ({
  URLDataArrObj: store.URLDataArrObj,
});


export default connect(mapStateToProps, mapDispatchToProps)(Shortener);
