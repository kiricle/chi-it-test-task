import styles from './page.module.scss';

export default function Home() {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>
                <a href="https://nextjs.org">CHI IT Test Task!</a>
            </h1>
        </main>
    );
}
