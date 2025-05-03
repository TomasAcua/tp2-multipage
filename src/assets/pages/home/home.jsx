import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import Filter from "../../components/Filter/Filter"

const API_URL = 'https://680fd92327f2fdac240f943a.mockapi.io/api/v1/Personajes'; 

export default function Home() {
  const [personajes, setPersonajes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [esMeme, setEsMeme] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setPersonajes(data))
      .catch(err => console.error('Error cargando personajes:', err));
  }, []);

  const filtrados = personajes.filter(p => {
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

  {/*  COMPONENTE ¿?: <SearchBar value={busqueda} onChange={...} /> */}
  <div className="mb-6 flex items-center gap-2">
    <Filter 
      busqueda={busqueda}
      setBusqueda={setBusqueda}
      filtroTipo={filtroTipo}
      setFiltroTipo={setFiltroTipo}
      esMeme={esMeme}
      setEsMeme={setEsMeme}
    />
  </div>

  {filtrados.length === 0 ? (
    <p className="text-center text-gray-500">{t('No se encontraron personajes')}</p>
  ) : (
    //  COMPONENTE ¿?: <CharacterList personajes={filtrados} />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filtrados.map(personaje => (
        //  COMPONENTE ¿?: <CharacterCard personaje={personaje} onClick={...} />
        <div
          key={personaje.id}
          className="relative cursor-pointer group rounded overflow-hidden shadow-lg border hover:scale-105 transition"
          onClick={() => navigate(`/personajes/${personaje.id}`)}
        >
          <img
            src={personaje.imagen}
            alt={personaje.nombre}
            className="w-full h-60 object-cover"
          />
          {/*  COMPONENTE¿?: <CharacterCardOverlay nombre={...} origen={...} /> */}
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
