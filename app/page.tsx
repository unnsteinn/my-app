'use client';

import React, { useState, useEffect } from 'react';
import { CarouselWithMeals } from '@/components/carousel-with-meals';
import OrderSummary from '@/components/order-summary';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { addItem, OrderItem, removeItem, storeItems, getStoredItems } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FoundOrderCard } from '@/components/found-order-card';

type ItemsResponse = { email: string; items: OrderItem[]; date: string };

export default function Home() {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [orderNotFoundError, setOrderNotFoundError] = useState<string>('');
    const [orderedItems, setOrderedItems] = useState<OrderItem[]>([]);
    const [savedOrders, setSavedOrders] = useState<Record<string, ItemsResponse> | undefined>();
    const [showFoundOrder, setShowFoundOrder] = useState<boolean>(true);
    const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});

    useEffect(() => {
        setOrderedItems(getStoredItems());
    }, []);

    const handleToggleExpand = (timestamp: string) => {
        setExpandedOrders((prevExpandedOrders) => {
            return {
                ...prevExpandedOrders,
                [timestamp]: !prevExpandedOrders[timestamp],
            };
        });
    };

    const handleCloseFoundOrder = () => {
        setShowFoundOrder(false);
    };
    const handleOrderMeal = (meal: OrderItem) => {
        setOrderedItems((prevOrderedItems) => addItem(prevOrderedItems, meal));
    };

    const handleRemoveItem = (idMeal: string) => {
        setOrderedItems((prevState) => removeItem(prevState, idMeal));
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        setEmailError('');
        setOrderNotFoundError('');
        try {
            const orders = await axios.get<Record<string, ItemsResponse>>(
                `/api/order?email=${email}`
            );
            if (Object.keys(orders.data).length === 0) {
                setOrderNotFoundError('No order found with this email address');
            } else {
                setSavedOrders(orders.data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrderNotFoundError('No order found with this email address');
        }
    };

    return (
        <div className="flex-cols lg:grid grid-cols-6 justify-center">
            <div className="flex px-0 pb-4 justify-center lg:px-4 col-span-3">
                <CarouselWithMeals onOrderMeal={handleOrderMeal} />
            </div>
            <div className="flex pb-4 justify-center lg:col-span-3">
                <OrderSummary items={orderedItems} onRemoveItem={handleRemoveItem}>
                    <div className="flex justify-center">
                        <Link href="/drinks">
                            <Button variant="secondary" onClick={() => storeItems(orderedItems)}>
                                Next
                            </Button>
                        </Link>
                    </div>
                </OrderSummary>
            </div>
            <div className="w-full pb-4 text-center lg:col-span-2 lg:px-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="pb-4">Find my order</CardTitle>
                        <form onSubmit={handleSubmit}>
                            <div className="pb-4">
                                <Input
                                    className="text-black"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {emailError && <p className="text-red-500">{emailError}</p>}
                                {orderNotFoundError && (
                                    <p className="text-red-500">{orderNotFoundError}</p>
                                )}
                            </div>
                            <Button variant="secondary" type="submit">
                                Submit
                            </Button>
                        </form>
                    </CardHeader>
                </Card>
            </div>
            <div className="flex-col justify-center lg:col-span-4">
                {showFoundOrder &&
                    savedOrders &&
                    Object.values(savedOrders).map((order) => (
                        <div className="pb-4">
                            <FoundOrderCard
                                key={order.date}
                                orderDate={order.date}
                                items={order.items}
                                expanded={!!expandedOrders[order.date]}
                                onToggleExpand={() => handleToggleExpand(order.date)}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}
