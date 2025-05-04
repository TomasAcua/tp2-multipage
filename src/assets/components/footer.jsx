import { Github, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t, i18n } = useTranslation();
  return (
    <footer className="bg-gray-900 text-white p-6 text-center mt-10">
      <div className="flex justify-center gap-6 mb-2">
        <a href="https://github.com/TomasAcua/tp2-multipage" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
          <Github />
        </a>
        <a href="https://www.instagram.com/cbf_futebol/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
          <Instagram />
        </a>
      </div>
      <p className="text-sm">{t('made_by')}</p>
      <p className="text-xs mt-1">{t('footer_msg')}</p>
    </footer>
  );
}
