import { UNASSIGNED_FOLDER } from "../constants/folders";
import { mockRecipes } from "../data/mockRecipes";
import type { Recipe, RecipeFolder } from "../types/recipe";

const RECIPES_STORAGE_KEY = "recipe-vault:recipes";
const FOLDERS_STORAGE_KEY = "recipe-vault:folders";

// Later Azure can replace this file without changing most components.
function canUseLocalStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function readFromStorage<T>(key: string) {
  if (!canUseLocalStorage()) {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : null;
  } catch {
    // Bad saved JSON should not break the whole app.
    return null;
  }
}

function writeToStorage<T>(key: string, value: T) {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

// Keeps older saved recipes safe if we add fields later.
function normalizeRecipe(recipe: Recipe): Recipe {
  return {
    ...recipe,
    notes: recipe.notes ?? "",
  };
}

// Shared folder rule: missing or blank folder means "No assigned".
export function getRecipeFolder(recipe: Recipe) {
  return recipe.folder?.trim() || UNASSIGNED_FOLDER;
}

function foldersFromRecipes(recipes: Recipe[]) {
  return recipes
    .map((recipe) => getRecipeFolder(recipe))
    .filter((folder) => folder !== UNASSIGNED_FOLDER);
}

export function loadRecipes() {
  const storedRecipes = readFromStorage<Recipe[]>(RECIPES_STORAGE_KEY);

  if (!Array.isArray(storedRecipes)) {
    return mockRecipes;
  }

  return storedRecipes.map(normalizeRecipe);
}

export function saveRecipes(recipes: Recipe[]) {
  writeToStorage(RECIPES_STORAGE_KEY, recipes);
}

export function loadFolders(recipes: Recipe[]) {
  const storedFolders = readFromStorage<RecipeFolder[]>(FOLDERS_STORAGE_KEY);
  const safeStoredFolders = Array.isArray(storedFolders)
    ? storedFolders.filter((folder) => folder.trim())
    : [];

  // Merge saved folders with folders used by recipes, removing duplicates.
  return Array.from(
    new Set([UNASSIGNED_FOLDER, ...safeStoredFolders, ...foldersFromRecipes(recipes)])
  );
}

export function saveFolders(folders: RecipeFolder[]) {
  writeToStorage(FOLDERS_STORAGE_KEY, folders);
}
