import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import FeedPage from "./components/FeedPage";
import CreatePage from "./components/CreatePage";
import "tachyons";
import "./index.css";

const client = new ApolloClient({
  uri: "https://lending-library-app.herokuapp.com/v1/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Fragment>
        <nav className="main">
          <NavLink
            className="heading"
            activeClassName="gray"
            exact={true}
            to="/"
            title="Feed"
          >
            Lending Book App
          </NavLink>
        </nav>
        <br></br>
        <div className="button">
          <Link to="/create" className="donate">
            + Donate Book
          </Link>
        </div>
        <div className="data">
          <Switch>
            <Route exact path="/" component={FeedPage} />
            <Route path="/create" component={CreatePage} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
