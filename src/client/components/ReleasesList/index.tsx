import * as React from 'react';
import {List, ListItemAvatar} from '../../elements/List';
import {Link} from 'react-router-dom';
import {Poster} from '../../elements/Poster';
import {Time} from '../../elements/Time';
import {AlbumType} from "../../../../@types";

type Props = {
    releases: AlbumType[],
}

export default class ReleasesList extends React.Component<Props> {

    static defaultProps = {
        releases: [],
    };

    render() {
        return (
            <List>
                {this.props.releases.map(release => (
                    <ListItemAvatar key={`release-id-${release._id}`} avatar={<Poster base64={release.avatar ? release.avatar.base64 : undefined} src={release.avatar ? release.avatar.url : undefined} />}>
                        <Link to={`/verk/${release._id}`}>{release.name}</Link>
                        <div>
                            {release.releaseDates && (<Time>{new Date(release.releaseDates).getFullYear()}</Time>)}
                            {!release.releaseDates && <Time>-</Time>}
                        </div>
                        {release.artists && release.artists.length > 0 && release.artists.map(artist => (
                            <Link key={`listamenn-${artist._id}`} to={`/listamenn/${artist._id}`}>{artist.name}</Link>
                        ))}
                    </ListItemAvatar>
                ))}
            </List>
        );
    }
}