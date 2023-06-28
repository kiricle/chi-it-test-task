import Car from "@/app/interfaces/Car";

export default interface CarsTableProps {
    promise: Promise<{
        cars: Car[];
    }>;
}


