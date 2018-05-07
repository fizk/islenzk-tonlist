import * as React from 'react';
import classVariations from '../../helpers/classVariations';

type Props = {
    variations?: string[]
    name?: string
    type?: string
    defaultValue?: any
    required?: boolean
}

class Input extends React.Component<Props> {

    static defaultProps = {
        variations: [],
    };

    render() {
        const {variations, ...props } = this.props;
        return (
            <input {...props} className={classVariations('input', variations)} />
        );
    }
}

export {Input};

