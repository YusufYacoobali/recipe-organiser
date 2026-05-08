import {
  Activity,
  ChefHat,
  Clock,
  Edit3,
  ExternalLink,
  FileText,
  Save,
  Users,
  Utensils,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Recipe } from "../../types/recipe";

type Props = {
  recipe: Recipe | null;
  onSaveNotes: (recipeId: string, notes: string) => void;
};

export function RecipeDetail({ recipe, onSaveNotes }: Props) {
  // Draft form state. The saved version lives on the recipe object in App.tsx.
  const [notesDraft, setNotesDraft] = useState("");

  //useEffect is used to update the local notes textbox when the selected recipe changes, because notesDraft does not automatically update when a new recipe prop is passed in.
  useEffect(() => {
    setNotesDraft(recipe?.notes ?? "");
  }, [recipe?.id, recipe?.notes]);

  if (!recipe) {
    return (
      <div className="empty-state">
        <h2>Select a recipe</h2>
        <p>Choose a recipe from your collection to view the full details.</p>
      </div>
    );
  }

  return (
    <div className="recipe-detail-wrapper">
      <article className="recipe-detail">
        <div className="recipe-hero-wrap">
          <img className="recipe-hero" src={recipe.imageUrl} alt={recipe.title} />

          <div className="hero-actions">
            <button>
              <Edit3 size={16} /> Edit
            </button>
            <button>
              <ExternalLink size={16} /> Source
            </button>
          </div>
        </div>

        <div className="recipe-detail-inner">
          <h1>{recipe.title}</h1>

          <div className="recipe-meta">
            <span>
              <Clock size={16} /> Prep: {recipe.prepTime ?? "N/A"}
            </span>
            <span>
              <Clock size={16} /> Cook: {recipe.cookTime ?? recipe.totalTime}
            </span>
            <span>
              <Users size={16} /> {recipe.servings ?? "?"}
            </span>
          </div>

          <div className="nutrition-box">
            <p className="nutrition-title">
              <Activity size={16} />
              Nutrition Info
            </p>

            <div className="nutrition-grid">
              {Object.entries(recipe.nutrition).map(([label, value]) => (
                <div key={label}>
                  <small>{label}</small>
                  <strong>{value ?? "null"}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="recipe-content">
            <section>
              <h2>
                <Utensils size={22} /> Ingredients
              </h2>

              <ul className="ingredients-list">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2>
                <ChefHat size={22} /> Method
              </h2>

              <ol className="method-list">
                {recipe.method.map((step, index) => (
                  <li key={step}>
                    <span>{index + 1}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <section className="notes-section">
            <h2>
              <FileText size={22} /> Personal Notes
            </h2>

            <textarea
              value={notesDraft}
              onChange={(e) => setNotesDraft(e.target.value)}
              placeholder="Add your own notes, tips, or variations here..."
            />

            <button
              className="save-notes-btn"
              onClick={() => onSaveNotes(recipe.id, notesDraft)}
            >
              <Save size={16} /> Save Notes
            </button>
          </section>
        </div>
      </article>
    </div>
  );
}
