import useInput from '@/app/hooks/useInput';
import { FC } from 'react';
import CarsItemFormProps from './CarsItemForm.props';

const CarsItemForm: FC<CarsItemFormProps> = ({ car }) => {
    const [company, onChangeCompany] = useInput(car?.car || '');
    const [model, onChangeModel] = useInput(car?.car_model || '');
    const [year, onChangeYear] = useInput(car?.car_model_year || '');
    const [vin, onChangeVin] = useInput(car?.car_vin || '');
    const [color, onChangeColor] = useInput(car?.car_color || '');
    const [price, onChangePrice] = useInput(car?.price || '');
    const [availability, onChangeAvailability] = useInput(
        car ? String(car?.availability) : ''
    );

    return (
        <form>
            <input
                onChange={onChangeCompany}
                type="text"
                value={company}
                disabled={car !== null}
            />

            <input
                onChange={onChangeModel}
                type="text"
                value={model}
                disabled={car !== null}
            />
            <input
                onChange={onChangeYear}
                type="text"
                value={year}
                disabled={car !== null}
            />
            <input
                onChange={onChangeVin}
                type="text"
                value={vin}
                disabled={car !== null}
            />
            <input
                onChange={onChangeColor}
                type="text"
                value={color}
            />
            <input
                onChange={onChangePrice}
                type="text"
                value={price}
            />
            <input
                onChange={onChangeAvailability}
                type="text"
                value={String(availability)}
            />
        </form>
    );
};

export default CarsItemForm;
