import type { Recipe } from "../../types/recipe";

type Props = {
  recipe: Recipe | null;
};

export function RecipeDetail({ recipe }: Props) {
  if (!recipe) {
    return <p>Select a recipe</p>;
  }

  return (
    <section>
      <h1>{recipe.title}</h1>
      <img src={recipe.imageUrl} alt={recipe.title} width="300" />
      <p>{recipe.totalTime}</p>
    </section>
  );
}