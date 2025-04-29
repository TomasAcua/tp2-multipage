import { Github, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-6 text-center mt-10">
      <div className="flex justify-center gap-6 mb-2">
        <a href="https://github.com/TomasAcua" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
          <Github />
        </a>
        <a href="https://www.instagram.com/cbf_futebol/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
          <Instagram />
        </a>
      </div>
      <p className="text-sm">Hecho por Tomas Acuña FAI-2510 y Facundo Garcia FAI-2911</p>
      <p className="text-xs mt-1">Esta es una aplicación muy seria y con fines comerciales</p>
    </footer>
  );
}
