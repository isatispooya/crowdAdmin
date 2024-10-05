import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { fShortenNumber } from 'src/utils/format-number';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import useGetDashboard from './service/usegetdashboard';

export default function AppWidgetSummary({ color = 'primary', sx, ...other }) {
  const { data, isPending, isError } = useGetDashboard();

  if (isPending) return <div>درحال بارگزاری...</div>;
  if (isError) return <div>مشکل در دریافت اطلاعات !</div>;

  console.log(data);

  const widgetData = [
    {
      title: 'تعداد درخواست های باز',
      total: data?.['تعداد درخواست های باز'] || 2500,
      icon: <HourglassEmptyIcon style={{ fontSize: '2rem' }} color="warning" />,
    },
    {
      title: 'تعداد درخواست های کل',
      total: data?.totalRequests || 5000,
      icon: <ListAltIcon style={{ fontSize: '2rem' }} color="primary" />,
    },
    {
      title: 'تعداد درخواست های بسته',
      total: data?.closedRequests || 20,
      icon: <CheckCircleOutlineIcon style={{ fontSize: '2rem' }} color="success" />,
    },
    {
      title: 'تعداد درخواست های فعال',
      total: data?.activeRequests || 200,
      icon: <PlayCircleOutlineIcon style={{ fontSize: '2rem' }} color="error" />,
    },
    {
      title: 'تعداد کاربران',
      total: data?.totalUsers || 12500,
      icon: <GroupAddIcon style={{ fontSize: '2rem' }} color="secondary" />,
    },
    {
      title: 'تعداد درخواست های پایان یافته',
      total: data?.completedRequests || 55,
      icon: <AssignmentReturnedIcon style={{ fontSize: '2rem' }} color="disabled" />,
    },
  ];

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{ mt: 8, mb: 8, mx: 'auto', maxWidth: '100%', width: '100%' }}
    >
      {widgetData.map((widget, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
          <Card
            sx={{
              p: 3,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: 3,
              transition: '0.3s',
              background: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
                background: 'rgba(255, 255, 255, 1)',
              },
              ...sx,
            }}
            {...other}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {widget.icon}
            </Box>

            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {fShortenNumber(widget.total)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {widget.title}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  sx: PropTypes.object,
};
