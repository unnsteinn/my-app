import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface Meal {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strMealThumb: string;
}

export async function getMeals(): Promise<Meal[]> {
    const mealPromises = Array.from({ length: 10 }, () =>
        fetch('https://themealdb.com/api/json/v1/1/random.php').then((res) => res.json())
    );

    const mealResults = await Promise.all(mealPromises);
    console.log(mealResults);
    return mealResults.flatMap((result) => result.meals);
}

export function generateRandomPrice(minPrice = 2000, maxPrice = 3500) {
    return Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
}

export function getOrGeneratePrice(
    id: string,
    { minPrice = 2000, maxPrice = 3500 }: { minPrice?: number; maxPrice?: number } = {}
): number {
    const storedPrices = JSON.parse(localStorage.getItem('itemPrices') || '{}');

    if (storedPrices[id]) {
        return storedPrices[id];
    } else {
        const newPrice = generateRandomPrice(minPrice, maxPrice);
        storedPrices[id] = newPrice;
        localStorage.setItem('itemPrices', JSON.stringify(storedPrices));
        return newPrice;
    }
}

export interface Drink {
    strDrink: string;
    idDrink: string;
    strCategory: string;
    strAlcoholic: string;
    strDrinkThumb: string;
    strIngredient1: string | null;
    strIngredient2: string | null;
    strIngredient3: string | null;
    strIngredient4: string | null;
    strIngredient5: string | null;
    strIngredient6: string | null;
    strIngredient7: string | null;
    strIngredient8: string | null;
    strIngredient9: string | null;
    strIngredient10: string | null;
    strIngredient11: string | null;
    strIngredient12: string | null;
    strIngredient13: string | null;
    strIngredient14: string | null;
    strIngredient15: string | null;
}

export interface Response {
    drinks: Drink[];
}

export interface OrderItem {
    id: string;
    name: string;
    price: number;
    amount: number;
    thumbnail: string;
}

export const storeItems = (items: OrderItem[]) => {
    localStorage.setItem('items', JSON.stringify(items));
};

export const getStoredItems = (): OrderItem[] => {
    return JSON.parse(localStorage.getItem('items') ?? '[]') as OrderItem[];
};

export const addItem = (items: OrderItem[], item: OrderItem) => {
    const itemExistsInOrder = items.some((prevItem) => prevItem.id === item.id);
    if (itemExistsInOrder) {
        return items.map((preItem) => {
            if (preItem.id === item.id) {
                return {
                    ...preItem,
                    amount: preItem.amount + 1,
                };
            }
            return preItem;
        });
    }
    return [...items, item];
};

export const removeItem = (items: OrderItem[], id: string) => {
    return items
        .map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    amount: item.amount - 1,
                };
            }
            return item;
        })
        .filter((meal) => meal.amount > 0);
};

export async function getDrinks(): Promise<Drink[]> {
    const drinkPromises = Array.from({ length: 10 }, () =>
        axios.get<Response>('https://thecocktaildb.com/api/json/v1/1/random.php')
    );
    const drinkResult = await Promise.all(drinkPromises);
    return drinkResult.flatMap((result) => result.data.drinks);
}
