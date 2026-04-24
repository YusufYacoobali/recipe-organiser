export type Recipe = {
  id: string;
  title: string;
  imageUrl: string;
  folder: "Dinner" | "Baking";
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  totalTime: string;
  nutrition: {
    carbs: string;
    salt: string;
    fat: string;
    protein: string;
    calories: string;
  };
  ingredients: string[];
  method: string[];
  sourceUrl?: string;
};