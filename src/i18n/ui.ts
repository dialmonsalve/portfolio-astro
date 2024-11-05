export const languages = {
  es: "Español",
  en: "English",
};

interface Routes {
  es: {
    about: string;
    services: string;
    projects: string;
    contact: string;
    "web-components": string;
    "convert-images": string;
  };
  en: {
    about: string;
    services: string;
    projects: string;
    contact: string;
    "projects/web-components": string;
    "projects/convert-images": string;
  };
}

export const defaultLang = "es";
export const showDefaultLang = false;

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
  },
  es: {
    "nav.home": "Inicio",
    "nav.about": "Acerca de",
    "nav.services": "Servicios",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
  },
} as const;

export const routes: Routes & { [key: string]: any } = {
  es: {
    about: "about",
    services: "services",
    contact: "contact",
    projects: "projects",
    "web-components": "projects/web-components",
    "convert-images": "projects/convert-images",
  },
  en: {
    about: "about",
    services: "services",
    contact: "contact",
    projects: "projects",
    "projects/web-components": "web-components",
    "projects/convert-images": "convert-images",
  },
};
