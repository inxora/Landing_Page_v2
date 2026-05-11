import { FunctionComponent } from "react";
import LegalDocumentPage from "../components/legal-document-page";
import { pilotAgreementTranslations } from "../content/pilotAgreementTranslations";

const t = pilotAgreementTranslations.es;

const AcuerdoPilotoPage: FunctionComponent = () => (
  <LegalDocumentPage title={t.title} html={t.content} />
);

export default AcuerdoPilotoPage;
