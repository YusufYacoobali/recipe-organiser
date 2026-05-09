import { useEffect, useState } from "react";
import type { Recipe, RecipeFolder } from "./types/recipe";
import { RecipeList } from "./components/recipes/RecipeList";
import { RecipeDetail } from "./components/recipes/RecipeDetail";
import { AppHeader } from "./components/layout/AppHeader";
import { Sidebar } from "./components/layout/Sidebar";
import { UNASSIGNED_FOLDER } from "./constants/folders";
import {
  getRecipeFolder,
  loadFolders,
  loadRecipes,
  saveFolders,
  saveRecipes,
} from "./services/recipeService";
import "./App.css";

type FolderFilter = "All Recipes" | RecipeFolder;

function App() {
  // Lazy initializer: load once when App first mounts.
  const [recipes, setRecipes] = useState<Recipe[]>(() => loadRecipes());

  // Folders also load once, based on saved folders and recipe folders.
  const [folders, setFolders] = useState<RecipeFolder[]>(() =>
    loadFolders(recipes)
  );

  // Stores the id of the recipe currently selected by the user.
  const [selectedRecipeId, setSelectedRecipeId] = useState(
    recipes[0]?.id ?? null
  );

  // Stores whatever the user types in the URL/search box.
  const [searchText, setSearchText] = useState("");

  // Stores the folder selected in the sidebar.
  const [selectedFolder, setSelectedFolder] = useState<FolderFilter>(() =>
    folders.includes("Dinner") ? "Dinner" : "All Recipes"
  );

  // Persistence effect: whenever recipes change, save them locally.
  useEffect(() => {
    saveRecipes(recipes);
  }, [recipes]);

  // Persistence effect: whenever folders change, save them locally.
  useEffect(() => {
    saveFolders(folders);
  }, [folders]);

  // Derived data: no useState needed because we can calculate it each render.
  const filteredRecipes = recipes.filter((recipe) => {
    const recipeFolder = getRecipeFolder(recipe);

    const matchesFolder =
      selectedFolder === "All Recipes" || recipeFolder === selectedFolder;

    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesFolder && matchesSearch;
  });

  // selectedRecipeId is state; selectedRecipe is calculated from it.
  const selectedRecipe =
    recipes.find((recipe) => recipe.id === selectedRecipeId) ?? null;

  const listTitle = selectedFolder.toUpperCase();

  function handleSaveNotes(recipeId: string, notes: string) {
    // Immutable update: return a new array with one changed recipe.
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, notes } : recipe
      )
    );
  }

  function handleSaveRecipe(updatedRecipe: Recipe) {
    // Normalize folder so empty values become "No assigned".
    const normalizedFolder = updatedRecipe.folder?.trim() || UNASSIGNED_FOLDER;

    // Save the edited recipe into the recipes state array.
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id
          ? { ...updatedRecipe, folder: normalizedFolder }
          : recipe
      )
    );

    // If the edit created a new folder name, keep the sidebar in sync.
    setFolders((currentFolders) =>
      currentFolders.includes(normalizedFolder)
        ? currentFolders
        : [...currentFolders, normalizedFolder]
    );

    // After moving a recipe, show the folder it moved into.
    setSelectedFolder(normalizedFolder);
  }

  function handleAddFolder(folderName: string) {
    const trimmedFolderName = folderName.trim();

    if (!trimmedFolderName) {
      return;
    }

    // Prevent duplicate folders, ignoring upper/lowercase differences.
    const existingFolder = folders.find(
      (folder) => folder.toLowerCase() === trimmedFolderName.toLowerCase()
    );

    if (existingFolder) {
      // If it already exists, just select it.
      setSelectedFolder(existingFolder);
      return;
    }

    // Add new folder without mutating the old array.
    setFolders((currentFolders) => [...currentFolders, trimmedFolderName]);
    setSelectedFolder(trimmedFolderName);
  }

  function handleRenameFolder(currentName: string, nextName: string) {
    const trimmedNextName = nextName.trim();

    if (
      !trimmedNextName ||
      currentName === UNASSIGNED_FOLDER ||
      currentName === trimmedNextName
    ) {
      return;
    }

    // Do not rename into another existing folder.
    const existingFolder = folders.find(
      (folder) => folder.toLowerCase() === trimmedNextName.toLowerCase()
    );

    if (existingFolder && existingFolder !== currentName) {
      return;
    }

    // Rename the folder label in the sidebar.
    setFolders((currentFolders) =>
      currentFolders.map((folder) =>
        folder === currentName ? trimmedNextName : folder
      )
    );

    // Rename the folder value on every recipe inside it.
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) =>
        getRecipeFolder(recipe) === currentName
          ? { ...recipe, folder: trimmedNextName }
          : recipe
      )
    );

    // Keep the active sidebar selection correct after rename.
    if (selectedFolder === currentName) {
      setSelectedFolder(trimmedNextName);
    }
  }

  function handleDeleteFolder(folderName: string) {
    // "No assigned" is the safety folder, so it cannot be deleted.
    if (folderName === UNASSIGNED_FOLDER) {
      return;
    }

    // Remove the folder from the sidebar list.
    setFolders((currentFolders) =>
      currentFolders.filter((folder) => folder !== folderName)
    );

    // Move recipes from the deleted folder into "No assigned".
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) =>
        getRecipeFolder(recipe) === folderName
          ? { ...recipe, folder: UNASSIGNED_FOLDER }
          : recipe
      )
    );

    // If the user was viewing the deleted folder, move them too.
    if (selectedFolder === folderName) {
      setSelectedFolder(UNASSIGNED_FOLDER);
    }
  }

  return (
    <div className="app">
      <AppHeader />

      <div className="app-body">
        <Sidebar
          folders={folders}
          selectedFolder={selectedFolder}
          // Passing state setters/callbacks down lets Sidebar change App state.
          onSelectFolder={setSelectedFolder}
          onAddFolder={handleAddFolder}
          onRenameFolder={handleRenameFolder}
          onDeleteFolder={handleDeleteFolder}
        />

        <main className="recipe-list-column">
          <RecipeList
            title={listTitle}
            recipes={filteredRecipes}
            selectedRecipeId={selectedRecipeId ?? undefined}
            // Store only the id, not a second copy of the whole recipe.
            onSelectRecipe={(recipe) => setSelectedRecipeId(recipe.id)}
            searchText={searchText}
            onSearchTextChange={setSearchText}
          />
        </main>

        <section className="recipe-detail-column">
          <RecipeDetail
            recipe={selectedRecipe}
            folders={folders}
            // Detail edits data by calling back up to App.
            onSaveNotes={handleSaveNotes}
            onSaveRecipe={handleSaveRecipe}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
