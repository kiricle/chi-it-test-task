import styles from './CarsTable.module.scss';
import CarsTableProps from './CarsTable.props';
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

async function CarsTable({ promise }: CarsTableProps) {
    const { cars } = await promise;

    const carsToShow = cars.slice(0, 10);

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
        <table className={styles.table}>
            <thead>
                <tr>{tableHeader}</tr>
            </thead>
            <tbody>{tableContent}</tbody>
        </table>
    );
}

export default CarsTable;
