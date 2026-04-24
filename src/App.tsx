import { useState } from "react";
import { mockRecipes } from "./data/mockRecipes";
import type { Recipe } from "./types/recipe";
import { RecipeList } from "./components/recipes/RecipeList";
import { RecipeDetail } from "./components/recipes/RecipeDetail";
import { AppHeader } from "./components/layout/AppHeader";
import { Sidebar } from "./components/layout/Sidebar";
import "./App.css";

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <div className="app">
      <AppHeader />

      <div className="app-body">
        <Sidebar />

        <main className="recipe-list-column">
          <RecipeList
            recipes={mockRecipes}
            selectedRecipeId={selectedRecipe?.id}
            onSelectRecipe={setSelectedRecipe}
          />
        </main>

        <section className="recipe-detail-column">
          <RecipeDetail recipe={selectedRecipe} />
        </section>
      </div>
    </div>
  );
}

export default App;