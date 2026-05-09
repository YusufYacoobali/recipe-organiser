export type RecipeFolder = string;

export type Recipe = {
  id: string;
  title: string;
  imageUrl: string;
  folder: RecipeFolder;
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
