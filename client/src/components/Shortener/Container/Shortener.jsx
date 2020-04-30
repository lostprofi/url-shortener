import React, { useState } from 'react';
import ShortenerP from '../Presentation/ShortenerP';

const Shortener = () => {
  const [fullURL, setFullURL] = useState({
    fullURL: '',
  });

  const handleChange = (event) => {
    setFullURL({ ...fullURL, fullURL: event.target.value });
    console.log(fullURL);
  };

  const handleSubmit = (event) => {
      event.preventDefault();

      //action

  }

  return <ShortenerP onChange={ handleChange } />;
};

export default Shortener;
