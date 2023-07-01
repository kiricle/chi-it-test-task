import { FC } from 'react';
import styles from './Input.module.scss';
import InputProps from './Input.props';

const Input: FC<InputProps> = ({ className = '', ...props }) => {
    return (
        <input
            {...props}
            className={`${styles.input} ${className}`}
        />
    );
};

export default Input;
