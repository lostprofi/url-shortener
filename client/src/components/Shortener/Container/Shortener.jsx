import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ShortenerP from '../Presentation/ShortenerP';


const Shortener = () => {
  const [fullURL, setFullURL] = useState({
    fullURL: '',
  });

  const handleChange = (event) => {
    setFullURL({ ...fullURL, fullURL: event.target.value });
  };

  return (
    <>
      <ShortenerP onChange={handleChange} />
    </>

  );
};



export default Shortener;
