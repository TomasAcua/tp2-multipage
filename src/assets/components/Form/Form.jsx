import React, { useState, useEffect } from "react";
import styles from "./form.module.css";
import Button from "../Button/Button";

const Form = ({ onAdd }) => {
  const [form, setForm] = useState({
    nombre: "",
    imagen: "",
    esMeme: true,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({ ...form, id: crypto.randomUUID() });
    setForm({
      nombre: "",
      imagen: "",
      esMeme: "",
    });
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />
      <input
        name="imagen"
        placeholder="URL de Imagen"
        value={form.imagen}
        onchange={handleChange}
        required
      />
      <select
        name="esMeme"
        placeholder="¿Es meme?"
        value={form.esMeme}
        onChange={handleChange}
      />
      <option value={true}>Sí</option>
      <option value={false}>No</option>

      <div className={styles.ButtonContainer}>
        <Button type="submit">Agregar</Button>
      </div>
    </form>
  );
};

export default Form;
