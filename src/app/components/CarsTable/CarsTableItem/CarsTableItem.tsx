'use client';
import Button from '@/app/ui/Button';
import { FC } from 'react';
import styles from './CarsTableItem.module.scss';
import CarsTableItemProps from './CarsTableItem.props';

const CarsTableItem: FC<CarsTableItemProps> = ({ car, onDelete, onEdit }) => {
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
                    onClick={onEdit}
                    appearance="edit"
                >
                    Edit
                </Button>
                <Button
                    onClick={onDelete}
                    appearance="danger"
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
};

export default CarsTableItem;
