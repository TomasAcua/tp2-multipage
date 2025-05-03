import React, { useState } from "react";
import Button from "../Button/Button";

const FormMeme = ({ onAdd }) => {
  const [form, setForm] = useState({
    nombre: "",
    origen: "",
    descripcion: "",
    numeroDeEpisodios: "",
    datosCuriosos: "",
    memes: "",
    imagen: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convertir memes a un array si se ingresan como texto separado por comas
    const memesArray = form.memes.split(",").map((meme) => meme.trim());

    onAdd({ ...form, memes: memesArray, id: crypto.randomUUID() });

    // Reiniciar el formulario
    setForm({
      nombre: "",
      origen: "",
      descripcion: "",
      numeroDeEpisodios: "",
      datosCuriosos: "",
      memes: "",
      imagen: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        name="origen"
        placeholder="Origen"
        value={form.origen}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        name="numeroDeEpisodios"
        type="number"
        placeholder="Número de episodios"
        value={form.numeroDeEpisodios}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <textarea
        name="datosCuriosos"
        placeholder="Datos curiosos"
        value={form.datosCuriosos}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <textarea
        name="memes"
        placeholder="Memes (separados por comas)"
        value={form.memes}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        name="imagen"
        placeholder="URL de la imagen"
        value={form.imagen}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <div className="text-center">
        <Button type="submit">Agregar Meme</Button>
      </div>
    </form>
  );
};

export default FormMeme;