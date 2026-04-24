import type { Recipe } from "../../types/recipe";

type Props = {
  recipe: Recipe;
  isSelected: boolean;
  onSelect: () => void;
};

export function RecipeCard({ recipe, isSelected, onSelect }: Props) {
  return (
    <button
      onClick={onSelect}
      className={`recipe-card ${isSelected ? "selected" : ""}`}
    >
      {/* Left: image */}
      <img src={recipe.imageUrl} alt={recipe.title} />

      {/* Right: text */}
      <div className="recipe-info">
        <strong>{recipe.title}</strong>
        <span>{recipe.totalTime}</span>
      </div>
    </button>
  );
}