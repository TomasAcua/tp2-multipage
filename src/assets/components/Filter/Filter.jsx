import React from "react";
import styles from "./Filter.module.css";

const Filters = ({
  busqueda,
  setBusqueda,
  filtroTipo,
  setFiltroTipo,
  esMeme,
  setEsMeme,
}) => {
  return (
    <div className={styles.Filters}>
      <input
        placeholder="Busqueda por Nombre"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <select
        value={filtroTipo}
        onChange={(e) => setFiltroTipo(e.target.value)}
      >
        <option>Juego</option>
        <option>Pelicula</option>
        <option>Serie</option>
        <option>Otro</option>
      </select>
      <select value={esMeme} onChange={(e) => setEsMeme(e.target.value)}>
        <option value="esMeme">Es Meme</option>
        <option value="noEsMeme">No es Meme</option>
      </select>
    </div>
  );
};

export default Filters;
