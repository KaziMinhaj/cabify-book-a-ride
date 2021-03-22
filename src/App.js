import React, { createContext, useState } from "react";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./components/Login/Login";
import Blog from "./components/Blog/Blog";
import Destination from "./components/Destination/Destination";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext()

function App() {
  const [loggedInUser, setloggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setloggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <PrivateRoute path="/destination">
            <Destination></Destination>
          </PrivateRoute>
          <Route path="/blog">
            <Blog></Blog>
          </Route>
          <Route path="/contact">
            <Contact></Contact>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>

  );
}

export default App;
