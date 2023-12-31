import Car from '@/app/interfaces/Car';

export default interface CarsTableItemProps {
    car: Car;
    onDelete: () => void;
    onEdit: () => void;
}