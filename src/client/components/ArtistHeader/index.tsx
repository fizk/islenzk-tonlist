import * as React from 'react';
import {Fragment} from 'react';
import {Hero} from '../../elements/Hero';
import {Avatar} from '../../elements/Avatar';
import {SyntheticEvent} from "react";
import {ArtistType} from "../../../../@types";
import './_index.scss';

type Props = {
    artist: ArtistType
}

export default class ArtistHeader extends React.Component<Props> {
    static defaultProps = {
        artist: {
            name: undefined,
            periods: [],
            genres: [],
            aka: [],
            hero: {
                url: undefined,
                base64: undefined,
            },
            avatar: {
                url: undefined,
                base64: undefined,
            },
        },
    };

    render() {
        return (
            <div className="artist-header">
                <div className="artist-header__hero">
                    <Hero src={ this.props.artist.hero && this.props.artist.hero.url}
                        base64={this.props.artist.hero && this.props.artist.hero.base64} />
                </div>
                <div className="artist-header__headline">
                    <div className="artist-header__headline-avatar">
                        <div className="artist-header__avatar-container">
                            <Avatar className="artist-header__avatar"
                                src={this.props.artist.avatar && this.props.artist.avatar.url}
                                base64={this.props.artist.avatar && this.props.artist.avatar.base64}
                                width={120}
                                height={120}
                            />
                        </div>
                    </div>
                    <div className="artist-header__headline-content">
                        <h1 className="artist-header__name">{this.props.artist.name}</h1>
                        <div>
                            <h4 className="artist-header__aka">
                                {(this.props.artist.aka || []).join(' | ')}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
