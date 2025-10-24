import { Box, Link, Typography, styled } from "@mui/material";

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
        margin-left: ${theme.spacing(5)};
        margin-right: ${theme.spacing(5)};
`
);

function Footer() {
  return (
    <FooterWrapper>
      <Box
        pb={4}
        display={{ xs: "block", md: "flex" }}
        alignItems="center"
        textAlign={{ xs: "center", md: "left" }}
        justifyContent="space-between"
      >
        <Box>
          <Typography sx={{ fontSize: "small", fontWeight: 300 }}>
            &copy; 2025 - Commision Assist
          </Typography>
        </Box>
        <Typography
          sx={{
            pt: { xs: 2, md: 0 },
            fontSize: "small",
            fontWeight: 300,
          }}
          variant="subtitle1"
        >
          Powered by{" "}
          <Link
            href="http://assist360.com.sg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Assist360.com.sg
          </Link>
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
