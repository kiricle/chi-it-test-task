'use client';
import { FC } from 'react';
import CarsTableItemProps from './CarsTableItem.props';
import styles from './CarsTableItem.module.scss';
import Button from '@/app/ui/Button';

const CarsTableItem: FC<CarsTableItemProps> = ({car}) => {
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
                    onClick={() => console.log('Clicked')}
                    appearance="edit"
                >
                    Edit
                </Button>
                <Button
                    onClick={() => console.log('Clicked')}
                    appearance="danger"
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
};

export default CarsTableItem;
