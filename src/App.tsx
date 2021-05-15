import React, { useState } from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import SignIn from "./Pages/Login/Login";
import Users from "./Pages/UsersPage/Users";
import SingleUserPage from "./Pages/SingleUserPage/SingleUserPage";
import CreateAndEditUserPage from "./Pages/CreateAndEditUserPage/CreateAndEditUserPage";
import SearchAppBar from "./components/Navbar/Navbar";
import { createMuiTheme, MuiThemeProvider, Theme } from "@material-ui/core";
import { PaletteType } from "@material-ui/core";
import { AdminContextType, UserContextType } from "./models/app.model";

export const usersContext = React.createContext<UserContextType | {}>({});
export const adminContext = React.createContext<AdminContextType | {}>({});
export const themeContext = React.createContext<Theme | {}>({});

function App() {
  const [admin, setAdmin] = useState({
    registered: localStorage.getItem("email"),
    current: null,
  });

  const [users, setUsers] = useState({
    data: [],
    loading: false,
    loaded: false,
  });
  const [theme, setTheme] = useState(
    createMuiTheme({
      palette: {
        type: "light",
      },
    })
  );
  const { Provider: AdminProvider } = adminContext;
  const { Provider: UsersProvider } = usersContext;
  const { Provider: ThemeProvider } = themeContext;

  const logout = () => {
    setAdmin({
      registered: admin.registered,
      current: null,
    });
  };

  const toggleDarkTheme = () => {
    let newPaletteType = theme.palette?.type === "light" ? "dark" : "light";
    setTheme({
      palette: {
        type: newPaletteType as PaletteType,
      },
    } as any);
  };

  const muiTheme = createMuiTheme(theme);

  return (
    <div
      className="App"
      style={{
        background: theme.palette?.type === "dark" ? "#303030" : "#FAFAFA",
      }}
    >
      <ThemeProvider value={{ theme, setTheme }}>
        <AdminProvider value={{ admin, setAdmin }}>
          <UsersProvider value={{ users, setUsers }}>
            <MuiThemeProvider theme={muiTheme}>
              <SearchAppBar
                logout={logout}
                adminLoggedIn={!!admin.current}
                toggleDarkTheme={toggleDarkTheme}
              />
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
                {admin.current && (
                  <Route exact path="/users" component={Users} />
                )}
                <Route exact path="/" component={SignIn} />
                <Route path="/" render={() => <Redirect to="/" />} />
              </Switch>
            </MuiThemeProvider>
          </UsersProvider>
        </AdminProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
