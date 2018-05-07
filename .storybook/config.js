import { configure } from '@storybook/react';

function loadStories() {
    require('../stories/sections/ArtistSection.tsx');
    require('../stories/elements/MemberTimeLine.tsx');
}

configure(loadStories, module);
