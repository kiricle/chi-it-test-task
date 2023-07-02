'use client';
import useDebounce from '@/app/hooks/useDebounce';
import useInput from '@/app/hooks/useInput';
import useLocalStorage from '@/app/hooks/useLocalStorage';
import usePagination from '@/app/hooks/usePagination';
import Car from '@/app/interfaces/Car';
import Button from '@/app/ui/Button/Button';
import Input from '@/app/ui/Input/Input';
import { useEffect, useState } from 'react';
import CarsItemForm from '../CarsItemForm/CarsItemForm';
import ConfirmForm from '../ConfirmForm/ConfirmForm';
import useModal from '../Modal/hooks/useModal';
import Modal from '../Modal/Modal';
import styles from './CarsTable.module.scss';
import CarsTableItem from './CarsTableItem/CarsTableItem';

const tableHeaders = [
    'Company',
    'Model',
    'Year',
    'VIN',
    'Color',
    'Price',
    'Availability',
    'Actions',
];

function CarsTable({ cars: initialCars }: { cars: Car[] }) {
    const [isDeleteModalOpen, openDeleteModal, closeDeleteModal] = useModal();
    const [carIdToDelete, setCarIdToDelete] = useState('0');

    const [isUpdateModalOpen, openUpdateModal, closeUpdateModal] = useModal();
    const [carToBeUpdated, setCarToBeUpdated] = useState<Car | null>(null);

    const [isAddModalOpen, openAddModal, closeAddModal] = useModal();

    const itemsPerPage = 15;
    const [cars, setCars, isLoading] = useLocalStorage<Car[]>(
        'cars',
        initialCars
    );
    const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
    const [totalPages, currentPage, nextPage, previousPage] = usePagination(
        filteredCars,
        itemsPerPage
    );

    const [searchTerm, onChangeSearchTerm] = useInput('');

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
        
    useEffect(() => {
        setFilteredCars(cars.filter((car) => {
            const searchTermLowerCase = debouncedSearchTerm.toLowerCase();
            
            const companyLowerCase = car.car.toLowerCase();
            const modelLowerCase = car.car_model.toLowerCase();
            const yearLowerCase = car.car_model_year.toString().toLowerCase();
            const vinLowerCase = car.car_vin.toLowerCase();
            const colorLowerCase = car.car_color.toLowerCase();
            const priceLowerCase = car.price.toString().toLowerCase();

            return (
                companyLowerCase.includes(searchTermLowerCase) ||
                modelLowerCase.includes(searchTermLowerCase) ||
                yearLowerCase.includes(searchTermLowerCase) ||
                vinLowerCase.includes(searchTermLowerCase) ||
                colorLowerCase.includes(searchTermLowerCase) ||
                priceLowerCase.includes(searchTermLowerCase)
            );
        }));
    }, [debouncedSearchTerm, cars]);

    const carsToShow = filteredCars.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handleDeleteButtonClick = (id: string) => {
        setCarIdToDelete(id);
        openDeleteModal();
    };

    const handleEditButtonClick = (car: Car) => {
        setCarToBeUpdated(car);
        openUpdateModal();
    };

    const addCar = (newCar: Car) => {
        setCars([...cars, newCar]);
        closeAddModal();
    };

    const updateCar = (updatedCar: Car) => {
        const newCars = cars.map((car) => {
            if (car.id === updatedCar.id) {
                return updatedCar;
            }
            return car;
        });
        setCars(newCars);
        closeUpdateModal();
    };

    const deleteCar = (id: string) => {
        const newCars = cars.filter((car) => car.id !== id);
        setCars(newCars);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    return (
        <>
            <Input
                onChange={onChangeSearchTerm}
                value={searchTerm}
                type="search"
                placeholder="Search"
            />
            <table className={styles.table}>
                <thead>
                    <tr>
                        {tableHeaders.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {carsToShow.map((car) => (
                        <CarsTableItem
                            key={car.id}
                            car={car}
                            onDelete={() => {
                                handleDeleteButtonClick(car.id);
                            }}
                            onEdit={() => {
                                handleEditButtonClick(car);
                            }}
                        />
                    ))}
                </tbody>
            </table>
            <div className={styles.pagination}>
                <Button
                    onClick={previousPage}
                    appearance="primary"
                >
                    {'<'}
                </Button>
                <span>
                    {currentPage + 1}/{totalPages}
                </span>
                <Button
                    onClick={nextPage}
                    appearance="primary"
                >
                    {'>'}
                </Button>
            </div>
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
            >
                <ConfirmForm
                    message="Are you sure you want to delete this car?"
                    onCancel={closeDeleteModal}
                    onConfirm={(e) => {
                        e.preventDefault();
                        deleteCar(carIdToDelete);
                        closeDeleteModal();
                    }}
                />
            </Modal>
            <Modal
                isOpen={isUpdateModalOpen}
                onClose={closeUpdateModal}
            >
                <CarsItemForm
                    onSubmit={updateCar}
                    car={carToBeUpdated}
                />
            </Modal>
            <Button
                onClick={openAddModal}
                appearance="edit"
            >
                Create Car
            </Button>
            <Modal
                isOpen={isAddModalOpen}
                onClose={closeAddModal}
            >
                <CarsItemForm
                    car={null}
                    onSubmit={addCar}
                />
            </Modal>
        </>
    );
}

export default CarsTable;
