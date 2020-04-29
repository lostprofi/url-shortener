import React from 'react';
import { connect } from 'react-redux';

import { Alert } from '@material-ui/lab';
import alertStyles from './alertStyles';

const Alerts = (props) => {
  const prop = props;

  const alertClasses = alertStyles();

  return (
    prop.alerts.map((alert) => <Alert className={alertClasses.root} key={alert.id} severity={alert.alertType}>{alert.msg}</Alert>)
  );
};

const mapStateToProps = (store) => ({
  alerts: store.alerts,
});

export default connect(mapStateToProps, null)(Alerts);
