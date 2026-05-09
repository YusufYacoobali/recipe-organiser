import { useState } from "react";
import type { SyntheticEvent } from "react";
import { Folder, FolderPlus, Utensils, X } from "lucide-react";
import type { RecipeFolder } from "../../types/recipe";

type FolderFilter = "All Recipes" | RecipeFolder;

type Props = {
  folders: RecipeFolder[];
  selectedFolder: FolderFilter;
  onSelectFolder: (folder: FolderFilter) => void;
  onAddFolder: (folderName: string) => void;
};

export function Sidebar({
  folders,
  selectedFolder,
  onSelectFolder,
  onAddFolder,
}: Props) {
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [folderDraft, setFolderDraft] = useState("");

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    onAddFolder(folderDraft);
    setFolderDraft("");
    setIsAddingFolder(false);
  }

  function handleCancel() {
    setFolderDraft("");
    setIsAddingFolder(false);
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <span>Folders</span>
        <button
          className="folder-title-action"
          onClick={() => setIsAddingFolder(true)}
          aria-label="Add folder"
        >
          <FolderPlus size={16} />
        </button>
      </div>

      <button
        className={`folder ${selectedFolder === "All Recipes" ? "active" : ""}`}
        onClick={() => onSelectFolder("All Recipes")}
      >
        <Utensils size={17} />
        All Recipes
      </button>

      {folders.map((folder) => (
        <button
          key={folder}
          className={`folder ${selectedFolder === folder ? "active" : ""}`}
          onClick={() => onSelectFolder(folder)}
        >
          <Folder size={17} />
          {folder}
        </button>
      ))}

      {isAddingFolder && (
        <form className="add-folder-form" onSubmit={handleSubmit}>
          <input
            value={folderDraft}
            onChange={(event) => setFolderDraft(event.target.value)}
            placeholder="New folder"
            autoFocus
          />
          <button type="submit">
            <FolderPlus size={15} />
          </button>
          <button type="button" onClick={handleCancel}>
            <X size={15} />
          </button>
        </form>
      )}
    </aside>
  );
}
