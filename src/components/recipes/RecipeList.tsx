import type { Recipe } from "../../types/recipe";
import { RecipeCard } from "./RecipeCard";

type Props = {
  recipes: Recipe[];
  selectedRecipeId?: string;
  onSelectRecipe: (recipe: Recipe) => void;
};

export function RecipeList({ recipes, selectedRecipeId, onSelectRecipe }: Props) {
  return (
    <div className="recipe-list">
      
      {/* Top card: where user pastes URL */}
      <div className="add-recipe-card">
        
        {/* Input box for URL */}
        <input
          placeholder="Paste recipe URL..."
          className="recipe-input"
        />

        {/* Button (we'll wire functionality later) */}
        <button className="add-recipe-btn">
          + Add Recipe
        </button>
      </div>

      {/* Section title */}
      <div className="all-recipes-header">
        <span>ALL RECIPES</span>
        <span className="recipe-count">{recipes.length}</span>
      </div>

      {/* Loop through recipes and render cards */}
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