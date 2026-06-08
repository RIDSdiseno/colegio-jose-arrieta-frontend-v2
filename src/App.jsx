import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Analytics from "./components/Analytics";

import Home from "./pages/Home";
import PorQueElegirnos from "./pages/PorQueElegirnos";
import ProyectoEducativo from "./pages/ProyectoEducativo";
import Admision from "./pages/Admision";
import VidaEscolar from "./pages/VidaEscolar";
import Noticias from "./pages/Noticias";
import NoticiaDetalle from "./pages/NoticiaDetalle";
import Contacto from "./pages/Contacto";
import Buscar from "./pages/Buscar";
import Documentos from "./pages/Documentos";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminNoticias from "./pages/admin/AdminNoticias";
import AdminNoticiaForm from "./pages/admin/AdminNoticiaForm";
import AdminTestimonios from "./pages/admin/AdminTestimonios";
import AdminTestimonioForm from "./pages/admin/AdminTestimonioForm";
import AdminAlbums from "./pages/admin/AdminAlbums";
import AdminAlbumForm from "./pages/admin/AdminAlbumForm";
import AdminAlbumFotos from "./pages/admin/AdminAlbumFotos";
import AdminVideos from "./pages/admin/AdminVideos";
import AdminVideoForm from "./pages/admin/AdminVideoForm";
import AdminDocumentos from "./pages/admin/AdminDocumentos";
import AdminDocumentoForm from "./pages/admin/AdminDocumentoForm";

import NotFound from "./pages/NotFound";
import ColegioLaReina from "./pages/seo/ColegioLaReina";
import ColegioSubvencionado from "./pages/seo/ColegioSubvencionado";
import ColegioEducacionIntegral from "./pages/seo/ColegioEducacionIntegral";
import ColegioInglesPreKinder from "./pages/seo/ColegioInglesPreKinder";

function App() {
  return (
    <AuthProvider>
      {/* Analytics debe estar dentro del árbol del Router (via main.jsx) para usar useLocation */}
      <Analytics />
      <Routes>
        {/* Sitio público */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/por-que-elegirnos" element={<PorQueElegirnos />} />
          <Route path="/proyecto-educativo" element={<ProyectoEducativo />} />
          <Route path="/admision" element={<Admision />} />
          <Route path="/vida-escolar" element={<VidaEscolar />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/noticias/:slug" element={<NoticiaDetalle />} />
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/documentos" element={<Documentos />} />

          {/* SEO landing pages — no aparecen en el menú */}
          <Route path="/colegio-la-reina" element={<ColegioLaReina />} />
          <Route path="/colegio-subvencionado-la-reina" element={<ColegioSubvencionado />} />
          <Route path="/colegio-educacion-integral-la-reina" element={<ColegioEducacionIntegral />} />
          <Route path="/colegio-ingles-prekinder-santiago" element={<ColegioInglesPreKinder />} />
        </Route>

        {/* Admin — sin Navbar ni Footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<Navigate to="/admin/noticias" replace />} />
          <Route path="/admin/noticias" element={<AdminNoticias />} />
          <Route path="/admin/noticias/nueva" element={<AdminNoticiaForm />} />
          <Route path="/admin/noticias/:id" element={<AdminNoticiaForm />} />
          <Route path="/admin/testimonios" element={<AdminTestimonios />} />
          <Route path="/admin/testimonios/nuevo" element={<AdminTestimonioForm />} />
          <Route path="/admin/testimonios/:id" element={<AdminTestimonioForm />} />
          <Route path="/admin/albums" element={<AdminAlbums />} />
          <Route path="/admin/albums/nuevo" element={<AdminAlbumForm />} />
          <Route path="/admin/albums/:id" element={<AdminAlbumForm />} />
          <Route path="/admin/albums/:id/fotos" element={<AdminAlbumFotos />} />
          <Route path="/admin/videos" element={<AdminVideos />} />
          <Route path="/admin/videos/nuevo" element={<AdminVideoForm />} />
          <Route path="/admin/videos/:id" element={<AdminVideoForm />} />
          <Route path="/admin/documentos" element={<AdminDocumentos />} />
          <Route path="/admin/documentos/nuevo" element={<AdminDocumentoForm />} />
          <Route path="/admin/documentos/:id" element={<AdminDocumentoForm />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
