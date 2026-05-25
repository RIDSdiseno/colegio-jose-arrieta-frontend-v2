import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FileText, ExternalLink, Download, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "../components/ui/PageHero";
import CTASection from "../components/sections/CTASection";
import { getDocumentos, getAnos, CATEGORIAS } from "../api/documentos";

const ANO_ACTUAL = new Date().getFullYear();

function DocLink({ doc, index }) {
  return (
    <motion.a
      href={doc.link}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-soft transition hover:border-primary/40 hover:text-primary hover:shadow-md"
    >
      <FileText className="h-4 w-4 shrink-0 text-primary/70 transition group-hover:text-primary" />
      <span className="flex-1">{doc.titulo}</span>
      <Download className="h-3.5 w-3.5 shrink-0 text-slate-300 transition group-hover:text-secondary" />
    </motion.a>
  );
}

function Documentos() {
  const [anos, setAnos] = useState([ANO_ACTUAL]);
  const [anio, setAnio] = useState(ANO_ACTUAL);
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar años disponibles una sola vez
  useEffect(() => {
    getAnos()
      .then((data) => {
        if (data.length > 0) {
          setAnos(data);
          setAnio(data[0]); // el más reciente
        }
      })
      .catch(() => {}); // si falla, queda con el año actual
  }, []);

  useEffect(() => {
    setLoading(true);
    getDocumentos({ anio })
      .then(setDocumentos)
      .catch(() => setDocumentos([]))
      .finally(() => setLoading(false));
  }, [anio]);

  // Agrupar por categoría respetando el orden de CATEGORIAS
  const porCategoria = CATEGORIAS.reduce((acc, cat) => {
    const docs = documentos.filter((d) => d.categoria === cat);
    if (docs.length > 0) acc[cat] = docs;
    return acc;
  }, {});

  const hayDocumentos = Object.keys(porCategoria).length > 0;

  return (
    <>
      <Helmet>
        <title>{`Documentos ${anio} — Colegio José Arrieta`}</title>
        <meta
          name="description"
          content={`Descarga los documentos del año académico ${anio} del Colegio José Arrieta: lista de útiles escolares, calendario escolar, plan lector e información de cursos.`}
        />
      </Helmet>

      <PageHero
        img="/images/documentos-escolares.jpg"
        eyebrow={`Año académico ${anio}`}
        title="Documentos"
        highlight="del Colegio."
        subtitle="Aquí encontrarás todos los documentos importantes para el año escolar: útiles, calendario, plan lector y más."
      />

      <section className="container-main py-16">

        {/* Selector de año */}
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm font-medium text-slate-600">Año académico:</span>
          <div className="relative">
            <select
              value={anio}
              onChange={(e) => setAnio(Number(e.target.value))}
              className="appearance-none rounded-xl border border-slate-300 bg-white py-2 pl-4 pr-9 text-sm font-semibold text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {anos.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Contenido */}
        {loading ? (
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-6 w-48 animate-pulse rounded-lg bg-slate-200" />
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="h-12 animate-pulse rounded-xl bg-slate-100" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : !hayDocumentos ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center text-slate-500">
            <FileText className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <p className="font-medium">No hay documentos disponibles para {anio}.</p>
            <p className="mt-1 text-sm text-slate-400">Los documentos se publicarán próximamente.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(porCategoria).map(([cat, docs], si) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: si * 0.06 }}
              >
                <div className="mb-4 border-b border-slate-100 pb-3">
                  <h2 className="font-heading text-xl font-bold text-primary">{cat}</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {docs.map((doc, di) => (
                    <DocLink key={doc.id} doc={doc} index={di} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <CTASection
        title="¿Necesitas más"
        highlight="información?"
        subtitle="Contáctanos directamente y te ayudamos con cualquier consulta sobre el año académico."
      />
    </>
  );
}

export default Documentos;
