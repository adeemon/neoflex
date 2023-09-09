import { MouseEvent, useEffect, useRef } from 'react';

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
}: IModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    console.log(isOpened);
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
      <p className="modal__title">
        { title }
      </p>
      <p className="modal__description">
        { describtion }
      </p>
      <div>
        { !isOnlyProceed
          && (
            <button
              type="button"
              onClick={ onClose }
              className="modal__cancel-button"
            >{ cancelLabel }
            </button>
          ) }
        <button
          type="button"
          onClick={ proceedAndClose }
          className="modal__proceed-button"
        >{ proceedLabel }
        </button>
      </div>
    </dialog>
  );
};

Modal.defaultProps = {
  isOnlyProceed: false,
};
