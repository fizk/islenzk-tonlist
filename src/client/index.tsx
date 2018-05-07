import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import App from './components/App';

import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
const introspectionQueryResultData = {"__schema":{"types":[{"kind":"UNION","name":"Artist","possibleTypes":[{"name":"Person"},{"name":"Group"}]}]}};

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

const client = new ApolloClient({
    cache: new InMemoryCache({ fragmentMatcher }),
    link: new HttpLink({
        uri: 'http://localhost:5000/islenzktonlist/us-central1/api/graphql'
    })
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.querySelector('[data-react-application]')
);
