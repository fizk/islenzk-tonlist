import * as React from "react";
import {List, ListItemAvatarSelect} from '../../elements/List';
import {Poster} from '../../elements/Poster';
import {Time} from '../../elements/Time';
import * as ReactDOM from 'react-dom';
import {CollectionType} from "../../../../@types";
type Props = {
    items: CollectionType[],
    onType: (event: any) => void,
    onSelect: (item: CollectionType, event: any) => void,
}

export default class CollectionSearch extends React.Component<Props> {
    static defaultProps= {
        items: [],
        onType: () => {},
        onSelect: () => {}
    };

    mounted: boolean = false;

    state = {
        isOpen: false
    };

    constructor(props) {
        super(props);
        this.mounted = true;
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.items.length > 0) {
            document.addEventListener('click', this.handleDocumentClick, false);
            document.addEventListener('touchend', this.handleDocumentClick, false);
        } else {
            document.removeEventListener('click', this.handleDocumentClick, false);
            document.removeEventListener('touchend', this.handleDocumentClick, false);
        }
    }

    componentDidMount () {

    }

    componentWillUnmount () {
        this.mounted = false;
        document.removeEventListener('click', this.handleDocumentClick, false);
        document.removeEventListener('touchend', this.handleDocumentClick, false);
    }

    handleDocumentClick (event) {
        if (this.mounted) {
            if (!ReactDOM.findDOMNode(this).contains(event.target)) {
                if (this.state.isOpen) {
                    this.setState({ isOpen: false })
                }
            }
        }
    }

    render() {
        return (
            <div>
                <input onKeyUp={this.props.onType}/>
                {this.props.items.length > 0 && (
                    <List>
                        {this.props.items.map(release => (
                            <ListItemAvatarSelect onSelect={even => this.props.onSelect(release, event)}
                                                  key={`release-id-${release._id}`}
                                                  avatar={<Poster base64={release.avatar ? release.avatar.base64 : undefined}
                                                                  src={release.avatar ? release.avatar.url : undefined} />}>
                                {release.name}
                                <div>
                                    {release.releaseDates && (<Time>{new Date(release.releaseDates).getFullYear()}</Time>)}
                                    {!release.releaseDates && <Time>-</Time>}
                                </div>
                                {release.artists && release.artists.length > 0 && release.artists.map(artist => (
                                    <span key={`listamenn-${artist._id}`}>{artist.name}</span>
                                ))}
                            </ListItemAvatarSelect>
                        ))}
                    </List>
                )}
            </div>
        )
    }
}
