// User-created folder names are dynamic, so this is a string.
export type RecipeFolder = string;

export type Recipe = {
  id: string;
  title: string;
  imageUrl: string;
  folder?: RecipeFolder; // Optional: missing folders display as "No assigned".
  prepTime?: string;
  cookTime?: string;
  servings?: string;
  totalTime: string;
  nutrition: {
    calories: number | null;
    protein: number | null;
    sugars: number | null;
    carbs: number | null;
    fat: number | null;
  };
  ingredients: string[];
  method: string[];
  notes: string;
  sourceUrl?: string;
};
