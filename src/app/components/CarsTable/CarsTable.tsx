import Car from '@/app/interfaces/Car';
import CarsTableProps from './CarsTable.props';

async function CarsTable({ promise }: CarsTableProps) {
    const {cars} = await promise;

    const carsToShow = cars.slice(0, 10);

    const tableHeader = (
        <tr>
            <th>Company</th>
            <th>Model</th>
            <th>Year</th>
            <th>VIN</th>
            <th>Color</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Actions</th>
        </tr>
    );

    const tableContent = carsToShow.map((car) => {
        return (
            <tr key={car.id}>
                <td>{car.car}</td>
                <td>{car.car_model}</td>
                <td>{car.car_model_year}</td>
                <td>{car.car_vin}</td>
                <td>{car.car_color}</td>
                <td>{car.price}</td>
                <td>{car.availability}</td>
                <td>
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
            </tr>
        );
    });

    return (
        <table>
            {tableHeader}
            {cars && tableContent}
        </table>
    );
}

export default CarsTable;
