import { ChefHat, LogOut } from "lucide-react";

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-icon">
          <ChefHat size={20} />
        </div>
        <strong>RecipeVault</strong>
      </div>

      <div className="user-pill">
        <span className="avatar" />
        Yacoobali Y
        <LogOut size={16} />
      </div>
    </header>
  );
}