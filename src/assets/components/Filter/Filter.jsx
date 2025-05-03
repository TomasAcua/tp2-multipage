import React from "react";

const Filters = ({
  busqueda,
  setBusqueda,
  filtroTipo,
  setFiltroTipo,
  esMeme,
  setEsMeme,
}) => {
  return (
      <div className="w-full flex flex-wrap justify-center gap-4">
        <input
          placeholder="Buscar por nombre"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 min-w-[200px] max-w-sm px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
        />
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="flex-1 min-w-[160px] max-w-xs px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tipo</option>
          <option>Juego</option>
          <option>Pelicula</option>
          <option>Serie</option>
          <option>Otro</option>
        </select>
        <select
          value={esMeme}
          onChange={(e) => setEsMeme(e.target.value)}
          className="flex-1 min-w-[140px] max-w-xs px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">¿Es meme?</option>
          <option value="esMeme">Es Meme</option>
          <option value="noEsMeme">No es Meme</option>
        </select>
      </div>

  );
};

export default Filters;
