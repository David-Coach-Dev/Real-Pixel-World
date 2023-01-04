import { AppBar, Grid, Box, Container, Toolbar, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export const NavBar: React.FC<{}> = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar
        position="sticky"
      >
        <Toolbar>
          <Container maxWidth='xl'>
            <Grid
              container
              direction='row'
              justifyContent='space-between'
              alignItems='center'
            >
              <Grid item>
                <Typography variant="h6" >
                  Dc Dev -{'>'} Backend Developer.
                </Typography>
              </Grid>
              <Grid item>
                <Stack
                  direction='row'
                  spacing={2}
                >
                  <Button
                    onClick={()=>navigate('login')}
                    variant='contained'
                  >
                    Login
                  </Button>
                  <Button
                    variant='outlined'
                  >
                    Register
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>

    </Box>
  );
};