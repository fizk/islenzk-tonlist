import * as React from 'react';
import './_index.scss';

type Props = {
    src: string,
    base64: string,
    width?: string | number
    height?: string | number
}

class Hero extends React.Component<Props> {
    img : any;

    static defaultProps = {
        src: undefined,
        base64: undefined,
    };

    constructor(props) {
        super(props);

        this.img = undefined;

        const imageObject = new Image();
        imageObject.addEventListener('load', (event) => {
            this.img.style.backgroundImage = `url(${props.src})`;
            this.img.classList.add('hero__container--fade-in');
        });
        imageObject.src = props.src;
    }

    componentWillReceiveProps(props) {
        if (props.src === undefined) {
            this.img.style.backgroundImage = 'none';
        } else if (props.src !== this.props.src) {
            const imageObject = new Image();
            imageObject.addEventListener('load', (event) => {
                this.img.style.backgroundImage = `url(${props.src})`;
                this.img.classList.add('hero__container--fade-in');
            });
            imageObject.src = props.src;
        }
    }

    render() {
        const containerStyle = {
            backgroundImage: `url(${this.props.base64})`,
        };
        return (
            <div className="hero" style={containerStyle}>
                <div className="hero__container" ref={item => this.img = item}/>
            </div>
        );
    }
}

export {Hero};
