'use client';
import useLocalStorage from '@/app/hooks/useLocalStorage';
import usePagination from '@/app/hooks/usePagination';
import Car from '@/app/interfaces/Car';
import fetchAllCars from '@/app/lib/fetchAllCars';
import Button from '@/app/ui/Button';
import { useEffect, useMemo, useState } from 'react';
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

function CarsTable() {
    const [isDeleteModalOpen, openDeleteModal, closeDeleteModal] = useModal();
    const [carIdToDelete, setCarIdToDelete] = useState(0);

    const [isUpdateModalOpen, openUpdateModal, closeUpdateModal] = useModal();
    const [carToBeUpdated, setCarToBeUpdated] = useState<Car | null>(null);

    const itemsPerPage = 15;
    const initialCars: Car[] = useMemo(() => [], []);
    const [cars, setCars] = useLocalStorage<Car[]>('cars', initialCars);
    const [totalPages, currentPage, nextPage, previousPage] = usePagination(
        cars,
        itemsPerPage
    );

    const carsToShow = cars.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    useEffect(() => {
        if (cars.length === 0) {
            fetchAllCars().then(({ cars }) => {
                console.log('Fetched cars', cars);
                setCars(cars);
            });
        }
    });

    const handleDeleteButtonClick = (id: number) => {
        setCarIdToDelete(id);
        openDeleteModal();
    };

    const handleEditButtonClick = (car: Car) => {
        setCarToBeUpdated(car);
        openUpdateModal();
    };

    const updateCar = (id: number, updatedCar: Car) => {
        const newCars = cars.map((car) => {
            if (car.id === id) {
                return updatedCar;
            }
            return car;
        });
        setCars(newCars);
    };

    const deleteCar = (id: number) => {
        const newCars = cars.filter((car) => car.id !== id);
        setCars(newCars);
    };

    return (
        <>
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
                <CarsItemForm car={carToBeUpdated} />
            </Modal>
            <Button
                onClick={localStorage.clear}
                appearance="edit"
            >
                Clear localStorage
            </Button>
        </>
    );
}

export default CarsTable;
