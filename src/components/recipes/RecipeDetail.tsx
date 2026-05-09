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
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Recipe, RecipeFolder } from "../../types/recipe";

type Props = {
  recipe: Recipe | null;
  folders: RecipeFolder[];
  onSaveNotes: (recipeId: string, notes: string) => void;
  onSaveRecipe: (recipe: Recipe) => void;
};

type EditDraft = {
  title: string;
  folder: RecipeFolder;
  imageUrl: string;
  sourceUrl: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: string;
  calories: string;
  protein: string;
  sugars: string;
  carbs: string;
  fat: string;
  ingredientsText: string;
  methodText: string;
};

const emptyDraft: EditDraft = {
  title: "",
  folder: "",
  imageUrl: "",
  sourceUrl: "",
  prepTime: "",
  cookTime: "",
  totalTime: "",
  servings: "",
  calories: "",
  protein: "",
  sugars: "",
  carbs: "",
  fat: "",
  ingredientsText: "",
  methodText: "",
};

function createEditDraft(recipe: Recipe | null): EditDraft {
  if (!recipe) {
    return emptyDraft;
  }

  return {
    title: recipe.title,
    folder: recipe.folder,
    imageUrl: recipe.imageUrl,
    sourceUrl: recipe.sourceUrl ?? "",
    prepTime: recipe.prepTime ?? "",
    cookTime: recipe.cookTime ?? "",
    totalTime: recipe.totalTime,
    servings: recipe.servings ?? "",
    calories: recipe.nutrition.calories?.toString() ?? "",
    protein: recipe.nutrition.protein?.toString() ?? "",
    sugars: recipe.nutrition.sugars?.toString() ?? "",
    carbs: recipe.nutrition.carbs?.toString() ?? "",
    fat: recipe.nutrition.fat?.toString() ?? "",
    ingredientsText: recipe.ingredients.join("\n"),
    methodText: recipe.method.join("\n"),
  };
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseNutritionValue(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  const numberValue = Number(trimmedValue);
  return Number.isNaN(numberValue) ? null : numberValue;
}

export function RecipeDetail({
  recipe,
  folders,
  onSaveNotes,
  onSaveRecipe,
}: Props) {
  // Draft form state. The saved version lives on the recipe object in App.tsx.
  const [notesDraft, setNotesDraft] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editDraft, setEditDraft] = useState<EditDraft>(emptyDraft);

  //useEffect is used to update the local notes textbox when the selected recipe changes, because notesDraft does not automatically update when a new recipe prop is passed in.
  useEffect(() => {
    setNotesDraft(recipe?.notes ?? "");
    setEditDraft(createEditDraft(recipe));
    setIsEditing(false);
  }, [recipe?.id, recipe?.notes]);

  function updateEditDraft(field: keyof EditDraft, value: string) {
    setEditDraft((currentDraft) => ({
      ...currentDraft,
      [field]: value,
    }));
  }

  function handleSourceClick() {
    if (!recipe?.sourceUrl) {
      return;
    }

    window.open(recipe.sourceUrl, "_blank", "noopener,noreferrer");
  }

  function handleCancelEdit() {
    setEditDraft(createEditDraft(recipe));
    setIsEditing(false);
  }

  function handleSaveEdit() {
    if (!recipe) {
      return;
    }

    const updatedRecipe: Recipe = {
      ...recipe,
      title: editDraft.title.trim() || recipe.title,
      folder: editDraft.folder || recipe.folder,
      imageUrl: editDraft.imageUrl.trim() || recipe.imageUrl,
      sourceUrl: editDraft.sourceUrl.trim() || undefined,
      prepTime: editDraft.prepTime.trim() || undefined,
      cookTime: editDraft.cookTime.trim() || undefined,
      totalTime: editDraft.totalTime.trim() || recipe.totalTime,
      servings: editDraft.servings.trim() || undefined,
      nutrition: {
        calories: parseNutritionValue(editDraft.calories),
        protein: parseNutritionValue(editDraft.protein),
        sugars: parseNutritionValue(editDraft.sugars),
        carbs: parseNutritionValue(editDraft.carbs),
        fat: parseNutritionValue(editDraft.fat),
      },
      ingredients: splitLines(editDraft.ingredientsText),
      method: splitLines(editDraft.methodText),
    };

    onSaveRecipe(updatedRecipe);
    setIsEditing(false);
  }

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
            <button onClick={() => setIsEditing(true)}>
              <Edit3 size={16} /> {isEditing ? "Editing" : "Edit"}
            </button>
            <button
              onClick={handleSourceClick}
              disabled={!recipe.sourceUrl}
              title={recipe.sourceUrl ? "Open recipe source" : "No source URL saved"}
            >
              <ExternalLink size={16} /> Source
            </button>
          </div>
        </div>

        <div className="recipe-detail-inner">
          {isEditing ? (
            <section className="edit-panel">
              <div className="edit-panel-header">
                <h2>Edit Recipe</h2>
                <div className="edit-actions">
                  <button className="secondary-action" onClick={handleCancelEdit}>
                    <X size={16} /> Cancel
                  </button>
                  <button className="primary-action" onClick={handleSaveEdit}>
                    <Save size={16} /> Save Recipe
                  </button>
                </div>
              </div>

              <div className="edit-form-grid">
                <label>
                  Title
                  <input
                    value={editDraft.title}
                    onChange={(e) => updateEditDraft("title", e.target.value)}
                  />
                </label>

                <label>
                  Servings
                  <input
                    value={editDraft.servings}
                    onChange={(e) => updateEditDraft("servings", e.target.value)}
                  />
                </label>

                <label>
                  Folder
                  <select
                    value={editDraft.folder}
                    onChange={(e) => updateEditDraft("folder", e.target.value)}
                  >
                    {folders.map((folder) => (
                      <option key={folder} value={folder}>
                        {folder}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Prep Time
                  <input
                    value={editDraft.prepTime}
                    onChange={(e) => updateEditDraft("prepTime", e.target.value)}
                  />
                </label>

                <label>
                  Cook Time
                  <input
                    value={editDraft.cookTime}
                    onChange={(e) => updateEditDraft("cookTime", e.target.value)}
                  />
                </label>

                <label>
                  Total Time
                  <input
                    value={editDraft.totalTime}
                    onChange={(e) => updateEditDraft("totalTime", e.target.value)}
                  />
                </label>

                <label>
                  Source URL
                  <input
                    value={editDraft.sourceUrl}
                    onChange={(e) => updateEditDraft("sourceUrl", e.target.value)}
                  />
                </label>

                <label className="wide-field">
                  Image URL
                  <input
                    value={editDraft.imageUrl}
                    onChange={(e) => updateEditDraft("imageUrl", e.target.value)}
                  />
                </label>
              </div>

              <div className="edit-nutrition-grid">
                {(["calories", "protein", "sugars", "carbs", "fat"] as const).map(
                  (field) => (
                    <label key={field}>
                      {field}
                      <input
                        inputMode="numeric"
                        value={editDraft[field]}
                        onChange={(e) => updateEditDraft(field, e.target.value)}
                      />
                    </label>
                  )
                )}
              </div>

              <div className="edit-textareas">
                <label>
                  Ingredients
                  <textarea
                    value={editDraft.ingredientsText}
                    onChange={(e) =>
                      updateEditDraft("ingredientsText", e.target.value)
                    }
                  />
                </label>

                <label>
                  Method
                  <textarea
                    value={editDraft.methodText}
                    onChange={(e) => updateEditDraft("methodText", e.target.value)}
                  />
                </label>
              </div>
            </section>
          ) : (
            <>
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
            </>
          )}

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
