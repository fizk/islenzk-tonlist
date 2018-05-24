import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {BrowserRouter as Router} from 'react-router-dom';
import ItemSections from '../../src/client/sections/ItemSection/ItemSections';
import {ItemType} from "../../@types";
import '../../src/client/components/App/_index.scss';

const standardArtist: ItemType & {__typename: string} = {
    __typename: 'Item',
    _id: '1',
    name: 'I saw here standing there',
    description: '',
    duration: 12345,
    genres: [],
    appearsOn: [],
    hero: null,
    avatar: null
};

storiesOf('Sections/ItemSection', module)
    .add('Empty', () => (
        <ItemSections item={undefined} />
    ))

    .add('Standard', () => (
        <Router location={''}>
            <ItemSections item={standardArtist} />
        </Router>
    ))
;
