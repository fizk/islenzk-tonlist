import * as React from 'react';
import './_index.scss';

type Props = {
    className?: string
    width?: number,
    height?: number,
    src: string,
    base64: string,
}

class Avatar extends React.Component<Props> {

    img: any;

    static defaultProps = {
        width: 60,
        height: 60,
        src: undefined,
        base64: undefined,
    };

    constructor(props) {
        super(props);

        this.img = undefined;

        const imageObject = new Image();
        imageObject.addEventListener('load', (event) => {
            this.img.style.backgroundImage = `url(${props.src})`;
            this.img.classList.add('avatar__image--fade-in');
        });
        imageObject.src = props.src;
    }

    componentWillReceiveProps(props) {
        if (props.src === undefined) {
            this.img.style.backgroundImage = 'none';
        } else if (props.src) {
            const imageObject = new Image();
            imageObject.addEventListener('load', (event) => {
                this.img.style.backgroundImage = `url(${props.src})`;
                this.img.classList.add('avatar__image--fade-in');
            });
            imageObject.src = props.src;
        }
    }

    render() {
        const containerStyle = {
            backgroundImage: `url(${this.props.base64})`,
            width: this.props.width,
            height: this.props.height,

        };
        const imageStyle = {
            width: this.props.width,
            height: this.props.height,

        };
        return (
            <span className="avatar" style={containerStyle}>
                <div className="avatar__image" style={imageStyle} ref={item => this.img = item}/>
            </span>
        );
    }
}

export {Avatar};