import React from "react";
import { useTranslation } from "react-i18next";

const Filters = ({
  busqueda,
  setBusqueda,
  filtroTipo,
  setFiltroTipo,
  esMeme,
  setEsMeme,
}) => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-wrap justify-center gap-4">
      <input
        placeholder={t("search_name")}
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="flex-1 min-w-[200px] max-w-sm px-4 py-2 bg-[#242424] text-[rgba(255,255,255,0.87)] border border-[#444] rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
      />
      <select
        value={esMeme}
        onChange={(e) => setEsMeme(e.target.value)}
        className="flex-1 min-w-[140px] max-w-xs px-4 py-2 bg-[#242424] text-[rgba(255,255,255,0.87)] border border-[#444] rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
      >
        <option value="">{t("meme")}</option>
        <option value="esMeme">{t("yes_meme")}</option>
        <option value="noEsMeme">{t("no_meme")}</option>
      </select>
    </div>
  );
};

export default Filters;
