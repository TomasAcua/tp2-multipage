import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const API_URL = "https://680fd92327f2fdac240f943a.mockapi.io/api/v1/Personajes";

export default function Favoritos() {
  const [personajes, setPersonajes] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const cargarDatos = () => {
      const favs = JSON.parse(localStorage.getItem("favoritos")) || []; // Parsear JSON
      setFavoritos(favs);

      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => setPersonajes(data))
        .catch((err) => console.error(t("load_error"), err));
    };

    cargarDatos();

    // Detectar si el usuario vuelve a la pestaña
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        cargarDatos();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const favoritosCompletos = personajes.filter((p) =>
    favoritos.includes(String(p.id))
  ); // Asegúrate de que los tipos coincidan

  return (
    <main className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t("my_favorites")}</h1>

      {favoritosCompletos.length === 0 ? (
        <p className="text-gray-500 text-center">{t("empty_favorites")}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoritosCompletos.map((personaje) => (
            <div
              key={personaje.id}
              className="relative cursor-pointer group rounded overflow-hidden shadow-lg border hover:scale-105 transition"
              onClick={() => navigate(`/personajes/${personaje.id}`)}
            >
              <img
                src={personaje.imagen}
                alt={personaje.nombre}
                className="w-full h-60 object-contain object-center"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-white text-center p-4">
                <h3 className="text-lg font-semibold">{personaje.nombre}</h3>
                <p className="text-sm">{personaje.origen}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
