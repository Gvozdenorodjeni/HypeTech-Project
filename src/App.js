import React, { useState } from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import SignIn from "./Pages/Login/Login";
import Users from "./Pages/UsersPage/Users";
import SingleUserPage from "./Pages/SingleUserPage/SingleUserPage";
import CreateAndEditUserPage from "./Pages/CreateAndEditUserPage/CreateAndEditUserPage";
import SearchAppBar from "./components/Navbar/Navbar";

export const usersContext = React.createContext({});
export const adminContext = React.createContext({});

function App() {
  const [admin, setAdmin] = useState({
    registered: localStorage.getItem("email"),
    current: localStorage.getItem("email"), // TODO
  });
  const [users, setUsers] = useState({
    data: [],
    loading: false,
    loaded: false,
  });
  const { Provider: AdminProvider } = adminContext;
  const { Provider: UsersProvider } = usersContext;

  return (
    <div className="App">
      <AdminProvider value={{ admin, setAdmin }}>
        <UsersProvider value={{ users, setUsers }}>
          <SearchAppBar adminLoggedIn={admin.current} />
          <Switch>
            {admin.current && (
              <Route
                exact
                path="/users/create"
                component={CreateAndEditUserPage}
              />
            )}
            {admin.current && (
              <Route
                exact
                path="/users/:id/edit"
                component={CreateAndEditUserPage}
              />
            )}
            {admin.current && (
              <Route exact path="/users/:id" component={SingleUserPage} />
            )}
            {admin.current && <Route exact path="/users" component={Users} />}
            <Route exact path="/" component={SignIn} />
            <Route path="/" render={() => <Redirect to="/" />} />
          </Switch>
        </UsersProvider>
      </AdminProvider>
    </div>
  );
}

export default App;
