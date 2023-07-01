import { FC, useEffect } from 'react';
import ModalProps from './Modal.props';
import styles from './Modal.module.scss';
import Button from '@/app/ui/Button/Button';

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) [document.addEventListener('keydown', handleEsc)];

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <Button className={styles.close} appearance='danger' onClick={onClose}>
                &#10005;
                </Button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
