import { ChangeEvent, useState } from 'react';
export default function useInput<T>(initialValue: T) {
    const [value, setValue] = useState<T>(initialValue);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value as unknown as T);
    };

    return [value, onChange] as const;
}
