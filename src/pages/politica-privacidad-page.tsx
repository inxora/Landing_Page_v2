import { FunctionComponent } from "react";
import LegalDocumentPage from "../components/legal-document-page";
import { privacyPolicyTranslations } from "../content/privacyPolicyTranslations";

const t = privacyPolicyTranslations.es;

const PoliticaPrivacidadPage: FunctionComponent = () => (
  <LegalDocumentPage title={t.title} html={t.content} />
);

export default PoliticaPrivacidadPage;
