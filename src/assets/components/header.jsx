import { Link, useLocation } from "react-router-dom";
import { Home, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const cambiarIdioma = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <header className="sticky top-0 backdrop-blur-sm bg-white/50 shadow z-50 p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold hover:text-blue-500 transition"
        >
          <Home className="w-5 h-5" />
          <span>{t("home")}</span>
        </Link>

        <Link
          to="/favoritos"
          className={`flex items-center gap-2 hover:text-yellow-500 transition ${
            location.pathname === "/favoritos" ? "font-bold" : ""
          }`}
        >
          <Star className="w-5 h-5" />
          <span>{t("favorites")}</span>
        </Link>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => cambiarIdioma("es")}
          className={`px-2 py-1 rounded ${
            i18n.language === "es" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          ES
        </button>
        <button
          onClick={() => cambiarIdioma("en")}
          className={`px-2 py-1 rounded ${
            i18n.language === "en" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          EN
        </button>
      </div>
    </header>
  );
}
