import { Clock, Edit3, ExternalLink, FileText, Save, Users, Utensils } from "lucide-react";
import { useState } from "react";
import type { Recipe } from "../../types/recipe";

type Props = {
  recipe: Recipe | null;
};

export function RecipeDetail({ recipe }: Props) {
  // Local state for notes. Later this can be saved to backend/Cosmos DB.
  const [notes, setNotes] = useState("");

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
      {/* Hero image section */}
      <div className="recipe-hero-wrap">
        <img className="recipe-hero" src={recipe.imageUrl} alt={recipe.title} />

        {/* Floating action buttons */}
        <div className="hero-actions">
          <button><Edit3 size={16} /> Edit</button>
          <button><ExternalLink size={16} /> Source</button>
        </div>
      </div>

      <div className="recipe-detail-inner">
        <h1>{recipe.title}</h1>

        {/* Quick recipe facts */}
        <div className="recipe-meta">
          <span><Clock size={16} /> Prep: {recipe.prepTime ?? "N/A"}</span>
          <span><Clock size={16} /> Cook: {recipe.cookTime ?? recipe.totalTime}</span>
          <span><Users size={16} /> {recipe.servings ?? "?"}</span>
        </div>

        {/* Nutrition card */}
        <div className="nutrition-box">
          <p className="nutrition-title">Nutrition Info</p>

          <div className="nutrition-grid">
            {Object.entries(recipe.nutrition).map(([label, value]) => (
              <div key={label}>
                <small>{label}</small>
                <strong>{value ?? "null"}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients and method */}
        <div className="recipe-content">
          <section>
            <h2><Utensils size={22} /> Ingredients</h2>

            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Method</h2>

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

        {/* Personal notes */}
        <section className="notes-section">
          <h2><FileText size={22} /> Personal Notes</h2>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your own notes, tips, or variations here..."
          />

          <button className="save-notes-btn">
            <Save size={16} /> Save Notes
          </button>
        </section>
      </div>
    </article>
    </div>
  );
}