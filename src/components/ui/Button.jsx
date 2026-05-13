import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const baseClass =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const variants = {
  primary: "bg-primary text-white hover:bg-primaryHover focus-visible:ring-primary",
  secondary: "bg-secondary text-primary hover:bg-secondaryHover focus-visible:ring-secondary",
  outline:
    "border border-primary/30 bg-white text-primary hover:border-primary hover:bg-primary/5 focus-visible:ring-primary",
};

function Button({ children, variant = "primary", className = "", to, ...props }) {
  const classes = `${baseClass} ${variants[variant] || variants.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} className={classes} {...props}>
      {children}
    </motion.button>
  );
}

export default Button;
