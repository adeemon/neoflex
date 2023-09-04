import * as React from 'react';
import { IloanOffer } from '../../interfaces';
import surpriseImage from '../../assets/images/design/surprise.png';
import { ImageFigured } from '../ui-toolkit/imageFigured/ImageFigured';
import { InputFieldIcon } from '../ui-toolkit/inputFieldIcon/inputFieldIcon';
import { ButtonMain } from '../ui-toolkit/buttonMain/ButtonMain';

export const LoanOffer: React.FC<IloanOffer> = ({ requestedAmount,
    totalAmount,
    term,
    monthlyPayment,
    rate,
    isInsuranceEnabled,
    isSalaryClient }) => {
        const onSelectHandler = () => {
            console.log({ requestedAmount,
                totalAmount,
                term,
                monthlyPayment,
                rate,
                isInsuranceEnabled,
                isSalaryClient });
        };

        return (
            <div className="loanOffer">
                <ImageFigured src={surpriseImage} alt="offer icon" />
                <ul className="loanOffer__offer-conditions">
                    <li className="loanOffer__offer-condition">
                        Requested amount {requestedAmount} ₽
                    </li>
                    <li className="loanOffer__offer-condition">
                        Total amount {totalAmount} ₽
                    </li>
                    <li className="loanOffer__offer-condition">
                        For {term} months
                    </li>
                    <li className="loanOffer__offer-condition">
                        Monthly payment: {monthlyPayment}₽
                    </li>
                    <li className="loanOffer__offer-condition">
                        Your rate: {rate}%
                    </li>
                    <li className="loanOffer__offer-condition">
                        <p>
                            Insurance included
                        </p>
                        <InputFieldIcon isValidated isInvalid={isInsuranceEnabled} />
                    </li>
                    <li className="loanOffer__offer-condition">
                        <p>
                            Salary client
                        </p>
                        <InputFieldIcon isValidated isInvalid={isSalaryClient} />
                    </li>
                </ul>
                <ButtonMain label="Select" className="loanOffer__button" onClick={onSelectHandler} />
            </div>
        );
    };
