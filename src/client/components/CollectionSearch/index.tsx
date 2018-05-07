import * as React from 'react';
import gql from "graphql-tag";
import CollectionSearch from './CollectionSearch';

export const collectionSearchQuery = gql`
    query searchCollection ($term: String!, $type: CollectionType) {
        CollectionSearch(term: $term,  type: $type) {
            _id
            name
            releaseDates
            avatar {base64 url}
            artists {
                ... on Person {
                    _id
                    name
                }
                ... on Group {
                    _id
                    name
                }
            }
        }
    }
`;

const CollectionSearchWithApollo = (Component) => {
    return class extends React.Component<{onSelect: () => void}> {
        static defaultProps = {
            onSelect: () => {}
        };

        static contextTypes = {
            client: () => {},
        };

        state = {
            items: []
        };

        constructor(props, context) {
            super(props, context);

            this.handleOnType = this.handleOnType.bind(this);
        }

        handleOnType(event) {

            this.context.client.query({
                query: collectionSearchQuery,
                variables: {term: event.target.value}
            }).then(result => {
                this.setState({
                    items: result.data.CollectionSearch
                });
            });
        };

        render() {

            return (<Component onSelect={this.props.onSelect} items={this.state.items} onType={this.handleOnType} />)
        }
    }
};


export default CollectionSearchWithApollo(CollectionSearch);
