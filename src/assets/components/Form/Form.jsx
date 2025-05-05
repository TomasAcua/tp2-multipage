import React, { useState } from "react";
import Button from "../Button/Button";
import { useTranslation } from 'react-i18next';



const Form = ({ onAdd }) => {
  const {t} = useTranslation();

  const [form, setForm] = useState({
    nombre: "",
    origen: "",
    imagen: "",
    esMeme: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const parsedValue = name === "esMeme" ? value === "true" : value;

    setForm({ ...form, [name]: parsedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    fetch("https://680fd92327f2fdac240f943a.mockapi.io/api/v1/Personajes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((nuevoPersonaje) => {
        onAdd(nuevoPersonaje); 
        setForm({
          nombre: "",
          origen: "",
          imagen: "",
          esMeme: true,
        }); 
      })
      .catch((err) => console.error(t('save_error'), err));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="nombre"
        placeholder={t('name_form')}
        value={form.nombre}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        name="origen"
        placeholder={t('source_form')}
        value={form.origen}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        name="imagen"
        placeholder={t('url_img_form')}
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
        <option value={true} className="bg-[#242424]">{t('yes_meme')}</option>
        <option value={false} className="bg-[#242424]">{t('no_meme')}</option>
      </select>
      <div className="text-center">
        <Button type="submit">{t('submit')}</Button>
      </div>
    </form>
  );
};

export default Form;
