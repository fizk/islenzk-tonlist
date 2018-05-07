import * as React from 'react';
import classVariations from '../../helpers/classVariations';

type Props = {
    variations?: string[]
    index?: number
}

class TabContent extends React.Component<Props> {
    static defaultProps = {
        variations: [],
    };

    render() {
        return (<div className={classVariations('tab-content', this.props.variations)}>{this.props.children[this.props.index]}</div>);
    }
}

export {TabContent};
