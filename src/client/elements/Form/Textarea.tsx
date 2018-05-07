import * as React from 'react';
import classVariations from '../../helpers/classVariations';

const Textarea = props => {
    const {variations, ...rest} = props;
    return (<textarea className={classVariations('textarea', variations)} {...rest} />);
};

export {Textarea};
