import * as React from 'react';
import {List, ListItemNumbered} from '../../elements/List';
import {Link} from 'react-router-dom';
import {Time} from "../../elements/Time";
import {SongType} from "../../../../@types";

type Props = {
    items: {
        position: number,
        song: SongType,
    }[],
}

export default class ItemsList extends React.Component<Props> {
    static propTypes = {

    };

    static defaultProps = {
        albums: [],
    };

    render() {
        return (
            <List>
                {this.props.items.map(item => (
                    <ListItemNumbered key={`item-id-${item.song._id}`}>
                        <Link to={`/stak/${item.song._id}`}>{item.song.name}</Link>
                        <div>
                            <Time>{item.song.duration ? item.song.duration : '0:00'}</Time>
                        </div>
                    </ListItemNumbered>
                ))}
            </List>
        );
    }
}
