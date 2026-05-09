import { useState } from "react";
import type { SyntheticEvent } from "react";
import {
  Check,
  Folder,
  FolderPlus,
  Pencil,
  Trash2,
  Utensils,
  X,
} from "lucide-react";
import type { RecipeFolder } from "../../types/recipe";
import { UNASSIGNED_FOLDER } from "../../constants/folders";

type FolderFilter = "All Recipes" | RecipeFolder;

type Props = {
  folders: RecipeFolder[];
  selectedFolder: FolderFilter;
  onSelectFolder: (folder: FolderFilter) => void;
  onAddFolder: (folderName: string) => void;
  onRenameFolder: (currentName: string, nextName: string) => void;
  onDeleteFolder: (folderName: string) => void;
};

export function Sidebar({
  folders,
  selectedFolder,
  onSelectFolder,
  onAddFolder,
  onRenameFolder,
  onDeleteFolder,
}: Props) {
  // Local UI state: controls whether the "add folder" form is visible.
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  // Draft text for the add-folder input.
  const [folderDraft, setFolderDraft] = useState("");

  // Which folder is currently being renamed, if any.
  const [editingFolder, setEditingFolder] = useState<RecipeFolder | null>(null);

  // Draft text for the rename input.
  const [renameDraft, setRenameDraft] = useState("");

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    // Prevents the browser doing a full page refresh on form submit.
    event.preventDefault();

    // Parent owns folders, so this asks App.tsx to add it.
    onAddFolder(folderDraft);
    setFolderDraft("");
    setIsAddingFolder(false);
  }

  function handleCancel() {
    setFolderDraft("");
    setIsAddingFolder(false);
  }

  function startRename(folder: RecipeFolder) {
    // Put this folder row into edit mode.
    setEditingFolder(folder);
    setRenameDraft(folder);
  }

  function cancelRename() {
    // Clear rename UI state without changing real data.
    setEditingFolder(null);
    setRenameDraft("");
  }

  function handleRenameSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingFolder) {
      return;
    }

    // Parent owns recipe/folder data, so rename happens in App.tsx.
    onRenameFolder(editingFolder, renameDraft);
    cancelRename();
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

      {folders.map((folder) => {
        const isSystemFolder = folder === UNASSIGNED_FOLDER;
        const isEditing = editingFolder === folder;

        // Swap this one folder row for an inline rename form.
        if (isEditing) {
          return (
            <form
              key={folder}
              className="folder-edit-form"
              onSubmit={handleRenameSubmit}
            >
              <input
                value={renameDraft}
                onChange={(event) => setRenameDraft(event.target.value)}
                autoFocus
              />
              <button type="submit" aria-label="Save folder name">
                <Check size={15} />
              </button>
              <button type="button" onClick={cancelRename} aria-label="Cancel">
                <X size={15} />
              </button>
            </form>
          );
        }

        return (
          <div
            key={folder}
            className={`folder-row ${selectedFolder === folder ? "active" : ""}`}
          >
            <button className="folder folder-row-main" onClick={() => onSelectFolder(folder)}>
              <Folder size={17} />
              {folder}
            </button>

            {!isSystemFolder && (
              <div className="folder-row-actions">
                {/* These buttons only change folder UI/data, not recipes directly. */}
                <button onClick={() => startRename(folder)} aria-label="Rename folder">
                  <Pencil size={14} />
                </button>
                <button onClick={() => onDeleteFolder(folder)} aria-label="Delete folder">
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>
        );
      })}

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
