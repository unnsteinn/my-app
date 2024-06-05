import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { OrderItem } from '@/lib/utils';

interface FoundOrderCardProps {
    orderDate: string;
    items: OrderItem[];
    expanded: boolean;
    onToggleExpand: () => void;
}

export const FoundOrderCard: React.FC<FoundOrderCardProps> = ({
    orderDate,
    items,
    expanded,
    onToggleExpand,
}) => {
    const totalCost = items.reduce((total, item) => total + item.price * item.amount, 0);

    return (
        <Card onClick={onToggleExpand} className="w-full">
            <CardHeader>
                <CardTitle className="text-center cursor-pointer">
                    Order Found<p className="pt-1 text-sm">{orderDate}</p>
                </CardTitle>
            </CardHeader>
            {expanded && (
                <CardContent className="overflow-y-auto">
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
                                        {item.amount} <span>x</span>
                                    </>
                                )}
                                {item.name}
                            </span>
                            <span className="mr-4">{item.price * item.amount}kr.</span>
                        </div>
                    ))}
                    <div className="flex justify-between pt-4">
                        <span className="font-bold">Total Cost:</span>
                        <span className="mr-4 font-bold">{totalCost}kr.</span>
                    </div>
                </CardContent>
            )}
        </Card>
    );
};
