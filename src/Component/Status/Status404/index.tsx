import {
  Box,
  Typography,
  Container,
  Button,
} from '@mui/material';
import { Helmet } from "react-helmet";
import backgroundImage from './bg404.jpg';
import { styled } from '@mui/material/styles';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    background-color:grey;
    background-color: black;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
   color:white;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);





function Status404() {
  return (
    <>
      <Helmet>
        <title>Status - 404</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <img alt="404" height={380} src="/static/images/status/404 3.svg" />
            <Typography variant="h2" sx={{ my: 2 }}>
              The page you were looking for doesn't exist.
            </Typography>
            <Typography
              variant="h4"
              
              fontWeight="normal"
              sx={{ mb: 4 }}
            >
              It's on us, we moved the content to a different page
            </Typography>
            <Button href="/" variant="contained" color='secondary' >
                Go to homepage
              </Button>
          </Box>        
        
        
            
         
        </Container>
      </MainContent>
    </>
  );
}

export default Status404;
