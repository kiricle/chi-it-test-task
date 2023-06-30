import Button from '@/app/ui/Button';
import { FC } from 'react';
import ConfirmFormProps from './ConfirmForm.props';

const ConfirmForm: FC<ConfirmFormProps> = ({
    message,
    onCancel,
    onConfirm,
}) => {
    return (
        <form>
            <h1>{message}</h1>
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
            ;
        </form>
    );
};

export default ConfirmForm;
