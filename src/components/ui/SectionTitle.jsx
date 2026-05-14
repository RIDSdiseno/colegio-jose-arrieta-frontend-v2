import { motion } from "framer-motion";

function SectionTitle({ eyebrow, title, subtitle, center = true, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.4 }}
      className={`${center ? "text-center" : "text-left"} mx-auto mb-10 max-w-3xl`}
    >
      {eyebrow ? (
        <span
          className={`mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
            light
              ? "bg-white/15 text-white"
              : "bg-primary/10 text-primary"
          }`}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-primary"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-3 text-base sm:text-lg ${light ? "text-white/70" : "text-slate-600"}`}>
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}

export default SectionTitle;
