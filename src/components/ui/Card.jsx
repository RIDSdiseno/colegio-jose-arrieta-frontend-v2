function Card({ children, className = "" }) {
  return (
    <article className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-soft ${className}`}>
      {children}
    </article>
  );
}

export default Card;
