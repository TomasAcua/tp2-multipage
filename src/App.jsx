import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './assets/pages/home/home';
import Details from './assets/pages/details/details';
import Favorites from './assets/pages/favorites/favorites';
import Header from './assets/components/header';
import Footer from './assets/components/footer';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personajes/:id" element={<Details />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="*" element={<div className="text-center mt-10">{t('404')}</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
