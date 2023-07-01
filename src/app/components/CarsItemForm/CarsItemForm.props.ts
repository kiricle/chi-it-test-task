import  Car from '@/app/interfaces/Car';

export default interface CarsItemFormProps {
    car: Car | null; 
    onSubmit: (car: Car) => void;
}