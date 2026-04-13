import { FunctionComponent } from "react";
import LegalDocumentPage from "../components/legal-document-page";
import { legalNoticeTranslations } from "../content/legalNoticeTranslations";

const t = legalNoticeTranslations.es;

const AvisoLegalPage: FunctionComponent = () => (
  <LegalDocumentPage title={t.title} html={t.content} />
);

export default AvisoLegalPage;
