import React from 'react';
import { getDrinks } from '@/lib/utils';
import { OrderDrinks } from '@/components/OrderDrinks';

export default async function Drinks() {
    const drinks = await getDrinks();
    return <OrderDrinks drinks={drinks} />;
}
