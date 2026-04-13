import { FunctionComponent } from "react";
import LegalDocumentPage from "../components/legal-document-page";
import { termsAndConditionsTranslations } from "../content/termsAndConditionsTranslations";

const t = termsAndConditionsTranslations.es;

const TerminosCondicionesPage: FunctionComponent = () => (
  <LegalDocumentPage title={t.title} html={t.content} />
);

export default TerminosCondicionesPage;
