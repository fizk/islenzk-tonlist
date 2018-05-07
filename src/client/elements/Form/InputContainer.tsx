import * as React from 'react';
import classVariations from '../../helpers/classVariations';

const InputContainer = props => {
    const {variations, label, ...rest} = props;
    return (
        <div className={classVariations('input-container', variations)}>
            <label>
                <p>{label}</p>
                {props.children}
            </label>
        </div>
    );
};

export {InputContainer};
