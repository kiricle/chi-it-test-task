import Car from '@/app/interfaces/Car';

export default async function fetchAllCars(): Promise<Car[]> {
    const response = await fetch('https://myfakeapi.com/api/cars/');

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}
