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
  }, []);

  const handleChange = (event) => {
    setfullURLInputData({ ...fullURLInputData, fullURL: event.target.value });
  };

  const handleSubmit = async (event) => {
    const eventTarget = event;

    eventTarget.preventDefault();

    shortUserURL(fullURLInputData.fullURL);

    eventTarget.target.parentElement.querySelector('input').value = '';
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
