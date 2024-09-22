/* eslint-disable react-hooks/exhaustive-deps */
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import AppWidgetSummary from '../app-widget-summary';
import AnalyticsTasks from '../app-tasks';

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          خوش آمدید 👋
        </Grid>
      </Grid>
      <AppWidgetSummary />

      <AnalyticsTasks />

      {/* <CardSafeBox /> */}
    </Container>
  );
}
