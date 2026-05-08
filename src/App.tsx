import { useState } from "react";
import { mockRecipes } from "./data/mockRecipes";
import type { Recipe, RecipeFolder } from "./types/recipe";
import { RecipeList } from "./components/recipes/RecipeList";
import { RecipeDetail } from "./components/recipes/RecipeDetail";
import { AppHeader } from "./components/layout/AppHeader";
import { Sidebar } from "./components/layout/Sidebar";
import "./App.css";

type FolderFilter = "All Recipes" | RecipeFolder;

function App() {
  // Stores the recipe currently selected by the user.
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(mockRecipes[0]);

  // Stores whatever the user types in the URL/search box.
  const [searchText, setSearchText] = useState("");

  // Stores the folder selected in the sidebar.
  const [selectedFolder, setSelectedFolder] = useState<FolderFilter>("Dinner");

  // Derived data: calculate it from recipes, folder state, and search state.
  const filteredRecipes = mockRecipes.filter((recipe) => {
    const matchesFolder =
      selectedFolder === "All Recipes" || recipe.folder === selectedFolder;

    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesFolder && matchesSearch;
  });

  const listTitle = selectedFolder.toUpperCase();

  return (
    <div className="app">
      <AppHeader />

      <div className="app-body">
        <Sidebar
          selectedFolder={selectedFolder}
          onSelectFolder={setSelectedFolder}
        />

        <main className="recipe-list-column">
          <RecipeList
            title={listTitle}
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
