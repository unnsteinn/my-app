'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { getMeals, getOrGeneratePrice, Meal, OrderItem } from '@/lib/utils';

interface CarouselWithMealsProps {
    onOrderMeal: (meal: OrderItem) => void;
}

export function CarouselWithMeals({ onOrderMeal }: CarouselWithMealsProps) {
    const [meals, setMeals] = useState<Meal[]>([]);

    useEffect(() => {
        async function fetchMeals() {
            const mealsData = await getMeals();
            setMeals(mealsData);
        }
        fetchMeals();
    }, []);

    const handleOrderClick = (meal: Meal) => {
        const mealWithPrice: OrderItem = {
            id: meal.idMeal,
            name: meal.strMeal,
            price: getOrGeneratePrice(meal.idMeal),
            amount: 1,
            thumbnail: meal.strMealThumb,
        };
        onOrderMeal(mealWithPrice);
    };

    return (
        <div className="w-9/12">
            <Carousel className="flex items-center">
                <CarouselContent>
                    {meals.map((meal) => {
                        const randomPrice = getOrGeneratePrice(meal.idMeal);
                        return (
                            <CarouselItem key={meal.idMeal}>
                                <div className="p-1">
                                    <Card className="p-1">
                                        <CardHeader>
                                            <div>
                                                <CardTitle className="text-center pb-4">
                                                    {meal.strMeal}
                                                </CardTitle>
                                                <CardContent className="flex justify-center">
                                                    <Image
                                                        src={meal.strMealThumb}
                                                        alt="Meal Thumbnail"
                                                        width={200}
                                                        height={200}
                                                    />
                                                </CardContent>
                                                <CardFooter className="flex-col gap-3">
                                                    <h4>{randomPrice}kr.</h4>
                                                    <Button
                                                        variant={'secondary'}
                                                        onClick={() => handleOrderClick(meal)}
                                                    >
                                                        Order
                                                    </Button>
                                                </CardFooter>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
