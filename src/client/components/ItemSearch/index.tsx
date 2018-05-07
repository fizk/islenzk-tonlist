import * as React from 'react';
// import {OptionsWithKeyBinding, OptionsItem} from '../../elements/Options';
import {Button} from '../../elements/Form';

type Props = {
    onCreate: (value: string) => void,
    onSelect: (item: string) => void,
    doSearch: (term: string) => void,
    results: {
        name: string,
        _id: string,
    }[],
    isSearching: boolean,
}

type State = {
    value: string
}

class ItemSearch extends React.Component<Props, State> {

    static defaultProps = {
        onCreate: () => {},
        onSelect: () => {},
        doSearch: () => {},
        results: [],
        isSearching: false,
    };

    constructor(props) {
        super(props);

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchSelect = this.handleSearchSelect.bind(this);
        this.handleOnCreate = this.handleOnCreate.bind(this);

        this.state = {
            value: '',
        };
    }

    handleSearchChange(term) {
        this.props.doSearch(term);
        this.setState({value: term});
    }

    handleSearchSelect(item) {
        this.props.onSelect(item);
    }

    handleOnCreate() {
        this.props.onCreate(this.state.value);
    }

    render() {
        return (
            <div style={{display: 'flex', }}>
                {/*<OptionsWithKeyBinding*/}
                    {/*elastic={true}*/}
                    {/*isSearching={this.props.isSearching}*/}
                    {/*onChange={this.handleSearchChange}*/}
                    {/*onSelect={this.handleSearchSelect}>*/}
                    {/*{this.props.results.map(item => (*/}
                        {/*<OptionsItem key={item._id} value={item}>*/}
                            {/*<div style={{display: 'flex'}}>*/}
                                {/*<div>*/}
                                    {/*{item.name}*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</OptionsItem>*/}
                    {/*))}*/}
                {/*</OptionsWithKeyBinding>*/}
                <Button variations={['primary']} onClick={this.handleOnCreate}>create!</Button>
            </div>
        );
    }
}

export {ItemSearch, ItemSearch as ItemSearchWithState};
