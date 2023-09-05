import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectLoanStatus } from '../../redux/slices/loanOffersSlice';
import { ButtonMain } from '../ui-toolkit/buttonMain/ButtonMain';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store/store';

export const LoanButton: React.FC = () => {
    const loanStatus = useSelector(selectLoanStatus);
    const dispatch = useAppDispatch();
    const applyFOrCard =  (<a href="#prescoring-form">
    <ButtonMain className="platinumCard__apply-button" label="Apply for card" />
    </a>)

    const continueRegistration = (
        <Link to="/">
            <ButtonMain label="Continue registration" />
        </Link>
    )

    const onClickHandler = () => {
        dispatch()
    }
}