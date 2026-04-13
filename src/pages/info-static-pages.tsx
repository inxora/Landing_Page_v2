import { FunctionComponent } from "react";
import LegalDocumentPage from "../components/legal-document-page";
import { infoPagesEs } from "../content/info-pages-es";

function makeInfoPage(key: keyof typeof infoPagesEs): FunctionComponent {
  const Page: FunctionComponent = () => {
    const c = infoPagesEs[key];
    return <LegalDocumentPage title={c.title} html={c.html} />;
  };
  Page.displayName = `InfoPage(${key})`;
  return Page;
}

export const NosotrosPage = makeInfoPage("nosotros");
export const ContactoPage = makeInfoPage("contacto");
export const FaqPage = makeInfoPage("faq");
export const CotizacionesPage = makeInfoPage("cotizaciones");
export const CatalogoPage = makeInfoPage("catalogo");
export const SuministrosPage = makeInfoPage("suministros");
export const SeguridadPage = makeInfoPage("seguridad");
export const HerramientasPage = makeInfoPage("herramientas");
export const EnviosPage = makeInfoPage("envios");
export const DevolucionesPage = makeInfoPage("devoluciones");
