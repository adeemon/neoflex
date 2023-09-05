import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectLoanStatus } from '../../redux/slices/loanOffersSlice';

export const LoanButton: React.FC = () => {
    const loanStatus = useSelector(selectLoanStatus);

    const 
}