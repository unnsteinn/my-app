import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import axios from 'axios';

export interface OrderedMeal {
    idMeal: string;
    strMeal: string;
    price: number;
    strMealThumb: string;
}

interface OrderSummaryProps {
    orderedMeals: OrderedMeal[];
    onRemoveMeal: (idMeal: string) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderedMeals, onRemoveMeal }) => {
    const totalCost = orderedMeals.reduce((total, meal) => total + meal.price, 0);

    const completeOrder = () => {
        axios
            // API key missing
            .post('/api/storeOrder', { orderedMeals })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error storing order:', error);
            });
    };

    return (
        <Card className="w-9/12">
            <CardHeader>
                <CardTitle className="text-center">Your Orders</CardTitle>
            </CardHeader>
            <CardContent>
                {orderedMeals.length === 0 ? (
                    <p>No meals ordered yet.</p>
                ) : (
                    <div>
                        {orderedMeals.map((meal, index) => (
                            <div
                                key={`${index}-${Math.random()}`}
                                className="flex justify-between items-center py-2 border-b"
                            >
                                <span>
                                    <img
                                        src={meal.strMealThumb}
                                        alt={meal.strMeal}
                                        className="w-16 h-16 object-cover"
                                    />
                                </span>
                                <span className="flex-1 mx-4 truncate">{meal.strMeal}</span>
                                <span className="mr-4">{meal.price}kr.</span>
                                <Button
                                    variant="destructive"
                                    onClick={() => onRemoveMeal(meal.idMeal)}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <div className="flex justify-between pt-4">
                            <span>Total Cost:</span>
                            <span>{totalCost}kr.</span>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Link href="/complete-order">
                                <Button onClick={completeOrder}>Complete Order</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default OrderSummary;
