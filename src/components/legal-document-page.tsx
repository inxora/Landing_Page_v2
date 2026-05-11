import { FunctionComponent, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import styles from "./legal-document-page.module.css";

export type LegalDocumentPageProps = {
  title: string;
  html: string;
};

const LegalDocumentPage: FunctionComponent<LegalDocumentPageProps> = ({
  title,
  html,
}) => {
  useEffect(() => {
    document.title = `${title} | INXORA`;
    return () => {
      document.title = "INXORA";
    };
  }, [title]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        pt: { xs: "120px", sm: "140px" },
        pb: 10,
        px: { xs: 2, md: 4 },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 3, fontWeight: 700, color: "var(--inx-navy)" }}
      >
        {title}
      </Typography>
      <Box className={styles.prose} dangerouslySetInnerHTML={{ __html: html }} />
    </Container>
  );
};

export default LegalDocumentPage;
