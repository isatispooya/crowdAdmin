/* eslint-disable react-hooks/exhaustive-deps */
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import Sterpercrowd from 'src/components/sterpercrowd';

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          خوش آمدید 👋
        </Grid>
      </Grid>
      <Sterpercrowd />
    </Container>
  );
}
