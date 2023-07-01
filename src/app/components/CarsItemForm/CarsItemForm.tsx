import useInput from '@/app/hooks/useInput';
import Button from '@/app/ui/Button/Button';
import { FC } from 'react';
import CarsItemFormProps from './CarsItemForm.props';
import styles from './CarsItemForm.module.scss';
import Input from '@/app/ui/Input/Input';

const CarsItemForm: FC<CarsItemFormProps> = ({ car, onSubmit }) => {
    const [company, onChangeCompany] = useInput(car?.car || '');
    const [model, onChangeModel] = useInput(car?.car_model || '');
    const [year, onChangeYear] = useInput(
        car?.car_model_year || new Date().getFullYear()
    );
    const [vin, onChangeVin] = useInput(car?.car_vin || '');
    const [color, onChangeColor] = useInput(car?.car_color || '');
    const [price, onChangePrice] = useInput(car?.price || '');
    const [availability, onChangeAvailability] = useInput(
        car ? String(car?.availability) : ''
    );

    const isSomeInputEmpty =
        company.trim() === '' ||
        model.trim() === '' ||
        year.toString().trim() === '' ||
        vin.trim() === '' ||
        color.trim() === '' ||
        price === '' ||
        availability.trim() === '';

    return (
        <form
            className={styles.form}
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({
                    id: car?.id || crypto.randomUUID(),
                    car: company,
                    car_model: model,
                    car_model_year: Number(year),
                    car_vin: vin,
                    car_color: color,
                    price: price,
                    availability: availability === 'true' ? true : false,
                });
                console.log('submit');
            }}
        >
            <Input
                onChange={onChangeCompany}
                type="text"
                value={company}
                disabled={car !== null}
                placeholder="Company"
            />

            <Input
                onChange={onChangeModel}
                type="text"
                value={model}
                disabled={car !== null}
                placeholder="Model"
            />
            <Input
                onChange={onChangeYear}
                type="number"
                value={year}
                disabled={car !== null}
                placeholder="Year"
            />
            <Input
                onChange={onChangeVin}
                type="text"
                value={vin}
                disabled={car !== null}
                placeholder="VIN"
            />
            <Input
                onChange={onChangeColor}
                type="text"
                value={color}
                placeholder="Color"
            />
            <Input
                onChange={onChangePrice}
                type="text"
                value={price}
                placeholder="Price"
            />
            <Input
                onChange={onChangeAvailability}
                type="text"
                value={String(availability)}
                placeholder="Availability"
            />
            <Button
                type="submit"
                appearance="primary"
                disabled={isSomeInputEmpty}
            >
                {car ? 'Update' : 'Create'}
            </Button>
        </form>
    );
};

export default CarsItemForm;
