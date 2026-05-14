import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import { postFormularioContacto } from "../api/contacto";
import Button from "../components/ui/Button";
import { trackFormularioContacto } from "../lib/tracking";

const schema = z.object({
  nombre: z.string().min(3, "Ingresa tu nombre."),
  email: z.string().email("Ingresa un email válido."),
  telefono: z.string().min(8, "Ingresa un teléfono válido."),
  mensaje: z.string().min(10, "Escribe un mensaje más detallado."),
});

function Contacto() {
  const [status, setStatus] = useState({ type: "", message: "" });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { nombre: "", email: "", telefono: "", mensaje: "" },
  });

  const onSubmit = async (values) => {
    try {
      setStatus({ type: "", message: "" });
      const result = await postFormularioContacto(values);
      trackFormularioContacto();
      setStatus({ type: "success", message: result?.message || "Mensaje enviado correctamente." });
      reset();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "No se pudo enviar el mensaje, intenta nuevamente.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Contacto — Colegio José Arrieta, La Reina | Escríbenos o Visítanos</title>
        <meta name="keywords" content="contacto colegio La Reina, colegio José Arrieta teléfono, visitar colegio La Reina Santiago" />
        <meta
          name="description"
          content="Contáctanos para resolver dudas sobre admisión, visitas y proyecto educativo del Colegio José Arrieta."
        />
      </Helmet>

      {/* ── Hero estático ───────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20"
        style={{
          backgroundImage: "url('https://colegiojosearrieta.cl/wp-content/uploads/2020/03/Entrada-768x510.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/70" />
        <div className="container-main relative z-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            Estamos para ayudarte
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold text-white sm:text-5xl">
            Contáctanos{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 text-secondary">hoy</span>
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 60 8" fill="none" aria-hidden="true">
                <path d="M1 5.5C15 1.5 35 7.5 59 3" stroke="#F7B20B" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/80">
            Escríbenos y te responderemos a la brevedad para acompañarte en tu proceso.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-main grid gap-8 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft lg:col-span-1">
            <h2 className="font-heading text-2xl font-semibold text-primary">Datos de contacto</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>Email: colegio@colegiojosearrieta.cl</li>
              <li>Teléfonos: +56222791863 / +56222784685</li>
              <li>WhatsApp: +56988936631</li>
              <li>Dirección: Av. José Arrieta 6870, La Reina, Santiago</li>
              <li>Segunda sede: Januario Espinoza 7131, La Reina, Santiago</li>
              <li>Horario: Lunes a Viernes 08:20-12:30 y 14:00-18:00 hrs</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft lg:col-span-2">
            <h2 className="font-heading text-2xl font-semibold text-primary">Envíanos un mensaje</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="nombre" className="text-sm font-medium text-slate-700">
                  Nombre
                </label>
                <input
                  id="nombre"
                  {...register("nombre")}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                />
                {errors.nombre ? <p className="mt-1 text-xs text-red-600">{errors.nombre.message}</p> : null}
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                />
                {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="telefono" className="text-sm font-medium text-slate-700">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  {...register("telefono")}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                />
                {errors.telefono ? <p className="mt-1 text-xs text-red-600">{errors.telefono.message}</p> : null}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="mensaje" className="text-sm font-medium text-slate-700">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  rows={5}
                  {...register("mensaje")}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                />
                {errors.mensaje ? <p className="mt-1 text-xs text-red-600">{errors.mensaje.message}</p> : null}
              </div>

              {status.message ? (
                <div
                  className={`sm:col-span-2 rounded-xl p-3 text-sm ${
                    status.type === "success"
                      ? "border border-green-200 bg-green-50 text-green-700"
                      : "border border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {status.message}
                </div>
              ) : null}

              <div className="sm:col-span-2">
                <Button type="submit" variant="secondary" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                </Button>
              </div>
            </form>
          </article>
        </div>
      </section>
    </>
  );
}

export default Contacto;
