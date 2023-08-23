import * as React from 'react';
import { Accorderon } from '../accordeon/Accordeon';

export const FAQTab: React.FC = () => {
    return (
        <Accorderon summary={'test'} content={'gigatest'} />
    )
}