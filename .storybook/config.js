import * as React from 'react';
import { configure } from '@storybook/react';
import {addDecorator} from '@storybook/react';

function loadStories() {
    require('../stories/sections/ArtistSection.tsx');
    require('../stories/sections/CollectionSection.tsx');
    require('../stories/sections/ItemSection.tsx');
    require('../stories/components/ArtistForm.tsx');
    require('../stories/elements/MemberTimeLine.tsx');
    require('../stories/elements/AutoComplete.tsx');
    require('../stories/elements/Image.tsx');
}

addDecorator((storyFn) => React.createElement('div', {style: {padding: 20}}, storyFn()));

configure(loadStories, module);
