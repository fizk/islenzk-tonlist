import * as React from 'react';
import {StatelessComponent} from 'react';
import classVariations from '../../helpers/classVariations';
import Poster from '../Poster'
import {CollectionType} from "../../../../@types";
import {validDate} from "../../helpers/date";
import './_auto-complete-collection.scss';

type Props = {
    variations?: string[],
    onSelect?: (value: any) => void,
    value?: CollectionType,
    active?: boolean
}

const AutoCompleteCollection: StatelessComponent<Props> = (
    {children, variations = [], onSelect = () => {}, value = undefined, active = false}
) => {
    const releaseDates = validDate(value.releaseDates) ? new Date(value.releaseDates).getFullYear() : null;

    return (
        <div className={classVariations('auto-complete-collection', active ? [...variations, 'active'] : variations)}
             onClick={() => onSelect(value)}>
            <div className="auto-complete-collection__icon">
                <Poster src={value.avatar === null ? undefined : value.avatar} variations={['sm']}/>
            </div>
            <div className="auto-complete-collection__content">
                <h3 className="auto-complete-collection__title">{value.name}</h3>
                <time className="auto-complete-collection__time">{releaseDates}</time>
            </div>
        </div>
    )
};

export default AutoCompleteCollection;
