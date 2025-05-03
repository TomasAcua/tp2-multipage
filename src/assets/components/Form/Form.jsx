import React, { useState } from "react";
import Button from "../Button/Button";

const Form = ({ onAdd }) => {
  const [form, setForm] = useState({
    nombre: "",
    origen: "",
    imagen: "",
    esMeme: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar los datos a la MockAPI
    fetch("https://680fd92327f2fdac240f943a.mockapi.io/api/v1/Personajes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((nuevoPersonaje) => {
        onAdd(nuevoPersonaje); // Llama a la función onAdd para actualizar el estado en Home.jsx
        setForm({
          nombre: "",
          origen: "",
          imagen: "",
          esMeme: true,
        }); // Reinicia el formulario
      })
      .catch((err) => console.error("Error al guardar el personaje:", err));
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
      <input
        name="imagen"
        placeholder="URL de Imagen"
        value={form.imagen}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <select
        name="esMeme"
        value={form.esMeme}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      >
        <option value={true}>Sí</option>
        <option value={false}>No</option>
      </select>
      <div className="text-center">
        <Button type="submit">Agregar</Button>
      </div>
    </form>
  );
};

export default Form;
