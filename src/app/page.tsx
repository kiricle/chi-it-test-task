import { Suspense } from 'react';
import CarsTable from './components/CarsTable/CarsTable';
import fetchAllCars from './lib/fetchAllCars';
import styles from './page.module.scss';

export default async function Home() {
    const carsData = fetchAllCars();

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>
                CHI IT Test Task!
            </h1>

            <Suspense fallback={<div>Loading...</div>}>
                {/* @ts-expect-error Server Component */}
                <CarsTable promise={carsData} />
            </Suspense>
        </main>
    );
}
