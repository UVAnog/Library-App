import "./App.css";
import BookSearch from "../src/components/bookSearch";
import SignIn from "../src/components/login";
import Library from "../src/components/library";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from "react";

function App() {
  return (
    <Router style={{ float: "left", display: "block" }}>
      <div>
        <nav>
          <ul class="router-nav">
            {/* <li class="router-nav-item-1"> */}
            <Link class="router-nav-item-1" to="/login">
              Login{" "}
            </Link>
            {/* </li> */}
            {/* <li class="router-nav-item-2"> */}
            <Link class="router-nav-item-2" to="/search">
              Search{" "}
            </Link>
            {/* </li> */}
            {/* <li class="router-nav-item-3"> */}
            <Link class="router-nav-item-3" to="/library">
              Library{" "}
            </Link>
            {/* </li> */}
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/search">
            <BookSearch />
          </Route>
          <Route path="/library">
            <Library />
          </Route>
          <Route path="/login">
            <SignIn />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function LoginPage() {
  return (
    <div>
      <h2>Login</h2>
      <SignIn></SignIn>
    </div>
  );
}

function SearchPage() {
  return (
    <div class="search-page">
      {" "}
      <h2>Search</h2> <BookSearch></BookSearch>
    </div>
  );
}

function LibraryPage() {
  return (
    <div>
      <h2>Library</h2>
      <Library></Library>
    </div>
  );
}
export default App;
