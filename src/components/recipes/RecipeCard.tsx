import { Clock } from "lucide-react";
import type { Recipe } from "../../types/recipe";

type Props = {
  recipe: Recipe;
  isSelected: boolean;
  onSelect: () => void;
};

export function RecipeCard({ recipe, isSelected, onSelect }: Props) {
  return (
    <button
      // Click handler comes from RecipeList/App, so this card stays reusable.
      onClick={onSelect}
      className={`recipe-card ${isSelected ? "selected" : ""}`}
    >
      <img src={recipe.imageUrl} alt={recipe.title} />

      <div className="recipe-info">
        <strong>{recipe.title}</strong>
        <span>
          <Clock size={13} />
          {recipe.totalTime}
        </span>
      </div>
    </button>
  );
}
