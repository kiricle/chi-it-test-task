'use client';
import useLocalStorage from '@/app/hooks/useLocalStorage';
import usePagination from '@/app/hooks/usePagination';
import Car from '@/app/interfaces/Car';
import fetchAllCars from '@/app/lib/fetchAllCars';
import Button from '@/app/ui/Button';
import { useEffect, useMemo } from 'react';
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

    const itemsPerPage = 15;
    const initialCars: Car[] = useMemo(() => [], []);
    const [cars, setCars] = useLocalStorage<Car[]>('cars', initialCars);
    const [totalPages, currentPage, nextPage, previousPage] =
        usePagination(cars, itemsPerPage);

    useEffect(() => {
        if (cars.length === 0) {
            fetchAllCars().then(({ cars }) => {
                console.log('Fetched cars', cars);
                setCars(cars);
            });
        }
    });

    const carsToShow = cars?.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const tableHeader = tableHeaders.map((header) => (
        <th key={header}>{header}</th>
    ));

    const tableContent = carsToShow.map((car) => (
        <CarsTableItem
            key={car.id}
            car={car}
        />
    ));

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>{tableHeader}</tr>
                </thead>
                <tbody>{tableContent}</tbody>
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
        </>
    );
}

export default CarsTable;
