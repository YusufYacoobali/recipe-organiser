import { ChefHat, LogOut } from "lucide-react";

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div className="brand">
          <div className="brand-icon">
            <ChefHat size={20} />
          </div>
          <strong>RecipeVault</strong>
        </div>

        <div className="user-area">
          <div className="user-pill">
            <span className="avatar" />
            Yacoobali Y
          </div>
          <button className="logout-btn" aria-label="Log out">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
