import React, { createContext, useState } from "react";
import './App.css';
import Header from './components/Header/Header';
import Shop from "./components/Shop/Shop";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import Not from "./components/NotFound/Not";
import Detail from "./components/Detail/Detail";
import Shipment from "./components/Shipment/Shipment";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const userContext = createContext();

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <h2>email:{loggedInUser.email}</h2>
     
      <Router>
      <Header></Header>
        <Switch>
          <Route path='/shop'>
          <Shop></Shop>
          </Route>
          <Route path='/review'>
            <Review></Review>
          </Route>
          <PrivateRoute path= '/manage'>
            <Inventory></Inventory>
          </PrivateRoute>
          <Route exact path =  '/'>
            <Shop></Shop>
          </Route>
          <Route path='/product/:productKey'>
            <Detail></Detail>
          </Route>
          <PrivateRoute path='/shipment'>
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route path='*'>
            <Not></Not>
          </Route>
        </Switch>
      </Router>
     
     
    </userContext.Provider>
  );
}

export default App;
