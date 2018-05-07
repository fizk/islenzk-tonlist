import * as React from 'react';
import classVariations from '../../helpers/classVariations';

type Props = {
    variations: string[]
}

type State = {
    index: number
}

class TabContainer extends React.Component<Props, State> {

    static defaultProps = {
        variations: [],
    };

    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            index: 0,
        };
    }

    handleSelect(index) {
        this.setState({index: index, });
    }

    render() {
        return (<div className={classVariations('tab-container', this.props.variations)}>
            {/*{React.Children.map(this.props.children, child => {*/}
                {/*return React.cloneElement(child, {*/}
                    {/*index: this.state.index,*/}
                    {/*onSelect: this.handleSelect,*/}
                {/*});*/}
            {/*})}*/}
        </div>);

    }
}

export {TabContainer};
