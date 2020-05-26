import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import routes from '../../config/routes'
import getToken from '../../auth/token'

const PublicRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => !getToken ? <Component {...props} /> : <Redirect to={{ pathname: routes.root }} />}
  />
  // <Route
  //   {...rest}
  //   render={props => (
  //     <Layout>
  //       <Component {...props} />
  //     </Layout>
  //   )}
  // />
);

export default PublicRoute;
