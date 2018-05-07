import * as React from 'react';
import {Link} from 'react-router-dom';
import {PublicationType} from "../../../../@types";

type Props = {
    publications: PublicationType[],
}

export default class PublicationTable extends React.Component<Props> {
    static defaultProps = {
        publication: [],
    };

    render() {
        return (
            <table style={{width: '100%'}}>
                <thead>
                    <tr>
                        <td>Publisher</td>
                        <td>CatNo</td>
                        <td>Formats</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {this.props.publications.map((publication, i) => (
                        <tr key={`publication-record-${i}`}>
                            <td>
                                {publication.publishers.map(publisher => (
                                    <Link key={`publisher-${publisher._id}`} to={`/utgefandi/${publisher._id}`}>{publisher.name}</Link>
                                ))}
                            </td>
                            <td>{publication.catalogNumber}</td>
                            <td>{publication.formats.join(', ')}</td>
                            <td>{new Date(publication.date || 0).getFullYear()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}
