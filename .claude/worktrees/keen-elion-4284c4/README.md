# Colegio José Arrieta — Frontend

Maquetación web comercial para captación de alumnos 2026. Desarrollada en React + Vite + TailwindCSS, orientada a conversión y posicionamiento SEO.

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| React 18 + Vite | Framework y bundler |
| TailwindCSS 3 | Estilos utility-first |
| Framer Motion 11 | Animaciones |
| React Router DOM 6 | Navegación SPA |
| React Helmet Async | SEO por página |
| React Hook Form + Zod | Formularios y validación |
| Supabase | Panel de administración (opcional) |
| WordPress REST API | Noticias en tiempo real |

---

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm 9+

---

## Instalación

```bash
npm install
npm run dev
```

---

## Variables de entorno

Crear archivo `.env.local` en la raíz copiando `.env.example`:

```env
# Supabase — panel de administración (opcional)
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Google Tag Manager — se activa al poner el ID
VITE_GTM_ID=GTM-XXXXXXX

# Meta Pixel — se activa al poner el ID
VITE_META_PIXEL_ID=XXXXXXXXXXXXXXXX
```

> El sitio funciona sin ninguna de estas variables. Supabase activa el panel admin, GTM activa Analytics + Pixel.

---

## Scripts

```bash
npm run dev        # Desarrollo local
npm run build      # Build de producción
npm run preview    # Vista previa del build
```

---

## Rutas del sitio

### Públicas
| Ruta | Descripción |
|---|---|
| `/` | Home — landing comercial principal |
| `/por-que-elegirnos` | Pilares, infraestructura e historia |
| `/proyecto-educativo` | Ejes estratégicos, metas académicas y talleres |
| `/admision` | Funnel de admisión 2026 completo |
| `/vida-escolar` | Galería real, videos y actividades |
| `/noticias` | Noticias desde WordPress REST API |
| `/noticias/:slug` | Detalle de noticia |
| `/contacto` | Formulario de contacto |

### SEO (ocultas del menú)
| Ruta | Keyword objetivo |
|---|---|
| `/colegio-la-reina` | Mejores colegios en La Reina |
| `/colegio-subvencionado-la-reina` | Colegios subvencionados en La Reina |
| `/colegio-educacion-integral-la-reina` | Colegio educación integral La Reina |
| `/colegio-ingles-prekinder-santiago` | Colegio inglés desde prekinder Santiago |

### Admin (requiere Supabase configurado)
| Ruta | Descripción |
|---|---|
| `/admin/login` | Acceso al panel |
| `/admin/noticias` | Listado de noticias |
| `/admin/noticias/nueva` | Crear noticia |
| `/admin/noticias/:id` | Editar noticia |

---

## Integraciones

### WordPress REST API (noticias públicas)
- `GET https://colegiojosearrieta.cl/wp-json/wp/v2/posts`
- No requiere autenticación

### Supabase (panel admin)
- Autenticación por email/contraseña
- CRUD de noticias con subida de imágenes a Storage

### Tracking (GTM + Meta Pixel)
Los eventos están implementados en `src/lib/tracking.js` y se disparan automáticamente:

| Evento | Disparado en |
|---|---|
| `form_submit` (contacto) | Formulario de contacto |
| `form_submit` (agenda_visita) | Formulario de visita en Admisión |
| `whatsapp_click` | Botón flotante, tarjeta admisión |
| `postulacion_click` | Botón MINEDUC, CTABanner, navbar |
| `page_view_admision` | Al entrar a /admision |
| `page_view` | Cada cambio de página |

---

## Estructura del proyecto

```
src/
├── api/              # Llamadas a WordPress REST API y Supabase
├── components/
│   ├── layout/       # Navbar, Footer, AdminLayout
│   ├── sections/     # HeroSection, CTABanner, TestimonialsSection...
│   └── ui/           # Button, Badge, SectionTitle, WhatsAppButton
├── context/          # AuthContext (Supabase auth)
├── data/             # beneficios.js, talleres.js, testimonials.js
├── hooks/            # useScrollNavbar, useFetch
├── lib/              # supabase.js, tracking.js
└── pages/
    ├── admin/        # AdminLogin, AdminNoticias, AdminNoticiaForm
    ├── seo/          # Landing pages SEO ocultas del menú
    └── *.jsx         # Páginas públicas principales
```

---

## Pendiente (requiere cliente)

- [ ] `VITE_GTM_ID` — ID de Google Tag Manager
- [ ] `VITE_META_PIXEL_ID` — ID de Meta Pixel (Facebook/Instagram)
- [ ] `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` — credenciales Supabase para panel admin
