import { FC } from 'react';
import styles from './Footer.module.scss';

const Footer: FC = () => {
    return (
        <footer className={styles.footer}>
            <h2>&copy; 2023-{new Date().getFullYear()} Kyrylo Kolotylo</h2>
        </footer>
    );
};

export default Footer;