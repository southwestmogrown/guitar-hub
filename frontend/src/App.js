import React, { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import SignupFormPage from "./components/SignupFormPage";
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';

// import UserHomePage from "./components/UserHomePage";
import UsersInfo from './components/UsersInfo'; 
import HomePage from "./components/HomePage";
import './index.css'
// import * as userActions from './store/users'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])

  if(user) {
    return isLoaded && (
      <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route path='/signup'>
              <SignupFormPage />
            </Route>
            <Route path={`/users/${user.id}`}>
              <UsersInfo />    
            </Route>
          </Switch>
        )}
        <HomePage />
      </>
    );
  } else {
    return isLoaded && (
      <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route path='/signup'>
              <SignupFormPage />
            </Route>
          </Switch>
        )}
        <HomePage />
      </>
    );
  }
  

}

export default App;
