import { useState } from "react"

/**
 * Хук запроса
 * @param {function(...args)} callback - Колбек запроса 
 * @param {boolean} initStatusLoadnig - Начальный статус загрузки
 * @returns {Array<function, boolean, object>} Колбек запроса, идёт ли запрос, ошибка
 */
export const useFetch = (callback, initStatusLoadnig = false) => {
    const [isLoading, setIsLoading] = useState(!!initStatusLoadnig);
    const [error, setError] = useState('');

    const fetching = async () => {
        try {
            setIsLoading(true);
            await callback();
        }
        catch (e) {
            setError(e);
        }
        finally {
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error]
}

