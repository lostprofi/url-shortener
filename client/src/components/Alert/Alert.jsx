import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Alert } from '@material-ui/lab';
import alertStyles from './alertStyles';

const Alerts = ({ alerts }) => {
  const alertClasses = alertStyles();

  return (
    alerts.map((alert) => (
      <Alert
        className={alertClasses.root}
        key={alert.id}
        severity={alert.alertType}
      >
        {alert.msg}
      </Alert>
    ))
  );
};

const mapStateToProps = (store) => ({
  alerts: store.alerts,
});

Alerts.PropTypes = {
  alerts: PropTypes.arrayOf,
};

export default connect(mapStateToProps, null)(Alerts);
