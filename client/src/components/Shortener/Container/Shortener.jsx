import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ShortenerP from '../Presentation/ShortenerP';
import alert from '../../../actions/alert';
import shortURL from '../../../actions/shortURL';


const Shortener = ({ shortUserURL }) => {
  const [fullURLInputData, setfullURLInputData] = useState({
    fullURL: '',
  });

  const handleChange = (event) => {
    setfullURLInputData({ ...fullURLInputData, fullURL: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    shortUserURL(fullURLInputData.fullURL);
  };
  return (
    <>
      <ShortenerP onChange={handleChange} onSubmit={handleSubmit} />
    </>

  );
};

const mapDispatchToProps = (dispatch) => ({

  shortUserURL(fullURL) {
    dispatch(shortURL(fullURL));
  },
});

export default connect(null, mapDispatchToProps)(Shortener);
