import * as React from 'react';
import {Button} from './Button';

type Props = {
    onAdd: () => void,
    onChange: (value: any, index: any) => void,
    onRemove: (index: any) => void,
}

class SelectArray extends React.Component<Props> {
    static defaultProps = {
        onAdd: () => {},
        onRemove: () => {},
        onChange: () => {},
    };

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleChange(event, index) {
        this.props.onChange(event.target.value, index);
    }

    handleAdd(event) {
        event.preventDefault();
        this.props.onAdd();
    }

    handleRemove(event, index) {
        event.preventDefault();
        this.props.onRemove(index);
    }

    render() {
        return (
            <div>
                {React.Children.map(this.props.children, (child, index) => (
                    <div style={{display: 'flex'}}>
                        <div style={{flexGrow: 1}}>
                            {/*{React.cloneElement(child, {*/}
                                {/*onChange: (event) => this.handleChange(event, index),*/}
                            {/*})}*/}
                        </div>
                        <div>
                            <Button variations={['primary']} onClick={event => this.handleRemove(event, index)}>-</Button>
                        </div>
                        {/*{this.props.children.length - 1 === index && (*/}
                            {/*<div>*/}
                                {/*<Button variations={['primary']} onClick={event => this.handleAdd(event)}>+</Button>*/}
                            {/*</div>*/}
                        {/*)}*/}
                    </div>
                ))}
            </div>
        );
    }
}

export {SelectArray};
