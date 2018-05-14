import * as React from 'react';
import AutoCompleteCollection from "../../elements/AutoComplete/AutoCompleteCollection";
import AutoComplete from "../../elements/AutoComplete/AutoComplete";
import gql from "graphql-tag";

type Props = {
    type?: string
    onSelect: (item: any) => void
}

type State = {
    items: any[]
}

export default class CollectionSearch extends React.Component<Props, State> {
    static defaultProps = {
        type: 'album',
        onSelect: (item: any) => {}
    };

    static contextTypes = {
        client: () => {},
    };

    state = {
        items: [],
    };

    handleSearch = (term) => {
        this.context.client.query({
            query: collectionSearchQuery,
            variables: {term: term, type: this.props.type}
        }).then(result => {
            this.setState({
                items: result.data.CollectionSearch
            });
        });
    };

    handleOnClear = () => {
        this.setState({items: []})
    };

    render() {
        return (
            <AutoComplete onType={this.handleSearch} onSelect={this.props.onSelect} onClear={this.handleOnClear}>
                {this.state.items.map(item => (
                    <AutoCompleteCollection key={item._id} value={item}>
                        {item.name}
                    </AutoCompleteCollection>
                ))}
            </AutoComplete>
        );
    }
}


export const collectionSearchQuery = gql`
    query search_collection ($term: String! $type: CollectionType) {
        CollectionSearch (term: $term type: $type) {
            _id
            contentType {type subtype attribute}
            name
            releaseDates
            avatar {base64, url}
        }
    }
`;
