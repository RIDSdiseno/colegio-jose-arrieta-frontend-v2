import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Página no encontrada — Colegio José Arrieta</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <p className="text-8xl font-black text-primary/20">404</p>
        <h1 className="mt-4 font-heading text-2xl font-bold text-slate-800 sm:text-3xl">
          Página no encontrada
        </h1>
        <p className="mt-3 max-w-sm text-slate-500">
          La página que buscas no existe o fue movida. Puedes volver al inicio o usar el menú para navegar.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primaryHover"
          >
            <Home className="h-4 w-4" />
            Ir al inicio
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver atrás
          </button>
        </div>
      </div>
    </>
  );
}

export default NotFound;
