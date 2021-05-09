import React, { useState } from "react";
import "./App.css";
import SignIn from "./Pages/Login/Login";
import { Redirect, Route, Switch } from "react-router-dom";
import Users from "./Pages/UsersPage/Users";
import SingleUserPage from "./Pages/SingleUserPage/SingleUserPage";
import CreateAndEditUser from "./Pages/CreateAndEditUser/CreateAndEditUser";

export const usersContext = React.createContext({});

function App() {
  const [users, setUsers] = useState({
    data: [],
    loading: false,
    loaded: false,
  });
  const { Provider: UsersProvider } = usersContext;

  return (
    <div className="App">
      <UsersProvider value={{ users, setUsers }}>
        <Switch>
          <Route exact path="/users/create" component={CreateAndEditUser} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/:id" component={SingleUserPage} />
          <Route exact path="/users/:id/edit" component={CreateAndEditUser} />

          <Route exact path="/" component={SignIn} />
          <Route path="/" render={() => <Redirect to="/" />} />
        </Switch>
      </UsersProvider>
    </div>
  );
}

export default App;
