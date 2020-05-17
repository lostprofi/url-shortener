import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  Grid, Link, Typography, Button,
} from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './SeacrhByTagStyles';
import { resetSearchByTag } from '../../actions/resetPage';

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchByTagRes = ({ findLinksArr, clear, resetPage }) => {
  const history = useHistory();
  const query = useQuery();
  const tagName = query.get('tagName');

  window.onpopstate = () => {
    history.replace('/dashboard');
    clear();
  };

  useEffect(() => {
    resetPage();
  }, []);

  const classes = styles();

  const handleClickCopy = async (event) => {
    const copyData = event.target.parentElement.parentElement.previousElementSibling.querySelector('#shortenURL');
    await navigator.clipboard.writeText(copyData);
  };

  return (
    <Grid container item xs={12}>

      <Grid item xs={12}>
        <Typography className={classes.title}>
          Find links with tag name:
          <span>{`${tagName}`}</span>
        </Typography>
      </Grid>
      <Grid container className={classes.linksContainer} xs={12}>
        {
          findLinksArr.map((arr) => arr.map((el) => (

            el !== null && (
              <Grid item container xs={7} className={classes.linkItem}>
                <Grid item container alignItems="center" xs={10}>
                  <Link key={uuidv4()} id="shortenURL" href={el} target="blank">
                    <Typography>
                      {el}
                    </Typography>
                  </Link>
                </Grid>
                <Grid item xs={2}>
                  <Button type="button" onClick={handleClickCopy}>Copy</Button>
                </Grid>

              </Grid>
            )

          )))
        }
      </Grid>


    </Grid>
  );
};

const mapStateToProps = (store) => ({
  findLinksArr: store.searchedLinksBytag,
});

const mapDispatchToProps = (dispatch) => ({
  clear() {
    dispatch({
      type: 'CLEAR_SEARCH_TAG_URL',
    });
  },

  resetPage() {
    dispatch(resetSearchByTag());
  },

});

SearchByTagRes.propTypes = {
  findLinksArr: PropTypes.arrayOf.isRequired,
  clear: PropTypes.func.isRequired,
  resetPage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchByTagRes);
