import React, { Component } from "react";
import { Link, Route, Router, Switch } from "react-router-dom";
import { Menu } from "antd";

import Auth from "./auth/Auth";
import { LogIn } from "./components/LogIn";
import { NotFound } from "./components/NotFound";
import PokemonNotes from "./components/PokemonNotes";
import CreatePokemonNote from "./components/CreatePokemonNote";

export interface AppProps {}

export interface AppProps {
  auth: Auth;
  history: any;
}

export interface AppState {}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin() {
    this.props.auth.login();
  }

  handleLogout() {
    this.props.auth.logout();
  }

  render() {
    return (
      <div>
        <Router history={this.props.history}>
          {this.generateMenu()}

          {this.generateCurrentPage()}
        </Router>
      </div>
    );
  }

  generateMenu() {
    return (
      <Menu mode="horizontal" theme="dark">
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        {this.logInLogOutButton()}
      </Menu>
    );
  }

  logInLogOutButton() {
    if (this.props.auth.isAuthenticated()) {
      return (
        <>
          <Menu.Item key="logout" onClick={this.handleLogout}>
            Log Out
          </Menu.Item>
          <Menu.Item key="create">
            <Link to="/create">Create</Link>
          </Menu.Item>
        </>
      );
    } else {
      return (
        <Menu.Item key="login" onClick={this.handleLogin}>
          Log In
        </Menu.Item>
      );
    }
  }

  generateCurrentPage() {
    if (!this.props.auth.isAuthenticated()) {
      return <LogIn auth={this.props.auth} />;
    }

    return (
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => {
            return <PokemonNotes {...props} auth={this.props.auth} />;
          }}
        />

        <Route
          path="/create"
          exact
          render={(props) => {
            return <CreatePokemonNote {...props} auth={this.props.auth} />;
          }}
        />

        <Route component={NotFound} />
      </Switch>
    );
  }
}
