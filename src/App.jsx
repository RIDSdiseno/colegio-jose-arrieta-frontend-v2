import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Analytics from "./components/Analytics";

const Home = lazy(() => import("./pages/Home"));
const PorQueElegirnos = lazy(() => import("./pages/PorQueElegirnos"));
const ProyectoEducativo = lazy(() => import("./pages/ProyectoEducativo"));
const Admision = lazy(() => import("./pages/Admision"));
const VidaEscolar = lazy(() => import("./pages/VidaEscolar"));
const Noticias = lazy(() => import("./pages/Noticias"));
const NoticiaDetalle = lazy(() => import("./pages/NoticiaDetalle"));
const Contacto = lazy(() => import("./pages/Contacto"));
const Buscar = lazy(() => import("./pages/Buscar"));
const Documentos = lazy(() => import("./pages/Documentos"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminNoticias = lazy(() => import("./pages/admin/AdminNoticias"));
const AdminNoticiaForm = lazy(() => import("./pages/admin/AdminNoticiaForm"));
const AdminTestimonios = lazy(() => import("./pages/admin/AdminTestimonios"));
const AdminTestimonioForm = lazy(() => import("./pages/admin/AdminTestimonioForm"));
const AdminAlbums = lazy(() => import("./pages/admin/AdminAlbums"));
const AdminAlbumForm = lazy(() => import("./pages/admin/AdminAlbumForm"));
const AdminAlbumFotos = lazy(() => import("./pages/admin/AdminAlbumFotos"));
const AdminVideos = lazy(() => import("./pages/admin/AdminVideos"));
const AdminVideoForm = lazy(() => import("./pages/admin/AdminVideoForm"));
const AdminDocumentos = lazy(() => import("./pages/admin/AdminDocumentos"));
const AdminDocumentoForm = lazy(() => import("./pages/admin/AdminDocumentoForm"));

const NotFound = lazy(() => import("./pages/NotFound"));
const ColegioLaReina = lazy(() => import("./pages/seo/ColegioLaReina"));
const ColegioSubvencionado = lazy(() => import("./pages/seo/ColegioSubvencionado"));
const ColegioEducacionIntegral = lazy(() => import("./pages/seo/ColegioEducacionIntegral"));
const ColegioInglesPreKinder = lazy(() => import("./pages/seo/ColegioInglesPreKinder"));

const PageSpinner = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

function App() {
  return (
    <AuthProvider>
      {/* Analytics debe estar dentro del árbol del Router (via main.jsx) para usar useLocation */}
      <Analytics />
      <Suspense fallback={<PageSpinner />}>
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
      </Suspense>
    </AuthProvider>
  );
}

export default App;
