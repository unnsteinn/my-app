import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';
import { OrderItem, storeItems } from '@/lib/utils';

interface OrderSummaryProps {
    items: OrderItem[];
    onRemoveItem: (itemId: string) => void;
    children?: React.ReactNode;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, onRemoveItem, children }) => {
    const totalCost = items.reduce((total, item) => total + (item.price * item.amount), 0);

    return (
        <Card className="w-9/12">
            <CardHeader>
                <CardTitle className="text-center">Your Orders</CardTitle>
            </CardHeader>
            <CardContent>
                {items.length === 0 ? (
                    <p>No orders yet.</p>
                ) : (
                    <div>
                        {items.map((item) => (
                            <div
                                key={`${item.id}-${item.price}`}
                                className="flex justify-between items-center py-2 border-b"
                            >
                                <span>
                                    <Image
                                        src={item.thumbnail}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover"
                                        width={200}
                                        height={200}
                                    />
                                </span>
                                <span className="flex items-center flex-1 mx-4 truncate gap-1">
                                    {item.amount > 1 && (
                                        <>
                                            {item.amount} <X className="h-2 w-2" />
                                        </>
                                    )}
                                    {item.name}
                                </span>
                                <span className="mr-4">{item.price * item.amount}kr.</span>
                                <Button variant="destructive" onClick={() => onRemoveItem(item.id)}>
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <div className="flex justify-between pt-4">
                            <span>Total Cost:</span>
                            <span>{totalCost}kr.</span>
                        </div>

                        {children}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default OrderSummary;
