import React, { useState } from 'react';
import {
  Modal, Grid, TextField, Button,
} from '@material-ui/core';
import { connect } from 'react-redux';
import modalStyles from './ModalStyles';
import addDesc from '../../actions/addDesc';
import addTag from '../../actions/addTag';

const SimpleModal = ({ setDesc, addTag }) => {
  const classes = modalStyles();

  const [open, setOpen] = useState(false);
  const [shortenURL, setShortenURL] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');


  const handleOpen = (event) => {
    const shortLink = event.target
      .parentElement.parentElement
      .parentElement.previousElementSibling
      .querySelector('#shortenURL').textContent;

    setShortenURL(shortLink);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitDesc = (event) => {
    event.preventDefault();
    setDesc(shortenURL, description);
  };

  const handleSubmitTag = (event) => {
    event.preventDefault();
    addTag(shortenURL, tag);
  };

  const handleChangeDesc = (event) => {
    const descText = event.target.value;
    setDescription(descText);
  };

  const handleChangeTag = (event) => {
    const tagText = event.target.value;
    setTag(tagText);
  };

  const body = (
    <div className={classes.paper} >
      <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmitDesc}>
        <Grid container>

          <Grid container item spacing={2} alignItems="center" xs={12}>
            <Grid item xs={11}>
              <TextField
                className={classes.textField}
                id="linkDescription"
                label="Add description for your URL"
                fullWidth
                multiline
                onChange={handleChangeDesc}
              />
            </Grid>
            <Grid item xs={1}>
              <Button type="submit" className={classes.formBtn}>Add</Button>
            </Grid>
          </Grid>
        </Grid>
      </form>

      <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmitTag}>
        <Grid container item spacing={2} alignItems="center" xs={12}>
          <Grid item xs={11}>
            <TextField
              className={classes.textField}
              id="linkTag"
              label="Add tag for your URL"
              fullWidth
              multiline
              onChange={handleChangeTag}
            />
          </Grid>
          <Grid item xs={1}>
            <Button type="submit" className={classes.formBtn}>Add</Button>
          </Grid>
        </Grid>


      </form>
    </div>
  );

  return (
    <div className={classes.button}>
      <Button type="button" onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

const mapDisatchToProps = (dispatch) => ({
  setDesc(shortenURL, description) {
    dispatch(addDesc(shortenURL, description));
  },
  addTag(shortenURL, tag) {
    dispatch(addTag(shortenURL, tag));
  },

});

export default connect(null, mapDisatchToProps)(SimpleModal);
