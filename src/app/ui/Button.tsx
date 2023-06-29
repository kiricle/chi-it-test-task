import ButtonProps from './Button.props';
import styles from './Button.module.scss';

const Button = ({ appearance, children, ...props }: ButtonProps): JSX.Element => {
    return (
        <button
            {...props}
            className={`${styles.button} ${styles[appearance]}`}
        >
            {children}
        </button>
    );
};

export default Button;
