import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Currency from "./components/Currency";
import Data from "./components/Data";
import PriceData from "./components/PriceData";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Data />} />
          <Route exact path="/prices" render={() => <PriceData />} />
          <Route exact path="/currencies" render={() => <Currency />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
