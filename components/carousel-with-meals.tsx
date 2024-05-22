"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { OrderedMeal } from "@/components/order-summary"; // Import the OrderedMeal interface
import next from "next";

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
}

async function getMeals(): Promise<Meal[]> {
  const mealPromises = Array.from({ length: 10 }, () =>
    fetch("https://themealdb.com/api/json/v1/1/random.php").then((res) =>
      res.json()
    )
  );

  const mealResults = await Promise.all(mealPromises);
  return mealResults.flatMap((result) => result.meals);
}

function generateRandomPrice(minPrice = 2000, maxPrice = 3500) {
  return Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
}

function getOrGeneratePrice(mealId: string): number {
  const storedPrices = JSON.parse(localStorage.getItem("mealPrices") || "{}");

  if (storedPrices[mealId]) {
    return storedPrices[mealId];
  } else {
    const newPrice = generateRandomPrice();
    storedPrices[mealId] = newPrice;
    localStorage.setItem("mealPrices", JSON.stringify(storedPrices));
    return newPrice;
  }
}

interface CarouselWithMealsProps {
  onOrderMeal: (meal: OrderedMeal) => void;
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
    const mealWithPrice: OrderedMeal = {
      ...meal,
      price: getOrGeneratePrice(meal.idMeal),
    };
    onOrderMeal(mealWithPrice);
  };

  return (
    <Carousel className="w-9/12">
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
                          variant={"secondary"}
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
  );
}
