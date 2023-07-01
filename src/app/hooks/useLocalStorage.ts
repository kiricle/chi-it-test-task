'use client';
import { useState, useEffect } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T) {
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = useState<T>(() =>
        initialValue
    );

    useEffect(() => {
        setValue(getStorageValue(key, initialValue));
        setIsLoading(false);
    }, [key, initialValue]);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue, isLoading] as const;
}

function getStorageValue<T>(key: string, defaultValue: T): T {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : defaultValue;
}
