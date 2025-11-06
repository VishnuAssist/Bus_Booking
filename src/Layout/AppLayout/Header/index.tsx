import {
  Box,
  alpha,
  styled,
  useTheme,
  Container,
  useMediaQuery,
} from "@mui/material";
import Modechanger from "./ModeChanger";
import SignOutButton from "./SignOut";

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const HeaderWrapper = styled(Box)(
    ({ theme }) => `
      right: 0;
      left: 0;
      z-index: 6;
      background-color: ${alpha(
        theme.header.background || theme.colors.alpha.black[100],
        0.95
      )};
      backdrop-filter: blur(3px);
      position: fixed;
      width: 100%;
      justify-content: space-between;
  `
  );

  return (
    <HeaderWrapper sx={{ height: isMobile ? "60px" : theme.header.height }}>
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: theme.header.height,
          px: 2,
        }}
      >
        {isMobile ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              px: 1,
            }}
          ></Box>
        ) : (
          <>
            <Box display="flex" alignItems="center" sx={{ ml: "auto" }}>
              <Modechanger />
              <SignOutButton />
            </Box>
          </>
        )}
      </Container>
    </HeaderWrapper>
  );
}

export default Header;
