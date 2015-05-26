import React from 'react';
import Router from 'react-router';
import RtTrainer from 'components/RtTrainer';
import Dashboard from 'components/Dashboard';
import Trainer from 'components/Trainer';
import AuthUtils from 'utils/AuthUtils';

const { DefaultRoute, Route } = Router;

const routes = (
  <Route name="root" path="/" handler={ RtTrainer }>
    <DefaultRoute name="dashboard" handler={ Dashboard }/>
    <Route name="trainer" handler={ Trainer }/>
  </Route>
);

export default routes;
