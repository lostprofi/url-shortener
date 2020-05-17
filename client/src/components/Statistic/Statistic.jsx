import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Grid, Link, Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import stat from '../../actions/statistic';
import styles from './StatisticStyles';

const Statistic = ({ getDataForStat, dataForStat, clear }) => {
  useEffect(() => {
    getDataForStat();
    return clear();
  }, []);

  const classes = styles();

  const getAllTrans = () => {
    const arrOfNumTrans = dataForStat.map((el) => el.numOfTrans);
    if (arrOfNumTrans[0] !== undefined) {
      const allTrans = arrOfNumTrans.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
      );
      return allTrans;
    }
  };

  getAllTrans();

  return (
    <Grid container item xs={12}>

      <Grid item xs={12}>
        <Typography className={classes.title}>
          Stat for your shorten URL&apos;s
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.title}>

          {`Total number of transitions on links: ${getAllTrans()}`}
        </Typography>
      </Grid>
      <Grid item container className={classes.linksContainer} xs={12}>
        {
        dataForStat.map((el) => (
          <Grid item container xs={12} className={classes.linkItem}>
            <Grid item container alignItems="center" xs={12}>
              <Link key={uuidv4()} id="shortenURL" href={el.shortenURL} target="blank">
                <Typography>
                  {el.shortenURL}
                </Typography>
              </Link>

            </Grid>
            <Grid item xs={12}>
              <Typography>{`Number of transitions: ${el.numOfTrans}`}</Typography>
            </Grid>
          </Grid>

        ))
}
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getDataForStat() {
    dispatch(stat());
  },

  clear() {
    dispatch({
      type: 'CLEAR_DATA_FOR_STAT',
    });
  },
});

const mapStateToProps = (store) => ({
  dataForStat: store.dataForStat,
});

Statistic.propTypes = {
  getDataForStat: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  dataForStat: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistic);
