import { MouseEvent, useEffect, useRef } from 'react';
import { ButtonMain } from '../ui-toolkit/buttonMain/ButtonMain';

const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
  const r = element.getBoundingClientRect();

  return (
    e.clientX > r.left
    && e.clientX < r.right
    && e.clientY > r.top
    && e.clientY < r.bottom
  );
};

interface IModalProps {
  title: string;
  describtion: string;
  isOpened: boolean;
  onProceed: () => void;
  onClose: () => void;
  proceedLabel: string;
  cancelLabel: string;
  isOnlyProceed?: boolean;
  isCloseAfterProceed?: boolean;
}

export const Modal = ({
  title,
  isOpened,
  onProceed,
  onClose,
  proceedLabel,
  cancelLabel,
  isOnlyProceed,
  describtion,
  isCloseAfterProceed,
}: IModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      document.body.classList.add('modal-open');
    } else {
      ref.current?.close();
      document.body.classList.remove('modal-open');
    }
  }, [isOpened]);

  const proceedAndClose = () => {
    onProceed();
    onClose();
  };

  return (
    <dialog
      ref={ ref }
      role="presentation"
      onCancel={ onClose }
      onClick={ (e) =>
        ref.current && !isClickInsideRectangle(e, ref.current) && onClose() }
    >
      <div className="modal">
        <p className="modal__title">
          { title }
        </p>
        <p className="modal__description">
          { describtion }
        </p>
        <div className="modal__options">
          { !isOnlyProceed
          && (
            <ButtonMain
              type="button"
              onClick={ isCloseAfterProceed ? proceedAndClose : onProceed }
              className="modal__cancel-button"
              id="modal__cancel-button-id"
            >{ cancelLabel }
            </ButtonMain>
          ) }
          <ButtonMain
            type="button"
            onClick={ onClose }
            className="modal__proceed-button"
          >{ proceedLabel }
          </ButtonMain>
        </div>
      </div>
    </dialog>
  );
};

Modal.defaultProps = {
  isOnlyProceed: false,
  isCloseAfterProceed: true,
};
