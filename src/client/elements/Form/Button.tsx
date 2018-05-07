import * as React from 'react';
import classVariations from '../../helpers/classVariations';

const Button = props => {
    const {variations, ...rest} = props;
    return (<button className={classVariations('button', variations)} {...rest}>{props.children}</button>);
};

export {Button};
