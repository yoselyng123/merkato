import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CarritoPage from "./pages/CarritoPage";
import Home from "./pages/Home/Home";
function Routes() {
  return (
    <Switch>
      <Route exact path="/carrito" component={CarritoPage}></Route>
      <Route exact path="/" component={Home}></Route>
    </Switch>
  );
}

export default Routes;
