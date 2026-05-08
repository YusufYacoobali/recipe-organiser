import { Folder, Utensils, FolderPlus } from "lucide-react";
import type { RecipeFolder } from "../../types/recipe";

type FolderFilter = "All Recipes" | RecipeFolder;

type Props = {
  selectedFolder: FolderFilter;
  onSelectFolder: (folder: FolderFilter) => void;
};

export function Sidebar({ selectedFolder, onSelectFolder }: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <span>Folders</span>
        <FolderPlus size={16} />
      </div>

      <button
        className={`folder ${selectedFolder === "All Recipes" ? "active" : ""}`}
        onClick={() => onSelectFolder("All Recipes")}
      >
        <Utensils size={17} />
        All Recipes
      </button>

      <button
        className={`folder ${selectedFolder === "Dinner" ? "active" : ""}`}
        onClick={() => onSelectFolder("Dinner")}
      >
        <Folder size={17} />
        Dinner
      </button>

      <button
        className={`folder ${selectedFolder === "Baking" ? "active" : ""}`}
        onClick={() => onSelectFolder("Baking")}
      >
        <Folder size={17} />
        Baking
      </button>
    </aside>
  );
}
