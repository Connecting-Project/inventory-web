import React, {useState} from 'react';
import {Switch, Redirect} from 'react-router-dom';

import sessionStorageCustom from './lib/sessionStorageCustom';
import RestrictRoute from './component/RestrictRoute';

import Login from './page/Login';
import Main from './page/Main';
import Join from './page/Join';
import Admin from './page/Admin';


export const GlobalStateContext = React.createContext(null);

function App() {

  const [loginState, setLoginState] = useState(Boolean(sessionStorageCustom.getJsonItem('user')));


  return (
    <div className="App">
      <GlobalStateContext.Provider value={{ loginState, setLoginState }}>
        <Switch>
          <RestrictRoute exact path="/" component={Login} fallback={() => <Redirect to={`/main`} />} isAllow={!loginState} />
          <RestrictRoute exact path="/main" component={Main} fallback={() => <Redirect to={`/main`} />} isAllow={!loginState} />
          <RestrictRoute exact path="/join" component={Join} fallback={() => <Redirect to={`/main`} />} isAllow={!loginState} />
          <RestrictRoute exact path="/admin" component={Admin} fallback={() => <Redirect to={`/main`} />} isAllow={!loginState} />

        </Switch>
      </GlobalStateContext.Provider>
    </div>
  );
}

export default App;
