import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import FormMeme from "../../components/FormMeme/FormMeme";

const API_URL = "https://680fd92327f2fdac240f943a.mockapi.io/api/v1/Details";

export default function Details() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [personaje, setPersonaje] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [favoritos, setFavoritos] = useState(() => {
    return JSON.parse(localStorage.getItem("favoritos")) || [];
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Estado para el índice del carrusel

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: Detalle no encontrado`);
        }
        return res.json();
      })
      .then((data) => {
        if (data?.id) {
          setPersonaje(data);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      })
      .catch((err) => {
        console.error("Error al cargar detalles:", err);
        setNotFound(true);
      });
  }, [id]);

  const toggleFavorito = () => {
    let nuevos;
    if (favoritos.includes(personaje.id)) {
      nuevos = favoritos.filter((favId) => favId !== personaje.id);
    } else {
      nuevos = [...favoritos, personaje.id];
    }
    setFavoritos(nuevos);
    localStorage.setItem("favoritos", JSON.stringify(nuevos));
  };

  const handleAddMeme = (nuevoMeme) => {
    const nuevoPersonaje = {
      ...personaje,
      memes: [...(personaje?.memes || []), nuevoMeme],
    };
    setPersonaje(nuevoPersonaje);

    // Actualizar personaje en la API
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoPersonaje),
    }).catch((err) => console.error("Error al actualizar el personaje:", err));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (!personaje && !notFound) {
    return <p className="text-center mt-10">{t("Cargando...")}</p>;
  }

  if (notFound) {
    return (
      <section className="max-w-2xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">{t("Personaje no encontrado")}</h2>
        <FormMeme
          onAdd={(nuevo) => {
            fetch(`${API_URL}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(nuevo),
            })
              .then((res) => res.json())
              .then((data) => {
                setPersonaje(data);
                setNotFound(false);
              })
              .catch((err) => console.error("Error al crear personaje:", err));
          }}
        />
      </section>
    );
  }

  const esFavorito = favoritos.includes(personaje.id);

  const images = [personaje.imagen, ...(personaje.memes || [])];

  return (
    <section className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-1/2">
          <img
            src={images[currentImageIndex]}
            alt={`Imagen ${currentImageIndex + 1}`}
            className="w-full h-80 object-cover rounded shadow"
          />
          <button
            onClick={handlePrevImage}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            &#8249;
          </button>
          <button
            onClick={handleNextImage}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            &#8250;
          </button>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold">{personaje.nombre}</h2>
            <button
              onClick={toggleFavorito}
              className={`p-2 rounded-full transition ${
                esFavorito ? "text-yellow-500" : "text-gray-400"
              } hover:scale-110`}
              title={
                esFavorito ? t("Quitar de favoritos") : t("Agregar a favoritos")
              }
            >
              <Star fill={esFavorito ? "currentColor" : "none"} />
            </button>
          </div>

          <p className="text-sm text-gray-500">{personaje.origen}</p>
          <p>{personaje.descripcion}</p>

          <div>
            <strong>{t("Número de episodios")}:</strong>{" "}
            {personaje.numeroDeEpisodios}
          </div>

          <div>
            <strong>{t("Dato curioso")}:</strong> {personaje.datosCuriosos}
          </div>
        </div>
      </div>
    </section>
  );
}
