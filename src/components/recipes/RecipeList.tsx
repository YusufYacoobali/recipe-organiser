import type { Recipe } from "../../types/recipe";
import { RecipeCard } from "./RecipeCard";

type Props = {
  recipes: Recipe[];
  selectedRecipeId?: string;
  onSelectRecipe: (recipe: Recipe) => void;

  // Search value comes from App.tsx
  searchText: string;

  // Function to update search value in App.tsx
  onSearchTextChange: (value: string) => void;
};

export function RecipeList({
  recipes,
  selectedRecipeId,
  onSelectRecipe,
  searchText,
  onSearchTextChange,
}: Props) {
  return (
    <div className="recipe-list">
      <div className="add-recipe-card">
        {/* Controlled input: React controls the value */}
        <input
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
          placeholder="Search recipes..."
          className="recipe-input"
        />

        <button className="add-recipe-btn">+ Add Recipe</button>
      </div>

      <div className="all-recipes-header">
        <span>ALL RECIPES</span>
        <span className="recipe-count">{recipes.length}</span>
      </div>

      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isSelected={selectedRecipeId === recipe.id}
          onSelect={() => onSelectRecipe(recipe)}
        />
      ))}
    </div>
  );
}