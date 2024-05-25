'use client';

import { Card } from '@/components/ui/card';
import { DrinkCard } from '@/components/DrinkCard';
import React, { useState } from 'react';
import { addItem, Drink, getStoredItems, OrderItem, removeItem, storeItems } from '@/lib/utils';
import OrderSummary from '@/components/order-summary';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const OrderDrinks = ({ drinks }: { drinks: Drink[] }) => {
    const [orderedItems, setOrderedItems] = useState<OrderItem[]>(getStoredItems());

    const handleRemoveMeal = (idMeal: string) => {
        setOrderedItems((prevState) => removeItem(prevState, idMeal));
    };

    const handleDrinkOrder = (drink: OrderItem) => {
        setOrderedItems((prevOrderedDrinks) => addItem(prevOrderedDrinks, drink));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-center">
            <Card>
                {drinks.map((drink) => (
                    <DrinkCard key={drink.idDrink} drink={drink} onOrderDrink={handleDrinkOrder} />
                ))}
            </Card>
            <OrderSummary items={orderedItems} onRemoveItem={handleRemoveMeal}>
                <div className="mt-4 flex justify-center">
                    <Link href="/">
                        <Button>Back</Button>
                    </Link>
                    <Link href="/my-order">
                        <Button onClick={() => storeItems(orderedItems)}>Next</Button>
                    </Link>
                </div>
            </OrderSummary>
        </div>
    );
};
