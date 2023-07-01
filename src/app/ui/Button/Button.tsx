import ButtonProps from './Button.props';
import styles from './Button.module.scss';

const Button = ({
    appearance,
    className = '',
    children,
    ...props
}: ButtonProps): JSX.Element => {
    return (
        <button
            {...props}
            className={`${styles.button} ${styles[appearance]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
