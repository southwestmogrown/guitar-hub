import React, { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from "react-redux";

import SignupFormPage from "./components/SignupFormPage";
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import UserHomePage from "./components/UserHomePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route path='/homepage'>
            <UserHomePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
