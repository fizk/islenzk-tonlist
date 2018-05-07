import * as React from 'react';
import './_index.scss';

const Block = ({children}) => {
    return (
        <div className="block">{children}</div>
    );
};

const Static = ({children}) => {
    return (
        <div className="block__static">{children}</div>
    );
};

const Stretched = ({children}) => {
    return (
        <div className="block__stretched">{children}</div>
    );
};

export {Block, Static, Stretched};
