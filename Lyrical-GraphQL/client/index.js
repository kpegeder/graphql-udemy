import React from "react";
import ReactDOM from "react-dom";
import { Route, HashRouter, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetails from "./components/SongDetails";
import "./style/style.css";

const client = new ApolloClient({
  cache: new InMemoryCache({ dataIdFromObject: (o) => o.id }),
  uri: "http://localhost:4000/graphql",
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <HashRouter>
          <Route exact path="/" component={SongList} />
          <Switch>
            <Route exact path="/songs/:id" component={SongDetails} />
            <Route exact path="/songs/create" component={SongCreate} />
          </Switch>
        </HashRouter>
      </div>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
