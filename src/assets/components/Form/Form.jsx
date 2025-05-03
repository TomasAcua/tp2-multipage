import React, { useState } from "react";
import Button from "../Button/Button";

const Form = ({ onAdd }) => {
  const [form, setForm] = useState({
    nombre: "",
    imagen: "",
    esMeme: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({ ...form, id: crypto.randomUUID() });

    // Reiniciar el formulario
    setForm({
      nombre: "",
      imagen: "",
      esMeme: true,
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
