import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';

import SongList from './components/songList/SongList';
import SongCreate from './components/SongCreate';
import SongDetails from './components/SongDetails';
import './style/style.css';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: httpLink,
  dataIdFromObject: (o) => o.id,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path='/' component={SongList} />
        <Switch>
          <Route exact path='/songs/new' component={SongCreate}></Route>
          <Route exact path='/songs/:id' component={SongDetails} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
