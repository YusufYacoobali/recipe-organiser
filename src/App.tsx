import { useState } from "react";
import { mockRecipes } from "./data/mockRecipes";
import type { Recipe } from "./types/recipe";
import { RecipeList } from "./components/recipes/RecipeList";
import { RecipeDetail } from "./components/recipes/RecipeDetail";
import { AppHeader } from "./components/layout/AppHeader";
import { Sidebar } from "./components/layout/Sidebar";
import "./App.css";

function App() {
  // Stores the recipe currently selected by the user
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Stores whatever the user types in the search box
  const [searchText, setSearchText] = useState("");

  // This is "derived data" — we don't store it in state because it can be calculated
  const filteredRecipes = mockRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="app">
      <AppHeader />

      <div className="app-body">
        <Sidebar />

        <main className="recipe-list-column">
          <RecipeList
            recipes={filteredRecipes}
            selectedRecipeId={selectedRecipe?.id}
            onSelectRecipe={setSelectedRecipe}
            searchText={searchText}
            onSearchTextChange={setSearchText}
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