import React from 'react';
import {
  Button, TextField, Grid, Link,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ShortListStyles from './ShortListStyles';


const ShortList = ({ fullURL, shortenURL, onShortClick, onCopyShortURL }) => {
  const classes = ShortListStyles();


  return (
    <Grid container item className={classes.root} xs={12}>
      <Grid item xs={7}>
        <TextField value={fullURL} fullWidth type="string" multiline />
      </Grid>
      <Grid item xs={3}>
        <Link id="shortenURL" href={shortenURL} /*onClick={onShortClick}*/>{shortenURL}</Link>
      </Grid>
      <Grid item xs={2}>
        <Button onClick = {onCopyShortURL}>Copy</Button>
      </Grid>
    </Grid>
  );
};

ShortList.propTypes = {
  fullURL: PropTypes.string.isRequired,
  shortenURL: PropTypes.string.isRequired,
  onShortClick: PropTypes.func.isRequired,
  onCopyShortURL: PropTypes.func.isRequired,
};

export default ShortList;
