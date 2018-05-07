import * as React from 'react';
// import {OptionsWithKeyBinding, OptionsItem} from '../../elements/Options';
import {Avatar} from '../../elements/Avatar';
import {Button} from '../../elements/Form';


type Props = {
    onCreate: (value: string) => void,
    onSelect: (item: string) => void,
    doSearch?: (term: string, type: string, section: string) => void,
    section?: string,
    isSearching?: boolean,
    type: string,
    results?: {
        avatar: {
            url: string,
            base64: string,
    },
    releaseDate?: string,
    name?: string,
    _id?: string,
    }[]
}

type State = {
    value: string
}

class ArtistSearch extends React.Component<Props, State> {

    static defaultProps = {
        onCreate: () => {},
        onSelect: () => {},
        doSearch: () => {},
        results: [],
        section: 'default',
        isSearching: false,
        type: 'person',
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
        this.props.doSearch(term, this.props.type, this.props.section);
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
                                    {/*{item.releaseDate}*/}
                                {/*</div>*/}
                                {/*<div>*/}
                                    {/*<Avatar base64={item.avatar ? item.avatar.base64 : undefined}*/}
                                        {/*src={item.avatar ? item.avatar.url : undefined}/>*/}
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

export {ArtistSearch, ArtistSearch as ArtistSearchWithState};
