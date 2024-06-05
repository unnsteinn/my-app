'use client';

import React, { useState, useEffect } from 'react';
import OrderSummary from '@/components/order-summary';
import { OrderItem, getStoredItems, removeItem } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

export default function MyOrder() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [orderedItems, setOrderedItems] = useState<OrderItem[]>([]);

    useEffect(() => {
        setOrderedItems(getStoredItems());
    }, []);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        setEmailError('');
        await axios.post('/api/order', {
            email,
            items: getStoredItems(),
            date: new Date().toLocaleDateString(),
        });
        router.push('/thanks-for-ordering');
    };

    const handleRemoveItem = (id: string) => {
        const updatedItems = removeItem(orderedItems, id);
        setOrderedItems(updatedItems);
    };

    return (
        <form onSubmit={handleSubmit}>
            <OrderSummary items={orderedItems} onRemoveItem={handleRemoveItem}>
                <div className="flex flex-col pt-4 items-center gap-5">
                    <Input
                        className="w-80 text-black"
                        placeholder="Please enter your email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="text-red-500">{emailError}</p>}
                    <Button variant="secondary" type="submit">
                        Complete order
                    </Button>
                </div>
            </OrderSummary>
        </form>
    );
}
