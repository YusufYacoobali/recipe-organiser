import { useState } from "react";
import { mockRecipes } from "./data/mockRecipes";
import type { Recipe, RecipeFolder } from "./types/recipe";
import { RecipeList } from "./components/recipes/RecipeList";
import { RecipeDetail } from "./components/recipes/RecipeDetail";
import { AppHeader } from "./components/layout/AppHeader";
import { Sidebar } from "./components/layout/Sidebar";
import "./App.css";

type FolderFilter = "All Recipes" | RecipeFolder;
const initialFolders = Array.from(
  new Set(mockRecipes.map((recipe) => recipe.folder))
);

function App() {
  // Stores the recipes the app is currently showing.
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);

  // Stores the folders the user can organize recipes into.
  const [folders, setFolders] = useState<RecipeFolder[]>(initialFolders);

  // Stores the id of the recipe currently selected by the user.
  const [selectedRecipeId, setSelectedRecipeId] = useState(mockRecipes[0]?.id ?? null);

  // Stores whatever the user types in the URL/search box.
  const [searchText, setSearchText] = useState("");

  // Stores the folder selected in the sidebar.
  const [selectedFolder, setSelectedFolder] = useState<FolderFilter>("Dinner");

  // Derived data: calculate it from recipes, folder state, and search state.
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesFolder =
      selectedFolder === "All Recipes" || recipe.folder === selectedFolder;

    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesFolder && matchesSearch;
  });

  const selectedRecipe =
    recipes.find((recipe) => recipe.id === selectedRecipeId) ?? null;

  const listTitle = selectedFolder.toUpperCase();

  function handleSaveNotes(recipeId: string, notes: string) {
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, notes } : recipe
      )
    );
  }

  function handleSaveRecipe(updatedRecipe: Recipe) {
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );

    setSelectedFolder(updatedRecipe.folder);
  }

  function handleAddFolder(folderName: string) {
    const trimmedFolderName = folderName.trim();

    if (!trimmedFolderName) {
      return;
    }

    const existingFolder = folders.find(
      (folder) => folder.toLowerCase() === trimmedFolderName.toLowerCase()
    );

    if (existingFolder) {
      setSelectedFolder(existingFolder);
      return;
    }

    setFolders((currentFolders) => [...currentFolders, trimmedFolderName]);
    setSelectedFolder(trimmedFolderName);
  }

  return (
    <div className="app">
      <AppHeader />

      <div className="app-body">
        <Sidebar
          folders={folders}
          selectedFolder={selectedFolder}
          onSelectFolder={setSelectedFolder}
          onAddFolder={handleAddFolder}
        />

        <main className="recipe-list-column">
          <RecipeList
            title={listTitle}
            recipes={filteredRecipes}
            selectedRecipeId={selectedRecipeId ?? undefined}
            onSelectRecipe={(recipe) => setSelectedRecipeId(recipe.id)}
            searchText={searchText}
            onSearchTextChange={setSearchText}
          />
        </main>

        <section className="recipe-detail-column">
          <RecipeDetail
            recipe={selectedRecipe}
            folders={folders}
            onSaveNotes={handleSaveNotes}
            onSaveRecipe={handleSaveRecipe}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
