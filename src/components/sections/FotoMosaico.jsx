import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAlbums } from "../../api/albums";

export default function FotoMosaico() {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    getAlbums()
      .then((data) => {
        if (data && data.length > 0) {
          // Convertir álbumes a formato de fotos para el mosaico
          const fotosDeAlbumes = data
            .map((a) => ({
              url: a.portada || a.fotos?.[0]?.url,
              caption: a.titulo,
            }))
            .filter((f) => f.url);
          if (fotosDeAlbumes.length > 0) setFotos(fotosDeAlbumes);
        }
      })
      .catch((err) => {
        if (import.meta.env.DEV) console.warn("[FotoMosaico] Error cargando álbumes:", err);
      });
  }, []);

  if (fotos.length === 0) return null;

  return (
    <section className="bg-slate-50 py-16">
      <div className="container-main">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">Nuestra comunidad</span>
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            Momentos reales del colegio
          </h2>
          <p className="max-w-xl text-slate-500">
            Cada imagen refleja la vida cotidiana del Colegio José Arrieta — celebraciones, aprendizaje y convivencia.
          </p>
        </div>

        {/* Mosaico */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:grid-rows-2">
          {/* Foto grande izquierda */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative col-span-2 row-span-2 overflow-hidden rounded-2xl shadow-soft"
          >
            <img
              src={fotos[0].url}
              alt={fotos[0].caption || "Foto del colegio"}
              className="h-full min-h-[200px] w-full object-cover transition duration-500 hover:scale-105 sm:min-h-[280px]"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-sm font-semibold text-white">{fotos[0].caption}</p>
            </div>
          </motion.div>

          {/* Fotos pequeñas */}
          {fotos.slice(1).map((foto, i) => (
            <motion.div
              key={foto.url}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i + 1) * 0.07 }}
              className="relative overflow-hidden rounded-2xl shadow-soft"
            >
              <img
                src={foto.url}
                alt={foto.caption || "Foto del colegio"}
                className="h-40 w-full object-cover transition duration-500 hover:scale-105 lg:h-full"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/55 to-transparent p-3">
                <p className="text-xs font-semibold text-white">{foto.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/vida-escolar"
            className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            Ver galería completa →
          </Link>
        </div>
      </div>
    </section>
  );
}
