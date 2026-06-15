import { PHONE_MAIN, EMAIL } from "./contactInfo";

export const schoolSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EducationalOrganization"],
  name: "Colegio José Arrieta",
  legalName: "Corporación Educacional José Arrieta",
  url: "https://colegiojosearrieta.cl",
  logo: "https://colegiojosearrieta.cl/images/logo-web04.png",
  image: "https://colegiojosearrieta.cl/images/alumnos.jpg",
  email: EMAIL,
  telephone: PHONE_MAIN,
  foundingDate: "1973",
  educationalLevel: "Educación Pre-Escolar y Básica",
  numberOfStudents: 800,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Niveles educativos",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Pre-Kínder" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Kínder" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "1° a 8° Básico" } },
    ],
  },
  sameAs: [
    "https://www.instagram.com/colegioarrieta/",
    "https://www.facebook.com/colegiojosearrieta",
    "https://www.youtube.com/@colegioarrieta",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. José Arrieta 6870",
    addressLocality: "La Reina",
    addressRegion: "Región Metropolitana",
    postalCode: "7850000",
    addressCountry: "CL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -33.45230,
    longitude: -70.57670,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:20",
      closes: "18:00",
    },
  ],
};
