import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';

const API_URL = 'https://680fd92327f2fdac240f943a.mockapi.io/api/v1/Details';

export default function Details() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [personaje, setPersonaje] = useState(null);
  const [favoritos, setFavoritos] = useState(() => {
    return JSON.parse(localStorage.getItem('favoritos')) || [];
  });

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: Detalle no encontrado`);
        }
        return res.json();
      })
      .then(data => {
        if (data?.id) {
          setPersonaje(data);
        } else {
          console.error('No se encontró el personaje con ese ID');
        }
      })
      .catch(err => console.error('Error al cargar detalles:', err));
  }, [id]);

  const toggleFavorito = () => {
    let nuevos;
    if (favoritos.includes(personaje.id)) {
      nuevos = favoritos.filter(favId => favId !== personaje.id);
    } else {
      nuevos = [...favoritos, personaje.id];
    }
    setFavoritos(nuevos);
    localStorage.setItem('favoritos', JSON.stringify(nuevos));
  };

  if (!personaje) {
    return <p className="text-center mt-10">{t('Cargando...')}</p>;
  }

  const esFavorito = favoritos.includes(personaje.id);

  return (
    <section className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={personaje.imagen} alt={personaje.nombre} className="w-full md:w-1/2 rounded shadow" />

        <div className="flex-1 space-y-4">
          {/*  COMPONENTE ¿?: <CharacterDetailHeader personaje={...} onToggleFavorito={...} /> */}
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold">{personaje.nombre}</h2>
            <button
              onClick={toggleFavorito}
              className={`p-2 rounded-full transition ${
                esFavorito ? 'text-yellow-500' : 'text-gray-400'
              } hover:scale-110`}
              title={esFavorito ? t('Quitar de favoritos') : t('Agregar a favoritos')}
            >
              <Star fill={esFavorito ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/*  COMPONENTE ¿?: <CharacterDetailInfo personaje={...} /> */}
          <p className="text-sm text-gray-500">{personaje.origen}</p>
          <p>{personaje.descripcion}</p>

          <div>
            <strong>{t('Número de episodios')}:</strong> {personaje.numeroDeEpisodios}
          </div>

          <div>
            <strong>{t('Dato curioso')}:</strong> {personaje.datosCuriosos}
          </div>

          {/*  COMPONENTE ¿?: <MemesList memes={personaje.memes} /> */}
          {personaje.memes?.length > 0 && (
            <div>
              <strong>{t('Memes populares')}:</strong>
              <ul className="list-disc list-inside mt-2">
                {personaje.memes.map((meme, i) => (
                  <li key={i}>{meme}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
