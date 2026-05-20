import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getGaleria } from "../../api/galeria";

const fotosEstaticas = [
  {
    url: "https://colegiojosearrieta.cl/wp-content/uploads/2025/09/nota23_int25b-768x431.jpg",
    caption: "Fiestas Patrias 2025",
  },
  {
    url: "https://colegiojosearrieta.cl/wp-content/uploads/2026/02/vuelta_clases26_home.jpg",
    caption: "Inicio de clases 2026",
  },
  {
    url: "https://colegiojosearrieta.cl/wp-content/uploads/2024/12/20241218_101500-768x510.jpg",
    caption: "Graduaciones 2024",
  },
  {
    url: "https://colegiojosearrieta.cl/wp-content/uploads/2025/09/DSC_0031-Grande-768x510.jpg",
    caption: "Vida escolar",
  },
  {
    url: "https://colegiojosearrieta.cl/wp-content/uploads/2026/02/17-feb-blog26home.jpg",
    caption: "Comunidad 2026",
  },
  {
    url: "https://colegiojosearrieta.cl/wp-content/uploads/2024/12/20241218_100939-768x510.jpg",
    caption: "Graduación Kínder",
  },
];

export default function FotoMosaico() {
  const [fotos, setFotos] = useState(fotosEstaticas);

  useEffect(() => {
    getGaleria()
      .then((data) => {
        if (data && data.length > 0) setFotos(data);
      })
      .catch(() => {
        // Fallback a fotos estáticas si el backend no responde
      });
  }, []);

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
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-sm font-semibold text-white">{fotos[0].caption}</p>
            </div>
          </motion.div>

          {/* Fotos pequeñas */}
          {fotos.slice(1).map((foto, i) => (
            <motion.div
              key={foto.url || i}
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
