import * as React from 'react';
import './_index.scss';

export const SuggestItem = ({children, }) => (
    <div className="suggest-item">
        <div className="suggest-item__content">
            {children}
        </div>
    </div>
);

export const SuggestItemAvatar = ({children, avatar, }) => (
    <div className="suggest-item">
        <div className="suggest-item__content">
            {children}
        </div>
        <div className="suggest-item__avatar">{avatar}</div>
    </div>
);

