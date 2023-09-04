import * as React from 'react';
import { IloanOffer } from '../../interfaces';
import { testResponce } from '../../testdata';
import { LoanOffer } from '../loanOffer/LoanOffer';

export const LoanOffersBlock: React.FC = () => {
    const arrayOfOffers: IloanOffer[] = testResponce;
    const elementsToRender = arrayOfOffers.map((offer, index) =>
    (
        <LoanOffer {...offer} key={`${offer.applicationId}${index}`} />
    ));

    return (
        <section className="loanOffers">
            {elementsToRender}
        </section>
    );
};