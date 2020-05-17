import React from 'react';
import {
  Button, TextField, Grid, Link, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import ShortListStyles from './ShortListStyles';
import SimpleModal from '../../Modal/Modal';

const ShortList = ({
  fullURL, shortenURL, onClickCopy, description, tags, onTagClick,
}) => {
  const classes = ShortListStyles();

  return (
    <Grid container item className={classes.root} xs={12}>
      <Grid item xs={7}>
        <TextField value={fullURL} fullWidth type="string" multiline />
      </Grid>
      <Grid item xs={3}>
        <Link id="shortenURL" href={shortenURL} target="blank">{shortenURL}</Link>
      </Grid>
      <Grid item xs={2}>
        <SimpleModal />
        <Button onClick={onClickCopy}>Copy</Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption">{description}</Typography>
      </Grid>
      <Grid item xs={12}>
        {
        tags.map((el) => (
          <Button key={uuidv4()} id="tag" onClick={onTagClick}>
            {el}
          </Button>
        ))
      }
      </Grid>
    </Grid>
  );
};

ShortList.propTypes = {
  fullURL: PropTypes.string.isRequired,
  shortenURL: PropTypes.string.isRequired,
  onClickCopy: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf.isRequired,
  onTagClick: PropTypes.func.isRequired,
};

export default ShortList;
