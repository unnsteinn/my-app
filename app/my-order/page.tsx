'use client';
import React from 'react';
import OrderSummary from '@/components/order-summary';
import { getStoredItems } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

export default function MyOrder() {
    const { push } = useRouter();
    const [email, setEmail] = React.useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post('/api/order', {
            email,
            items: getStoredItems(),
            date: new Date().toLocaleDateString(),
        });
        push('/');
    };
    return (
        <form onSubmit={handleSubmit}>
            MyOrderPage!
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <OrderSummary items={getStoredItems()} onRemoveItem={() => {}}>
                <Button type="submit">Complete order</Button>
            </OrderSummary>
        </form>
    );
}
