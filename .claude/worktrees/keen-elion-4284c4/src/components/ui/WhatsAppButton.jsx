import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "../../lib/tracking";

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/56988936631?text=Hola%2C%20me%20interesa%20información%20sobre%20la%20admisión%202026"
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp sobre admisión 2026"
      onClick={() => trackWhatsAppClick("boton_flotante")}
      className="fixed bottom-5 right-5 z-[70] flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-[#1ebe5d] hover:shadow-2xl sm:bottom-6 sm:right-6 sm:px-5"
    >
      <span className="relative flex h-5 w-5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-30" />
        <MessageCircle className="relative h-5 w-5" />
      </span>
      <span className="hidden sm:inline">¿Dudas sobre admisión?</span>
    </a>
  );
}

export default WhatsAppButton;
