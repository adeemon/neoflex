import * as React from 'react';
import { useSelector } from 'react-redux';
import { CheckboxAgreeForm } from '../../components/checkboxAgreeForm/CheckboxAgreeForm';
import { ReactComponent as FileIcon }
  from '../../assets/images/design/File_dock_duotone.svg';
import ExampleDox from '../../assets/files/credit-card-offer.pdf';
import { selectIsLoading, selectLoanStatus, signDocuments } from '../../redux/slices/loanOffersSlice';
import { ELoanSteps } from '../../interfaces';
import { TitleDescTextBlock } from '../../components/ui-toolkit/titleDescTextBlock/titleDescTextBlock';
import { useAppDispatch } from '../../redux/store/store';
import { Spinner } from '../../components/spinner/Spinner';

export const DocumentsSign: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSigned = useSelector(selectLoanStatus) === ELoanSteps.SignAccepted;
  const isLoading = useSelector(selectIsLoading);
  const onSign = () => {
    dispatch(signDocuments());
  };

  const dockumentsToSign = (
    <section className="document-sign">
      <div className="document-sign__title">
        <p className="big-title">
          Signing of documents
        </p>
        <p className="default-text">
          Step 4 of 5
        </p>
      </div>
      <p className="document-sign__descriptions default-text">
        Information on interest rates under bank deposit agreements with individuals.
        Center for Corporate Information Disclosure.
        Information of a professional participant in the securities market.
        Information about persons under whose control or significant influence
        the Partner Banks are. By leaving an application, you agree to the processing
        of personal data, obtaining information, obtaining access to a credit history,
        using an analogue of a handwritten signature, an offer, a policy regarding
        the processing of personal data, a form of consent to the processing
        of personal data.
      </p>
      <div className="document-sign__options">
        <div className="document-sign__download">
          <a
            href={ ExampleDox }
            download="credit-card-offer.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <FileIcon />
          </a>
          <p className="document-sign__download-title default-text">
            Information on your card
          </p>
        </div>
        <div className="document-sign__form">
          <CheckboxAgreeForm
            checkboxTitle="I agree"
            onSubmitDispatch={ onSign }
          />
        </div>
      </div>
    </section>
  );

  return (
    <Spinner isLoading={ isLoading }>
      { isSigned
        ? (
          <TitleDescTextBlock
            title="Documents have been successfully signed and sent for approval"
            desc="Within 10 minutes you will be sent a PIN code to your email for confirmation"
          />
        )
        : dockumentsToSign }
    </Spinner>
  );
};
