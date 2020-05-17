import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userToken = Cookies.get('userToken');

  return (
    <Route
      {...rest}
      render={
        (routeProps) => (userToken
          ? <Component {...routeProps} />
          : <Redirect to="/" />)
}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.isRequired,
};
export default PrivateRoute;
