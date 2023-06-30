import CarsTable from './components/CarsTable/CarsTable';
import styles from './page.module.scss';

export default async function Home() {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>CHI IT Test Task!</h1>
            <CarsTable />
        </main>
    );
}
