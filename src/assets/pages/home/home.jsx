import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import Filter from "../../components/Filter/Filter";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";

const API_URL = "https://680fd92327f2fdac240f943a.mockapi.io/api/v1/Personajes";

export default function Home() {
  const [personajes, setPersonajes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [esMeme, setEsMeme] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPersonajes(data))
      .catch((err) => console.error(t("load_error"), err));
  }, []);

  const filtrados = personajes.filter((p) => {
    const coincideBusqueda =
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.origen.toLowerCase().includes(busqueda.toLowerCase());
    const coincideTipo = filtroTipo ? p.tipo === filtroTipo : true;
    const coincideEsMeme = esMeme
      ? esMeme === "esMeme"
        ? p.esMeme === true
        : p.esMeme === false
      : true;

    return coincideBusqueda && coincideTipo && coincideEsMeme;
  });

  return (
    <main className="px-4 py-6 max-w-7xl mx-auto">
      {}
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          {t("title")}
        </span>
      </h1>
      <div className="mb-3 flex items-center gap-2">
        <Filter
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          filtroTipo={filtroTipo}
          setFiltroTipo={setFiltroTipo}
          esMeme={esMeme}
          setEsMeme={setEsMeme}
        />
      </div>

      <Button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        {mostrarFormulario ? t("close_form") : t("add_secondary_character")}
      </Button>

      {mostrarFormulario && (
        <Form
          onAdd={(nuevoPersonaje) => {
            setPersonajes([...personajes, nuevoPersonaje]);
            setMostrarFormulario(false);
          }}
        />
      )}

      {filtrados.length === 0 ? (
        <p className="text-center text-gray-500">{t("characters_empty")}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtrados.map((personaje) => (
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
