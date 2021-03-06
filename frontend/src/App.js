import React, { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import Navigation from './components/Navigation';
import * as sessionActions from './store/session';

import HomePage from "./components/HomePage";
import './index.css'
import UserHomePage from "./components/UserHomePage";
import SignUpFormModal from './components/SignUpFormModal'

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
        <div className='content-body'>
          <Navigation isLoaded={isLoaded} />
          {isLoaded && (
            <Switch>
              <Route path='/signup'>
                <SignUpFormModal />
              </Route>
              <Route path={`/users/${user.id}`}>
                <UserHomePage />   
              </Route>
            </Switch>
          )}
        </div>
      </>

    );
  } else {
    return isLoaded && (
      <>
        <div className='content-body'>
          <Navigation isLoaded={isLoaded} />
          {isLoaded && (
            <Switch>
              <Route path='/signup'>
                <SignUpFormModal />
              </Route>
            </Switch>
          )}
          <HomePage />
        </div>
      </>
    );
  }
  

}

export default App;
