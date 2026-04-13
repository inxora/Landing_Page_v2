import { FunctionComponent, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
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
      maxWidth="md"
      sx={{
        pt: { xs: "92px", sm: "84px" },
        py: 4,
        pb: 10,
        px: 2,
      }}
    >
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        sx={{
          textTransform: "none",
          mb: 3,
          background: "var(--inx-navy)",
          "&:hover": { background: "var(--inx-navy-hover)" },
        }}
      >
        ← Volver al inicio
      </Button>
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
