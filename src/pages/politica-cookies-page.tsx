import { FunctionComponent } from "react";
import LegalDocumentPage from "../components/legal-document-page";
import { cookiesPolicyTranslations } from "../content/cookiesPolicyTranslations";

const t = cookiesPolicyTranslations.es;

const PoliticaCookiesPage: FunctionComponent = () => (
  <LegalDocumentPage title={t.title} html={t.content} />
);

export default PoliticaCookiesPage;
