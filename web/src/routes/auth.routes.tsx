import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import DeletingOrphanageCheck from '../pages/DeletingOrphanageCheck';
import Dashboard from '../pages/Dashboard';
import Landing from "../pages/Landing";
import OrphanagesMap from "../pages/OrphanagesMap";
import Orphanage from "../pages/Orphanage";
import CreateOrphanage from "../pages/CreateOrphanage";
import Login from "../pages/Login";

function AuthRoutes() {
  return (
    <BrowserRouter>
      <Switch>
      <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanages/create" exact component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
        <Route path="/dashboard/deleting-check/:id" component={DeletingOrphanageCheck}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default AuthRoutes;
