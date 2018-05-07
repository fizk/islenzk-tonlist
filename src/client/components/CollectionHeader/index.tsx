import * as React from 'react';
import {Hero} from '../../elements/Hero';
import {Poster} from '../../elements/Poster';
import {AlbumType} from "../../../../@types";
import './_index.scss';

type Props = {
    collection: AlbumType,
}

export default class CollectionHeader extends React.Component<Props> {

    static defaultProps = {
        collection: {
            name: undefined,
            aka: [],
            genres: [],
            releaseDates: undefined,
            hero: {
                url: undefined,
                base64: undefined,
            },
            avatar: {
                url: undefined,
                base64: undefined,
            },
            releaseDate: 0,
        },
    };

    render() {
        return (
            <div className="collection-header">
                <div className="collection-header__hero">
                    <Hero
                        width="100%"
                        height="40vh"
                        src={this.props.collection.hero && this.props.collection.hero.url}
                        base64={this.props.collection.hero && this.props.collection.hero.base64} />
                </div>
                <div className="collection-header__headline">
                    <div>
                        <div className="collection-header__avatar-container">
                            <Poster className="collection-header__avatar"
                                src={this.props.collection.avatar && this.props.collection.avatar.url}
                                base64={this.props.collection.avatar && this.props.collection.avatar.base64}
                                width={120}
                                height={120}
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className="collection-header__name">
                            {this.props.collection.name} {' - '}
                            {new Date(this.props.collection.releaseDates || 0).getFullYear()}
                        </h1>
                        <h4 className="collection-header__aka">
                            {(this.props.collection.aka || []).join(' | ')}
                        </h4>
                        {/*{(this.props.collection.genres || []).join(' | ')}*/}
                    </div>
                </div>
            </div>
        );
    }
}
