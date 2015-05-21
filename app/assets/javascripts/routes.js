import React from 'react';
import Router from 'react-router';
import RtTrainer from 'components/RtTrainer';

const { DefaultRoute, Route } = Router;

const routes = (
  <Route handler={ RtTrainer } path="/">
  </Route>
);

export default routes;
