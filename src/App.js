import React, {useState} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import sessionStorageCustom from './lib/sessionStorageCustom';
import RestrictRoute from './component/RestrictRoute';

import Exist from './page/Exist';
import UserLogin from './page/UserLogin';
import AdminLogin from './page/AdminLogin';

import Main from './page/Main';
import Join from './page/Join';
import Admin from './page/Admin';


export const GlobalStateContext = React.createContext(null);

function App() {

  const [loginState, setLoginState] = useState(Boolean(sessionStorageCustom.getJsonItem('user')));
  const [adminState, setAdminState] = useState(Boolean(sessionStorageCustom.getJsonItem('admin')));

  return (
    <div className="App">
      <GlobalStateContext.Provider value={{ loginState, setLoginState , adminState, setAdminState }}>
        <Switch>
          <Route exact path="/" component={Exist} />

          <Route exact path="/user_login" component={UserLogin} />
          <Route exact path="/admin_login" component={AdminLogin} />

          <RestrictRoute exact path="/join" component={Join} fallback={() => <Redirect to={`/`} />} isAllow={!(loginState || adminState)}/>

          <RestrictRoute exact path="/main" component={Main} fallback={() => <Redirect to={`/`} />} isAllow={!loginState}/>
          <RestrictRoute exact path="/admin" component={Admin} fallback={() => <Redirect to={`/`} />} isAllow={adminState}/>

        </Switch>
      </GlobalStateContext.Provider>
    </div>
  );
}

export default App;
