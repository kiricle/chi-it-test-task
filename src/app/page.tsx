import CarsTable from './components/CarsTable/CarsTable';
import Car from './interfaces/Car';
import styles from './page.module.scss';

export default async function Home() {
    const carsData = await fetch('https://myfakeapi.com/api/cars/');

    const  {cars}: {
        cars: Car[]
    }  = await carsData.json();


    return (
        <main className={styles.main}>
            <h1 className={styles.title}>CHI IT Test Task!</h1>
            <CarsTable cars={cars} />
        </main>
    );
}
