import { useState } from 'react';

export default function usePagination<T>(allItems: T[], itemsPerPage: number) {
    const totalPages = Math.ceil((allItems.length - 1) / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(0);

    const nextPage = () => {
        setCurrentPage((prev) => {
            if (prev + 1 < totalPages) {
                return prev + 1;
            }

            return 0;
        });
    };

    const previousPage = () => {
        setCurrentPage((prev) => {
            if (prev > 0) {
                return prev - 1;
            }

            return totalPages - 1;
        });
    };

    return [totalPages, currentPage, nextPage, previousPage] as const;
}
