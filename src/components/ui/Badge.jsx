function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accentStrong ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
