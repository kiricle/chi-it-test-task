'use client';
import Modal from '@/app/components/Modal/Modal';
import Button from '@/app/ui/Button';
import { FC } from 'react';
import useModal from '../../Modal/hooks/useModal';
import styles from './CarsTableItem.module.scss';
import CarsTableItemProps from './CarsTableItem.props';

const CarsTableItem: FC<CarsTableItemProps> = ({ car }) => {
    const [isDeleteModalOpen, openDeleteModal, closeDeleteModal] = useModal();

    return (
        <tr key={car.id}>
            <td>{car.car}</td>
            <td>{car.car_model}</td>
            <td>{car.car_model_year}</td>
            <td>{car.car_vin}</td>
            <td>{car.car_color}</td>
            <td>{car.price}</td>
            <td>{String(car.availability)}</td>
            <td className={styles.actions}>
                <Button
                    appearance="edit"
                >
                    Edit
                </Button>
                <Button
                    onClick={openDeleteModal}
                    appearance="danger"
                >
                    Delete
                </Button>
            </td>
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
            >
                <h1>Are you sure you want to delete item?</h1>
                <Button
                    onClick={closeDeleteModal}
                    appearance="danger"
                >
                    Yes
                </Button>
                <Button
                    onClick={closeDeleteModal}
                    appearance="primary"
                >
                    No
                </Button>
            </Modal>
        </tr>
    );
};

export default CarsTableItem;
