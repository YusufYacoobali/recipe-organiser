import type { Recipe } from "../types/recipe";

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Butter Chicken (Murgh Makhani)",
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    folder: "Dinner",
    totalTime: "45-60 minutes",
    prepTime: "15 minutes",
    cookTime: "35 minutes",
    servings: 4,
    nutrition: {
      carbs: "12g",
      salt: "1.2g",
      fat: "28g",
      protein: "32g",
      calories: "520kcal",
    },
    ingredients: ["Chicken", "Butter", "Cream", "Tomatoes", "Spices"],
    method: [
      "Cook the chicken until browned.",
      "Make the tomato and cream sauce.",
      "Simmer everything together until rich and creamy.",
    ],
  },
];