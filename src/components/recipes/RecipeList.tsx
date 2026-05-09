import { Plus, Search } from "lucide-react";
import type { Recipe } from "../../types/recipe";
import { RecipeCard } from "./RecipeCard";

type Props = {
  title: string;
  recipes: Recipe[];
  selectedRecipeId?: string;
  onSelectRecipe: (recipe: Recipe) => void;

  // Search value comes from App.tsx.
  searchText: string;

  // Function to update search value in App.tsx.
  onSearchTextChange: (value: string) => void;
};

export function RecipeList({
  title,
  recipes,
  selectedRecipeId,
  onSelectRecipe,
  searchText,
  onSearchTextChange,
}: Props) {
  return (
    <div className="recipe-list">
      <div className="add-recipe-card">
        {/* Controlled input: React controls the value. */}
        <div className="recipe-input-wrap">
          <input
            value={searchText}
            onChange={(event) => onSearchTextChange(event.target.value)}
            placeholder="Paste recipe URL..."
            className="recipe-input"
          />
          <Search size={18} />
        </div>

        <button className="add-recipe-btn">
          <Plus size={18} />
          Add Recipe
        </button>
      </div>

      <div className="all-recipes-header">
        <span>{title}</span>
        <span className="recipe-count">{recipes.length}</span>
      </div>

      {/* Render one RecipeCard per recipe in the filtered list. */}
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isSelected={selectedRecipeId === recipe.id}
          // Child tells parent which recipe was clicked.
          onSelect={() => onSelectRecipe(recipe)}
        />
      ))}
    </div>
  );
}
