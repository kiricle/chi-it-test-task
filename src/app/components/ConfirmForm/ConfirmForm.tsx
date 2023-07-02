import Button from '@/app/ui/Button/Button';
import { FC } from 'react';
import ConfirmFormProps from './ConfirmForm.props';
import styles from './ConfirmForm.module.scss';

const ConfirmForm: FC<ConfirmFormProps> = ({
    message,
    onCancel,
    onConfirm,
}) => {
    return (
        <form>
            <h1>{message}</h1>
            <div className={styles.buttons}>
                <Button
                    type="submit"
                    onClick={onConfirm}
                    appearance="danger"
                >
                    Yes
                </Button>
                <Button
                    onClick={onCancel}
                    appearance="primary"
                >
                    No
                </Button>
            </div>
        </form>
    );
};

export default ConfirmForm;
