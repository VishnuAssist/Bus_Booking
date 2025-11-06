import {
  Box,
  alpha,
  styled,
  useTheme,
  Container,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import Modechanger from "./ModeChanger";
import SignOutButton from "./SignOut";
import Logo from "../../../Assests/Icons/valiram2.png";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SearchIcon from "@mui/icons-material/Search";

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
          position: "relative",
          minHeight: theme.header.height,
          px: 2,
        }}
      >
        {!isMobile && (
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={Logo} alt="Valiram" style={{ height: 40 }} />
          </Box>
        )}
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Box display="flex" alignItems="center" sx={{ ml: "auto" }}>
          <IconButton>
            <NotificationsActiveIcon />
          </IconButton>
          <Modechanger />
          <SignOutButton />
        </Box>
      </Container>
    </HeaderWrapper>
  );
}

export default Header;
