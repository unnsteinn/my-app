"use client";
import React, { useState } from "react";
import { CarouselWithMeals } from "@/components/carousel-with-meals";
import OrderSummary, { OrderedMeal } from "@/components/order-summary";

export default function Home() {
  const [orderedMeals, setOrderedMeals] = useState<OrderedMeal[]>([]);

  const handleOrderMeal = (meal: OrderedMeal) => {
    setOrderedMeals((prevOrderedMeals) => [...prevOrderedMeals, meal]);
  };

  const handleRemoveMeal = (idMeal: string) => {
    setOrderedMeals((prevOrderedMeals) => {
      const indexToRemove = prevOrderedMeals.findIndex(
        (meal) => meal.idMeal === idMeal
      );
      if (indexToRemove !== -1) {
        const updatedMeals = [...prevOrderedMeals];
        updatedMeals.splice(indexToRemove, 1);
        return updatedMeals;
      }
      return prevOrderedMeals;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center">
      <div className="flex justify-center">
        <CarouselWithMeals onOrderMeal={handleOrderMeal} />
      </div>
      <div className="flex justify-center">
        <OrderSummary
          orderedMeals={orderedMeals}
          onRemoveMeal={handleRemoveMeal}
        />
      </div>
    </div>
  );
}
