import { Folder, Utensils, FolderPlus } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <span>Folders</span>
        <FolderPlus size={16} />
      </div>

      <button className="folder active">
        <Utensils size={17} />
        All Recipes
      </button>

      <button className="folder">
        <Folder size={17} />
        Dinner
      </button>

      <button className="folder">
        <Folder size={17} />
        Baking
      </button>
    </aside>
  );
}