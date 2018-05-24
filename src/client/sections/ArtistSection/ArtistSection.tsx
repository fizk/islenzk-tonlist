import * as React from 'react';
import {Fragment} from 'react';
import * as ReactMarkdown from 'react-markdown';
import {Grid, Column, Row} from '../../elements/Grid';
import LoadingStrip from '../../elements/LoadingStrip';
import ArtistHeader from '../../components/ArtistHeader';
import ReleasesList from '../../components/ReleasesList';
import {List, ListGenres, ListHeader, ListPeriods} from '../../elements/List';
import PeriodYear from '../../elements/Period';
import ArtistListItem from '../../components/ArtistListItem';
import Paper from '../../elements/Paper';
import MemberTimeLine from '../../elements/MemberTimeLine';
import {ArtistType} from "../../../../@types";
import CollectionSearch from '../../components/CollectionSearch';
import '../../elements/MarkDownContainer/_index.scss';
import ArtistSearch from "../../components/ArtistSearch";

type Props = {
    id: string
    artist: ArtistType & {__typename: string},
    loading: boolean,
    edit?: boolean,
    connectCollection?: () => void
    connectMember?: () => void
}

export default class ArtistSection extends React.Component<Props> {
    static defaultProps = {
        artist: {
            _id: undefined,
            name: undefined,
            aka: [],
            description: undefined,
            periods: [],
            genres: [],
            contentType: {
                type: undefined,
                subtype: undefined,
            },
            albums: [],
            compilations: [],
            eps: [],
            singles: [],
            association: [],
            members: [],
            avatar: undefined,
            hero: undefined,
        },
        loading: false,
        edit: false,
        connectCollection: () => {},
        connectMember: () => {},
    };

    render() {
        return (
            <Grid>
                <Row>
                    <Column>
                        <LoadingStrip loading={this.props.loading} />
                        <ArtistHeader artist={this.props.artist || undefined}/>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <Paper>
                            {this.props.edit && <CollectionSearch id={this.props.id} type="album" onSelect={this.props.connectCollection} />}
                            <ReleasesList releases={this.props.artist.albums} />

                            <ListHeader><h3>Smáskífur</h3></ListHeader>
                            {this.props.edit && <CollectionSearch id={this.props.id}  type="single" onSelect={this.props.connectCollection} />}
                            <ReleasesList releases={this.props.artist.singles} />

                            <ListHeader><h3>EP plötur</h3></ListHeader>
                            {this.props.edit && <CollectionSearch id={this.props.id}  type="ep" onSelect={this.props.connectCollection} />}
                            <ReleasesList releases={this.props.artist.eps} />

                            <ListHeader><h3>Safnplötur</h3></ListHeader>
                            {this.props.edit && <CollectionSearch id={this.props.id}  type="compilation" onSelect={this.props.connectCollection} />}
                            <ReleasesList releases={this.props.artist.compilations} />
                        </Paper>
                    </Column>
                    <Column>
                        <List>
                            {{
                                'Person': (
                                    <Fragment>
                                        {(this.props.artist.association || []).map(artist => (
                                            <ArtistListItem key={`artist-${artist.group._id}`} artist={artist.group}>
                                                {artist.periods.map((period, i) => (
                                                    <PeriodYear key={`${artist.group._id}-${period.from}-${i}`} from={period.from} to={period.to} />
                                                ))}
                                            </ArtistListItem>
                                        ))}
                                    </Fragment>
                                ),
                                'Group': (
                                    <Fragment>
                                        <ArtistSearch type="person" onSelect={this.props.connectMember} />
                                        {(this.props.artist.members || []).map(artist => (
                                            <ArtistListItem key={`artist-${artist.artist._id}`} artist={artist.artist}>
                                                {artist.periods.map((period, i) => (
                                                    <PeriodYear key={`${artist.artist._id}-${period.from}-${i}`} from={period.from} to={period.to} />
                                                ))}
                                            </ArtistListItem>
                                        ))}
                                    </Fragment>
                                ),
                            }[this.props.artist.__typename]}
                        </List>

                        <ListHeader>
                            <h3>Um {this.props.artist.name}</h3>
                        </ListHeader>

                        <div style={{width: '100%'}}>
                            <div style={{float: 'right', width: '50%', maxWidth: 200, backgroundColor: 'white', padding: 16, marginLeft: 16, marginBottom: 16}}>
                                <ListGenres genres={this.props.artist.genres}/>
                                <ListPeriods periods={this.props.artist.periods}/>
                            </div>
                            <ReactMarkdown className="mark-down-container" source={this.props.artist.description || ''} />
                        </div>

                        {{
                            'Group': (<MemberTimeLine
                                albums={[
                                    ...this.props.artist.albums.map(album => album.collection),
                                    ...this.props.artist.singles.map(album => album.collection),
                                    ...this.props.artist.eps.map(album => album.collection),
                                    ...this.props.artist.compilations.map(album => album.collection)
                                ]}
                                artists={this.props.artist.members}
                            />)
                        }[this.props.artist.__typename]}
                    </Column>
                </Row>
            </Grid>
        );
    }
}

