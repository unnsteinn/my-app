'use client';
import React, { useState } from 'react';
import { CarouselWithMeals } from '@/components/carousel-with-meals';
import OrderSummary from '@/components/order-summary';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { addItem, OrderItem, removeItem, storeItems } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import axios from 'axios';

type ItemsResponse = { email: string; items: OrderItem[]; date: string };

export default function Home() {
    const [email, setEmail] = useState<string>('');
    const [orderedItems, setOrderedItems] = useState<OrderItem[]>([]);
    const [savedOrders, setSavedOrders] = useState<Record<string, ItemsResponse> | undefined>();

    const handleOrderMeal = (meal: OrderItem) => {
        setOrderedItems((prevOrderedItems) => addItem(prevOrderedItems, meal));
    };

    const handleRemoveItem = (idMeal: string) => {
        setOrderedItems((prevState) => removeItem(prevState, idMeal));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-center">
            <div className="flex justify-center">
                <CarouselWithMeals onOrderMeal={handleOrderMeal} />
            </div>
            <div className="flex justify-center">
                <OrderSummary items={orderedItems} onRemoveItem={handleRemoveItem}>
                    <div className="mt-4 flex justify-center">
                        <Link href="/drinks">
                            <Button onClick={() => storeItems(orderedItems)}>Next</Button>
                        </Link>
                    </div>
                </OrderSummary>
            </div>
            <div className="flex justify-center">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button
                    onClick={async () => {
                        const orders = await axios.get<Record<string, ItemsResponse>>(
                            `/api/order?email=${email}`
                        );
                        setSavedOrders(orders.data);
                    }}
                />
            </div>
            <div className="flex justify-center">
                {savedOrders &&
                    Object.values(savedOrders).map((order) => (
                        <div key={order.date}>
                            <span>{order.date}</span>
                            {order.items.map((order) => (
                                <div key={order.id}>
                                    <span>{order.name}</span>
                                    <span>{order.price}</span>
                                </div>
                            ))}
                        </div>
                    ))}
            </div>
        </div>
    );
}
