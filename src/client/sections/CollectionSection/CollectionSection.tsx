import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import '../../elements/MarkDownContainer/_index.scss';
import {Grid, Row, Column} from '../../elements/Grid';
import CollectionHeader from '../../components/CollectionHeader';
import ArtistListItem from '../../components/ArtistListItem';
import ItemsList from '../../components/ItemsList';
import {List} from '../../elements/List';
import LoadingStrip from '../../elements/LoadingStrip';
import PublicationTable from '../../components/PublicationTable';
import Paper from '../../elements/Paper/index';
import {CollectionType} from "../../../../@types";

type Props = {
    album: CollectionType,
    loading: boolean,
}

export default class CollectionSection extends React.Component<Props> {

    static defaultProps = {
        album: {
            _id: undefined,
            name: undefined,
            genres: [],
            aka: [],
            releaseDates: undefined,
            songs: [],
            avatar: undefined,
            hero: undefined,
            artists: [],
            performers: [],
            publications: [],
        }
    };

    render() {
        return (
            <Grid>
                <Row>
                    <Column>
                        <LoadingStrip loading={this.props.loading} />
                        <CollectionHeader collection={this.props.album} />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <Paper>
                            <ItemsList items={this.props.album.songs} />
                        </Paper>
                    </Column>
                    <Column>
                        <List>
                            {this.props.album.artists.map(artist => (
                                <ArtistListItem key={`performer-${artist._id}`} artist={artist} />
                            ))}
                        </List>
                        <PublicationTable publications={this.props.album.publications || []} />
                        <ReactMarkdown source={this.props.album.description || ''} />
                    </Column>
                </Row>
            </Grid>
        );
    }
}
