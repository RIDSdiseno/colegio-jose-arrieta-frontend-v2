import { motion } from "framer-motion";

function SectionTitle({ eyebrow, title, subtitle, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.4 }}
      className={`${center ? "text-center" : "text-left"} mx-auto mb-10 max-w-3xl`}
    >
      {eyebrow ? (
        <span className="mb-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-base text-slate-600 sm:text-lg">{subtitle}</p> : null}
    </motion.div>
  );
}

export default SectionTitle;
