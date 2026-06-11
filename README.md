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
| Supabase JS | Autenticación y almacenamiento de archivos |

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
# Backend API (Railway)
VITE_API_URL=https://tu-backend.up.railway.app

# Supabase — autenticación y storage
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Google Tag Manager — se activa al poner el ID
VITE_GTM_ID=GTM-XXXXXXX

# Meta Pixel — se activa al poner el ID (opcional)
VITE_META_PIXEL_ID=XXXXXXXXXXXXXXXX
```

> `VITE_API_URL`, `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` son obligatorias. GTM y Meta Pixel son opcionales.

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
| `/proyecto-educativo` | Ejes estratégicos, metas académicas, talleres y documentos institucionales |
| `/admision` | Funnel de admisión 2026 completo |
| `/vida-escolar` | Galería real, videos y actividades |
| `/noticias` | Noticias del colegio (API propia) |
| `/noticias/:slug` | Detalle de noticia |
| `/contacto` | Formulario de contacto vía WhatsApp |

### SEO (ocultas del menú)
| Ruta | Keyword objetivo |
|---|---|
| `/colegio-la-reina` | Mejores colegios en La Reina |
| `/colegio-subvencionado-la-reina` | Colegios subvencionados en La Reina |
| `/colegio-educacion-integral-la-reina` | Colegio educación integral La Reina |
| `/colegio-ingles-prekinder-santiago` | Colegio inglés desde prekinder Santiago |

### Admin (requiere autenticación Supabase)
| Ruta | Descripción |
|---|---|
| `/admin/login` | Acceso al panel |
| `/admin/noticias` | Listado de noticias |
| `/admin/noticias/nueva` | Crear noticia |
| `/admin/noticias/:id` | Editar noticia |
| `/admin/albums` | Galería — álbumes y fotos |
| `/admin/videos` | Videos del colegio |
| `/admin/documentos` | Documentos y reglamentos |
| `/admin/testimonios` | Testimonios de apoderados |

---

## Integraciones

### Backend API (Railway)
- API REST propia en Node.js/Express + Prisma + PostgreSQL
- Base URL configurada en `VITE_API_URL`
- Recursos: noticias, álbumes, videos, documentos, testimonios
- Rutas públicas sin autenticación; rutas `/admin` requieren token JWT

### Supabase
- Autenticación por email/contraseña (`supabase.auth.signInWithPassword`)
- Storage: imágenes de noticias y PDFs de documentos en bucket `documentos`
- El token JWT de Supabase se adjunta en cada petición admin al backend

### Tracking (GTM + Meta Pixel)
Los eventos están implementados en `src/lib/tracking.js` y se disparan automáticamente:

| Evento | Disparado en |
|---|---|
| `formulario_contacto` | Formulario de contacto |
| `form_submit` (agenda_visita) | Formulario de visita en Admisión |
| `whatsapp_click` | Botón flotante, tarjeta admisión |
| `postulacion_click` | Botón MINEDUC, CTABanner, navbar |
| `page_view_admision` | Al entrar a /admision |
| `page_view` | Cada cambio de página |

---

## Estructura del proyecto

```
src/
├── api/              # Funciones fetch por recurso (noticias, albums, documentos, videos, testimonios)
├── components/
│   ├── admin/        # Componentes reutilizables del panel (formularios, spinners, headers)
│   ├── layout/       # Navbar, Footer, Layout, AdminLayout
│   ├── sections/     # HeroSection, CTABanner, TestimonialsSection...
│   └── ui/           # Button, Badge, PageHero, FloatingButtons
├── context/          # AuthContext, ProtectedRoute
├── data/             # beneficios.js, talleres.js (datos estáticos)
├── hooks/            # useScrollNavbar
├── lib/              # api.js, storage.js, supabase.js, tracking.js, utils.js, youtube.js
└── pages/
    ├── admin/        # AdminLogin, AdminNoticias, AdminNoticiaForm, AdminAlbums, etc.
    ├── seo/          # Landing pages SEO ocultas del menú
    └── *.jsx         # Páginas públicas principales
```

---

## Pendiente (configuración en Netlify)

- [ ] `VITE_API_URL` — URL del backend en Railway
- [ ] `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` — credenciales Supabase
- [ ] `VITE_GTM_ID` — ID de Google Tag Manager
- [ ] `VITE_META_PIXEL_ID` — ID de Meta Pixel (opcional, solo si usa Meta Ads)
