import {
  Box,
  Typography,
  Container,
  Button,
} from '@mui/material';
import { Helmet } from "react-helmet";

import { styled } from '@mui/material/styles';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    background-color:black;
  color: white;
  
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);



function Status401() {
  return (
    <>
      <Helmet>
        <title> 401</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <img alt="404" height={380} src="/static/images/status/401.svg" />
            <Typography variant="h2" sx={{ my: 2 }}>
            Error 401 - Unauthorized Access
            </Typography>
            <Typography
              variant="h4"
              
              fontWeight="normal"
              sx={{ mb: 4 }}
            >
           Unauthorized access to the requested page. Please check your credentials or contact support for assistance
            </Typography>
         
          
        
              <Button href="/" variant="contained"  color='secondary'>
                Go to homepage
              </Button>
              </Box>
        </Container>
      </MainContent>
    </>
  );
}

export default Status401;
